import { NextResponse } from 'next/server';
import { calculateEstimate, formatPHP, getPlatform, platforms, type PriceRange } from '@/lib/estimator';

const MAX_CUSTOM_FEATURES = 8;
const CUSTOM_FEATURE_BOUNDS = { min: 2_000, max: 20_000 };

interface CustomFeature extends PriceRange {
    name: string;
}

// In-memory rate limiter: 10 estimates per 24 hours per IP
const ipRateLimits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const record = ipRateLimits.get(ip);

    if (!record || now >= record.resetAt) {
        ipRateLimits.set(ip, { count: 1, resetAt: now + 24 * 60 * 60 * 1000 });
        return true;
    }
    if (record.count >= 10) return false;

    record.count += 1;
    return true;
}

/** Splits the free-text "other features" box into short, de-duplicated items. */
function parseCustomFeatures(text: unknown): string[] {
    if (typeof text !== 'string') return [];
    const items = text
        .split(/[\n,;]+/)
        .map((s) => s.replace(/^[-*•\d.)\s]+/, '').trim().slice(0, 80))
        .filter((s) => s.length > 1);
    return [...new Set(items)].slice(0, MAX_CUSTOM_FEATURES);
}

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const roundTo500 = (n: number) => Math.round(n / 500) * 500;

function buildPrompt(platformNames: string[], lineItems: ReturnType<typeof calculateEstimate>['lineItems'], custom: string[]) {
    const priced = lineItems
        .filter((i) => i.kind === 'base' || i.kind === 'feature')
        .map((i) => `- [${i.platform}] ${i.name}: ${formatPHP(i.min)}–${formatPHP(i.max)}`)
        .join('\n');
    const customList = custom.length ? custom.map((c) => `- ${c}`).join('\n') : '(none)';

    return `You are the pricing assistant for Daero Labs, a startup software studio in the Philippines with mostly Filipino clients and fair, startup-friendly prices.
A visitor used our cost estimator. Platforms: ${platformNames.join(', ')}.

Already priced from our rate card (Philippine pesos):
${priced}

Custom features the visitor typed in (not on our rate card):
${customList}

Tasks:
1. Price each custom feature as a peso range that is consistent with the rate card above (similar complexity → similar price, usually ₱2,000–₱12,000). If an item is not a software feature or is unclear, skip it.
2. Write a 2–3 sentence summary for the visitor: what kind of system this is, what drives the cost, and one tip to keep costs down. Friendly and plain English. Do not repeat the total price.

Reply with ONLY this JSON, no markdown, amounts as plain numbers in pesos:
{"summary": "...", "custom": [{"name": "short feature name", "min": 3000, "max": 5000}]}`;
}

async function askAI(prompt: string): Promise<{ summary?: string; custom?: CustomFeature[] } | null> {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey || apiKey.trim() === '') return null;

    try {
        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': 'https://daerolabs.com',
                'X-Title': 'Daero Labs Cost Estimator',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: process.env.OPENROUTER_MODEL || 'openrouter/free',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.3,
                max_tokens: 800,
            }),
            signal: AbortSignal.timeout(25000),
        });
        if (!res.ok) {
            console.error('Estimator AI error:', res.status, await res.text().catch(() => ''));
            return null;
        }

        const data = await res.json();
        let text: string = data.choices?.[0]?.message?.content || '';
        if (text.includes('</think>')) text = text.split('</think>').pop() || text;

        let cleaned = text.trim();
        if (cleaned.startsWith('```')) {
            cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
        }

        const firstBrace = cleaned.indexOf('{');
        const lastBrace = cleaned.lastIndexOf('}');
        if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) return null;

        const candidate = cleaned.slice(firstBrace, lastBrace + 1);
        return JSON.parse(candidate);
    } catch (error) {
        console.error('Estimator AI request failed:', error);
        return null;
    }
}

function sanitizeCustom(raw: unknown): CustomFeature[] {
    if (!Array.isArray(raw)) return [];
    return raw
        .filter((c) => c && typeof c.name === 'string' && Number.isFinite(c.min) && Number.isFinite(c.max))
        .slice(0, MAX_CUSTOM_FEATURES)
        .map((c) => {
            const min = roundTo500(clamp(Math.min(c.min, c.max), CUSTOM_FEATURE_BOUNDS.min, CUSTOM_FEATURE_BOUNDS.max));
            const max = roundTo500(clamp(Math.max(c.min, c.max), min, CUSTOM_FEATURE_BOUNDS.max));
            return { name: c.name.slice(0, 80), min, max };
        });
}

function fallbackSummary(platformNames: string[], featureCount: number) {
    return `This estimate covers a ${platformNames.join(' + ')} project with ${featureCount} selected feature${featureCount === 1 ? '' : 's'}. ` +
        `The biggest cost drivers are usually payments, real-time features, and integrations. ` +
        `Launching with the must-have features first and adding the rest later is the easiest way to keep costs down.`;
}

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => null);
        const platformIds: string[] = Array.isArray(body?.platforms)
            ? body.platforms.filter((p: unknown): p is string => typeof p === 'string' && !!getPlatform(p))
            : [];
        const featureKeys: string[] = Array.isArray(body?.features)
            ? body.features.filter((f: unknown): f is string => typeof f === 'string')
            : [];

        if (platformIds.length === 0) {
            return NextResponse.json({ error: 'Pick at least one platform.' }, { status: 400 });
        }

        const forwarded = req.headers.get('x-forwarded-for');
        const ip = forwarded ? forwarded.split(',')[0].trim() : 'client';
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: 'You have reached the daily limit for estimates. Book a call and we will give you an exact quote.', isRateLimited: true },
                { status: 429 },
            );
        }

        const customRequested = parseCustomFeatures(body?.others);
        const base = calculateEstimate(platformIds, featureKeys);
        const platformNames = platforms.filter((p) => platformIds.includes(p.id)).map((p) => p.name);
        const featureCount = base.lineItems.filter((i) => i.kind === 'feature').length;

        const ai = await askAI(buildPrompt(platformNames, base.lineItems, customRequested));
        const custom = customRequested.length ? sanitizeCustom(ai?.custom) : [];
        const customTotal = custom.reduce((sum, c) => ({ min: sum.min + c.min, max: sum.max + c.max }), { min: 0, max: 0 });
        const estimate = custom.length ? calculateEstimate(platformIds, featureKeys, customTotal) : base;

        const pricedLower = custom.map((c) => c.name.toLowerCase());
        const customUnpriced = customRequested.filter(
            (req) => !pricedLower.some((p) => p.includes(req.toLowerCase()) || req.toLowerCase().includes(p))
        );

        return NextResponse.json({
            ...estimate,
            custom,
            // Custom items the AI couldn't price are quoted on a call instead.
            customUnpriced,
            summary: typeof ai?.summary === 'string' && ai.summary.trim() ? ai.summary.trim() : fallbackSummary(platformNames, featureCount + custom.length),
            aiUsed: ai !== null,
        });
    } catch (error) {
        console.error('API /api/estimate error:', error);
        return NextResponse.json({ error: 'Something went wrong while calculating. Please try again.' }, { status: 500 });
    }
}
