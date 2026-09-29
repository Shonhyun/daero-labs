import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are "Daero AI", the intelligent studio assistant for Daero Labs (an early-stage software studio).

### About Daero Labs:
- **Name Meaning:** Daero (대로) means "the great road" in Korean. Daero Labs builds a clear, well-engineered path from idea to product, built to carry clients further than where they started.
- **Philosophy:**
  1. Quality over Quantity: Limited projects at a time to ensure high attention to detail. No "churn and burn".
  2. Transparent Communication: Honest updates, realistic timelines, clear expectations from day one.
  3. In-house Craftsmanship: No outsourcing. Every line of code and pixel is crafted by the in-house team.
- **Builders & Team:**
  - Shoun Ramos: Founder • Tech Lead
  - James Heaven: CMO • Marketing
  - John Christian: Web Developer
  - Dylan Ramos: Fullstack Developer (Portfolio: https://www.dylanramos.site)
- **Services:**
  1. Web Development: High-performance modern web apps, SPAs, PWAs, internal business tools, and e-commerce using Next.js, React, Tailwind CSS.
  2. Mobile App Development: Cross-platform iOS & Android mobile apps using Flutter and React Native with native 120Hz/60Hz smoothness and offline capabilities.
  3. Custom CRM Systems: Tailored lead & pipeline management, customer history, reports & dashboards designed around actual business workflows.
  4. Desktop Applications: Reliable software for Windows and macOS, offline-ready with automatic updates.
  5. UI / UX Design: Design systems, interactive prototyping, user research, brand identity.
- **Featured Project:**
  - Undergrounds REE Review Center: All-in-one review platform & mobile app for Registered Electrical Engineering board exam review with live classes, offline mode, smart progress analytics, built-in calculator, and gamified XP rankings.
- **Technologies:**
  - Frontend: React, Next.js, Vue.js, Angular, Tailwind CSS
  - Backend: Node.js, Laravel, ASP.NET, Python, PHP
  - Mobile: Flutter, React Native
  - Databases: PostgreSQL, MySQL, SQL Server, MongoDB
  - Cloud & Services: AWS, Docker, Firebase, Supabase
- **Contact:**
  - Email: daerolabs@gmail.com
  - Location: Pangasinan, Philippines & Remote
  - Book a meeting on the Contact page (/contact) or directly at https://cal.com/daero-labs-dtrbgh
  - Meeting types: Discovery Call (15 min), Meet the Team (20 min), Start a Project (30 min), Project Consultation (45 min), Tech Advice Session (30 min)

### Your Persona & Rules:
- Friendly, articulate, professional, tech-savvy, and helpful.
- Support both English and Filipino/Tagalog/Taglish seamlessly depending on what language the user speaks.
- Give concise, informative answers with clean markdown (bullet points, bold text).
- If a user asks for an estimate or quote, give helpful ballparks or explain the key factors (complexity, platform, scope), and warmly invite them to book a call on the /contact page or email daerolabs@gmail.com.
- Keep answers focused on Daero Labs and software development. Politely redirect completely unrelated topics.
- CRITICAL: Deliver your answer DIRECTLY to the user. Never output internal thought steps, analysis, planning notes, or "Here's a thinking process:". Begin your message immediately with the final answer.
`;

// In-memory rate limiter: 5 prompts per 24 hours per IP
const ipRateLimits = new Map<string, { count: number; resetAt: number }>();

function checkServerRateLimit(ip: string): { allowed: boolean; remaining: number } {
    const now = Date.now();
    const record = ipRateLimits.get(ip);

    if (!record || now >= record.resetAt) {
        ipRateLimits.set(ip, { count: 1, resetAt: now + 24 * 60 * 60 * 1000 });
        return { allowed: true, remaining: 4 };
    }

    if (record.count >= 5) {
        return { allowed: false, remaining: 0 };
    }

    record.count += 1;
    return { allowed: true, remaining: 5 - record.count };
}

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: 'Invalid messages array' },
                { status: 400 }
            );
        }

        const forwarded = req.headers.get('x-forwarded-for');
        const ip = forwarded ? forwarded.split(',')[0].trim() : 'client';

        if (req.headers.get('x-reset-rate-limit') === 'true') {
            ipRateLimits.delete(ip);
        }

        const rateCheck = checkServerRateLimit(ip);
        if (!rateCheck.allowed) {
            return NextResponse.json(
                {
                    error: 'Naabot mo na ang daily limit na 5 prompts para sa araw na ito. Magre-reset ito bukas! Para sa agarang inquiry, mag-email sa daerolabs@gmail.com o bisitahin ang /contact.',
                    isRateLimited: true,
                },
                { status: 429 }
            );
        }

        const apiKey = process.env.OPENROUTER_API_KEY;

        // Graceful fallback if the API key is not yet set
        if (!apiKey || apiKey.trim() === '') {
            const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';

            let demoReply = `**Kumusta! Ako si Daero AI**, ang studio assistant ng Daero Labs.\n\n` +
                `Handa na ang aking chat interface! Maaari kang magtanong tungkol sa aming mga serbisyo at proyekto.\n\n`;

            if (lastUserMessage.includes('services') || lastUserMessage.includes('serbisyo')) {
                demoReply += `Samantala, narito ang mga serbisyo ng **Daero Labs**:\n` +
                    `- **Web Development** (Next.js, React, Tailwind)\n` +
                    `- **Mobile Apps** (Flutter, iOS & Android)\n` +
                    `- **Custom CRM Systems** (Pipeline & customer tracking)\n` +
                    `- **Desktop Apps** (Windows & macOS)\n` +
                    `- **UI/UX Design** (Figma, Design Systems)`;
            } else if (lastUserMessage.includes('team') || lastUserMessage.includes('who') || lastUserMessage.includes('builder')) {
                demoReply += `Ang team sa likod ng Daero Labs:\n` +
                    `- **Shoun Ramos** — Founder • Tech Lead\n` +
                    `- **James Heaven** — CMO • Marketing\n` +
                    `- **John Christian** — Web Developer\n` +
                    `- **Dylan Ramos** — Fullstack Developer (https://www.dylanramos.site)`;
            } else {
                demoReply += `Maaari kang magtanong tungkol sa aming mga serbisyo, technology stack, o mag-inquire direkta sa **daerolabs@gmail.com**!`;
            }

            return NextResponse.json({
                message: demoReply,
                isDemo: true
            });
        }

        const model = process.env.OPENROUTER_MODEL || 'openrouter/free';

        const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': 'https://daerolabs.com',
                'X-Title': 'Daero Labs Studio Assistant',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model,
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    ...messages
                ],
                temperature: 0.7,
                max_tokens: 1000,
            }),
        });

        if (!openRouterResponse.ok) {
            const errorData = await openRouterResponse.json().catch(() => ({}));
            console.error('OpenRouter error response:', errorData);
            return NextResponse.json(
                { 
                    error: errorData.error?.message || 'Failed to get response from AI assistant',
                    status: openRouterResponse.status 
                },
                { status: openRouterResponse.status }
            );
        }

        const data = await openRouterResponse.json();
        let reply = data.choices?.[0]?.message?.content || 'Wala akong natanggap na sagot. Pakisubukan muli.';

        // Strip internal thoughts/reasoning traces if present
        if (reply.includes('</think>')) {
            reply = reply.split('</think>').pop()?.trim() || reply;
        } else if (reply.includes('</thought>')) {
            reply = reply.split('</thought>').pop()?.trim() || reply;
        }

        // If the model output a thinking process preamble
        const thinkingRegex = /^Here's a thinking process:[\s\S]*?(?:(?:\r?\n){2,}(?=[A-Za-z#*]))/i;
        if (thinkingRegex.test(reply)) {
            reply = reply.replace(thinkingRegex, '').trim();
        }

        return NextResponse.json({
            message: reply,
            model: data.model || model,
        });

    } catch (error) {
        console.error('API /api/chat error:', error);
        return NextResponse.json(
            { error: 'Internal server error while processing AI chat' },
            { status: 500 }
        );
    }
}
