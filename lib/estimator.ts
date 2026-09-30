import {
  AppWindow,
  ArchiveRestore,
  Bell,
  CalendarCheck,
  Camera,
  ChartColumn,
  CircleUser,
  CreditCard,
  Database,
  FileInput,
  FileSpreadsheet,
  FileText,
  FingerprintPattern,
  Globe,
  KeyRound,
  Languages,
  LayoutDashboard,
  Lock,
  MapPin,
  MessageCircle,
  Monitor,
  Newspaper,
  Package,
  Plug,
  Printer,
  QrCode,
  Receipt,
  RefreshCw,
  ScanBarcode,
  Search,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Upload,
  Users,
  WifiOff,
  type LucideIcon,
} from "lucide-react";

/*
 * Pricing for the project cost estimator. All amounts are in USD.
 * Each platform has a base cost (setup, design, QA, deployment) and every
 * feature adds its own range on top. Edit the numbers here to change the
 * estimates shown on the site. The API recalculates from this file, so the
 * client can't send its own prices.
 */

export type PlatformId = "web" | "mobile" | "desktop";

export interface PriceRange {
  min: number;
  max: number;
}

export interface Feature extends PriceRange {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface Platform {
  id: PlatformId;
  name: string;
  tagline: string;
  icon: LucideIcon;
  base: PriceRange;
  baseLabel: string;
  features: Feature[];
}

export const platforms: Platform[] = [
  {
    id: "web",
    name: "Web App",
    tagline: "Websites, portals, and web systems",
    icon: Globe,
    base: { min: 1500, max: 3000 },
    baseLabel: "Web setup, UI design, hosting & QA",
    features: [
      { id: "auth", name: "User Accounts & Login", description: "Sign up, log in, and password reset", icon: Lock, min: 800, max: 1500 },
      { id: "social-login", name: "Google / Facebook Login", description: "One-click sign in with social accounts", icon: KeyRound, min: 300, max: 600 },
      { id: "admin", name: "Admin Dashboard", description: "Manage users, content, and settings", icon: LayoutDashboard, min: 1500, max: 3000 },
      { id: "roles", name: "Roles & Permissions", description: "Control who can see and do what", icon: ShieldCheck, min: 800, max: 1500 },
      { id: "payments", name: "Online Payments", description: "Card, GCash, or PayPal checkout", icon: CreditCard, min: 1200, max: 2500 },
      { id: "ecommerce", name: "Product Catalog & Cart", description: "Browse products, add to cart, and order", icon: ShoppingCart, min: 1500, max: 3000 },
      { id: "booking", name: "Booking & Scheduling", description: "Reservations, appointments, and calendars", icon: CalendarCheck, min: 1200, max: 2500 },
      { id: "cms", name: "Blog / Content Manager", description: "Publish and edit pages without code", icon: FileText, min: 800, max: 1500 },
      { id: "search", name: "Search & Filters", description: "Find records fast with smart filters", icon: Search, min: 500, max: 1200 },
      { id: "chat", name: "Real-time Chat", description: "Live messaging between users", icon: MessageCircle, min: 1500, max: 3000 },
      { id: "notifications", name: "Email Notifications", description: "Automatic emails for key events", icon: Bell, min: 400, max: 800 },
      { id: "reports", name: "Reports & Analytics", description: "Charts, summaries, and exports", icon: ChartColumn, min: 1200, max: 2500 },
      { id: "crm", name: "Customer Management", description: "Leads, customer history, and follow-ups", icon: Users, min: 2000, max: 4000 },
      { id: "uploads", name: "File Uploads & Media", description: "Upload images, documents, and videos", icon: Upload, min: 500, max: 1000 },
      { id: "i18n", name: "Multi-language", description: "Switch between English, Filipino, and more", icon: Languages, min: 600, max: 1200 },
      { id: "integrations", name: "Third-party Integrations", description: "Connect to APIs and tools you already use", icon: Plug, min: 800, max: 2000 },
      { id: "ai", name: "AI Assistant", description: "Chatbot or AI-powered automation", icon: Sparkles, min: 1500, max: 4000 },
    ],
  },
  {
    id: "mobile",
    name: "Mobile App",
    tagline: "iOS and Android apps",
    icon: Smartphone,
    base: { min: 3000, max: 6000 },
    baseLabel: "iOS & Android setup, UI design, QA & store release",
    features: [
      { id: "auth", name: "User Accounts & Login", description: "Sign up, log in, and password reset", icon: Lock, min: 1000, max: 1800 },
      { id: "social-login", name: "Google / Facebook Login", description: "One-tap sign in with social accounts", icon: KeyRound, min: 400, max: 800 },
      { id: "biometrics", name: "Face ID / Fingerprint", description: "Unlock the app with biometrics", icon: FingerprintPattern, min: 400, max: 800 },
      { id: "profiles", name: "User Profiles", description: "Editable profiles with photos", icon: CircleUser, min: 500, max: 1000 },
      { id: "push", name: "Push Notifications", description: "Alerts and reminders on the phone", icon: Bell, min: 600, max: 1200 },
      { id: "payments", name: "In-app Payments", description: "Purchases, subscriptions, or e-wallets", icon: CreditCard, min: 1500, max: 3000 },
      { id: "booking", name: "Booking & Scheduling", description: "Reservations and appointments", icon: CalendarCheck, min: 1500, max: 2800 },
      { id: "maps", name: "Maps & Location", description: "Live location, directions, and nearby places", icon: MapPin, min: 1000, max: 2000 },
      { id: "camera", name: "Camera & Photo Upload", description: "Take and upload photos in the app", icon: Camera, min: 600, max: 1200 },
      { id: "qr", name: "QR / Barcode Scanner", description: "Scan codes with the phone camera", icon: QrCode, min: 500, max: 1000 },
      { id: "offline", name: "Offline Mode & Sync", description: "Works without internet, syncs later", icon: WifiOff, min: 1500, max: 3000 },
      { id: "chat", name: "Real-time Chat", description: "Live messaging between users", icon: MessageCircle, min: 1800, max: 3500 },
      { id: "feed", name: "Social Feed", description: "Posts, likes, and comments", icon: Newspaper, min: 1500, max: 3000 },
      { id: "reports", name: "Analytics Dashboard", description: "Charts and progress tracking", icon: ChartColumn, min: 1200, max: 2500 },
      { id: "admin", name: "Web Admin Panel", description: "Manage app users and content from a browser", icon: LayoutDashboard, min: 1500, max: 3000 },
      { id: "ai", name: "AI Features", description: "Chatbot, recommendations, or smart automation", icon: Sparkles, min: 1800, max: 4500 },
    ],
  },
  {
    id: "desktop",
    name: "Desktop App",
    tagline: "Windows and macOS software",
    icon: Monitor,
    base: { min: 2500, max: 5000 },
    baseLabel: "Windows/macOS setup, UI design, installer & QA",
    features: [
      { id: "auth", name: "User Accounts & Login", description: "Secure sign in for staff", icon: Lock, min: 800, max: 1500 },
      { id: "roles", name: "Roles & Permissions", description: "Admin, staff, and custom access levels", icon: ShieldCheck, min: 800, max: 1500 },
      { id: "local-db", name: "Offline Database", description: "Runs fully offline with local storage", icon: Database, min: 1000, max: 2000 },
      { id: "cloud-sync", name: "Cloud Sync", description: "Sync data across devices and branches", icon: RefreshCw, min: 1500, max: 3000 },
      { id: "auto-update", name: "Auto Updates", description: "Push new versions automatically", icon: AppWindow, min: 600, max: 1200 },
      { id: "pos", name: "Point of Sale (POS)", description: "Checkout, cashiering, and sales records", icon: Receipt, min: 2500, max: 5000 },
      { id: "inventory", name: "Inventory Management", description: "Stock levels, suppliers, and alerts", icon: Package, min: 2000, max: 4000 },
      { id: "hardware", name: "Scanner & Printer Support", description: "Barcode scanners, receipt printers, and more", icon: ScanBarcode, min: 1200, max: 2500 },
      { id: "printing", name: "Printing & Receipts", description: "Print invoices, receipts, and forms", icon: Printer, min: 600, max: 1200 },
      { id: "exports", name: "Reports & Excel/PDF Export", description: "Generate and export business reports", icon: FileSpreadsheet, min: 1000, max: 2000 },
      { id: "import", name: "Data Import", description: "Bring in data from Excel or old systems", icon: FileInput, min: 600, max: 1200 },
      { id: "dashboard", name: "Analytics Dashboard", description: "Charts and business summaries", icon: ChartColumn, min: 1200, max: 2500 },
      { id: "backup", name: "Backup & Restore", description: "Scheduled backups and one-click restore", icon: ArchiveRestore, min: 600, max: 1200 },
    ],
  },
];

/** Discount on the combined total when a project spans more than one platform (shared backend). */
export const MULTI_PLATFORM_DISCOUNT = 0.1;

/** Rough delivery pace in USD per week, used to turn a price range into a timeline. */
const WEEKLY_PACE = { fast: 2500, slow: 2000 };

export interface LineItem extends PriceRange {
  platform: PlatformId;
  name: string;
  kind: "base" | "feature";
}

export interface EstimateBreakdown {
  lineItems: LineItem[];
  subtotal: PriceRange;
  discount: PriceRange;
  total: PriceRange;
  weeks: PriceRange;
}

export function getPlatform(id: string) {
  return platforms.find((p) => p.id === id);
}

const roundTo100 = (n: number) => Math.round(n / 100) * 100;

export function estimateWeeks(total: PriceRange): PriceRange {
  return {
    min: Math.max(2, Math.round(total.min / WEEKLY_PACE.fast)),
    max: Math.max(3, Math.round(total.max / WEEKLY_PACE.slow)),
  };
}

/**
 * Builds the price breakdown for the chosen platforms and features.
 * `featureKeys` are "platform:feature" pairs, e.g. "web:auth". Unknown keys are ignored.
 * `extra` is added before the discount (used for AI-priced custom features).
 */
export function calculateEstimate(platformIds: string[], featureKeys: string[], extra: PriceRange = { min: 0, max: 0 }): EstimateBreakdown {
  const chosen = platforms.filter((p) => platformIds.includes(p.id));
  const lineItems: LineItem[] = [];

  for (const platform of chosen) {
    lineItems.push({ platform: platform.id, name: platform.baseLabel, kind: "base", ...platform.base });
    for (const feature of platform.features) {
      if (featureKeys.includes(`${platform.id}:${feature.id}`)) {
        lineItems.push({ platform: platform.id, name: feature.name, kind: "feature", min: feature.min, max: feature.max });
      }
    }
  }

  const subtotal = lineItems.reduce(
    (sum, item) => ({ min: sum.min + item.min, max: sum.max + item.max }),
    { min: extra.min, max: extra.max },
  );
  const rate = chosen.length > 1 ? MULTI_PLATFORM_DISCOUNT : 0;
  const discount = { min: roundTo100(subtotal.min * rate), max: roundTo100(subtotal.max * rate) };
  const total = { min: roundTo100(subtotal.min - discount.min), max: roundTo100(subtotal.max - discount.max) };

  return { lineItems, subtotal, discount, total, weeks: estimateWeeks(total) };
}

export function formatUSD(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}
