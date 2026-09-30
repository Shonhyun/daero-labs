import {
  AppWindow,
  ArchiveRestore,
  Banknote,
  BadgePercent,
  Bell,
  BellRing,
  Building2,
  CalendarCheck,
  CalendarDays,
  Camera,
  ChartColumn,
  CircleUser,
  CirclePlay,
  CircleQuestionMark,
  Clapperboard,
  ClipboardCheck,
  ClipboardList,
  Clock,
  Contact,
  CreditCard,
  Database,
  FileInput,
  FileSpreadsheet,
  FileText,
  FileUp,
  FingerprintPattern,
  GalleryHorizontal,
  Gift,
  Globe,
  GraduationCap,
  HeartPulse,
  History,
  IdCard,
  Images,
  Inbox,
  KeyRound,
  Languages,
  LayoutDashboard,
  LifeBuoy,
  ListChecks,
  ListTodo,
  Lock,
  MailCheck,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquareText,
  MessagesSquare,
  Mic,
  Monitor,
  Moon,
  Navigation,
  Network,
  Newspaper,
  Package,
  PiggyBank,
  Plug,
  Printer,
  QrCode,
  Receipt,
  RefreshCw,
  Repeat,
  ScanBarcode,
  Search,
  Send,
  Settings,
  Share2,
  ShieldCheck,
  ShieldPlus,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Star,
  Store,
  Tag,
  Ticket,
  TrendingUp,
  Trophy,
  Truck,
  Upload,
  UserPlus,
  Users,
  Wallet,
  WifiOff,
  type LucideIcon,
} from "lucide-react";

/*
 * Pricing for the project cost estimator. All amounts are in Philippine pesos (PHP).
 * Each platform has a base cost (setup, UI design, QA, deployment) and every
 * feature adds its own range on top. Each platform's price is then kept between
 * PROJECT_FLOOR and PROJECT_CAP. Edit the numbers here to change the estimates
 * shown on the site. The API recalculates from this file, so the client can't
 * send its own prices.
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
  category: string;
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

/** Every platform's estimate stays within this range (per platform, before the multi-platform discount). */
export const PROJECT_FLOOR = 60_000;
export const PROJECT_CAP = 150_000;

/** Discount on the combined total when a project spans more than one platform (shared backend). */
export const MULTI_PLATFORM_DISCOUNT = 0.1;

/** Rough delivery pace in PHP per week, used to turn a price range into a timeline. */
const WEEKLY_PACE = { fast: 15_000, slow: 11_000 };

// Shorthand for the feature lists below: category, id, name, description, icon, min, max.
function group(category: string, items: [string, string, string, LucideIcon, number, number][]): Feature[] {
  return items.map(([id, name, description, icon, min, max]) => ({ id, name, description, category, icon, min, max }));
}

export const platforms: Platform[] = [
  {
    id: "web",
    name: "Web App",
    tagline: "Websites, portals, and web systems",
    icon: Globe,
    base: { min: 35_000, max: 45_000 },
    baseLabel: "Web setup, UI design, hosting & QA",
    features: [
      ...group("Accounts & Security", [
        ["auth", "User Accounts & Login", "Sign up, log in, and password reset", Lock, 4_000, 6_000],
        ["social-login", "Google / Facebook Login", "One-click sign in with social accounts", KeyRound, 2_000, 3_000],
        ["email-verify", "Email Verification", "Confirm accounts through email", MailCheck, 1_500, 2_500],
        ["2fa", "Two-Factor Authentication", "Extra security with OTP codes", ShieldPlus, 2_500, 4_000],
        ["profiles", "User Profiles", "Editable profiles with photos", CircleUser, 2_500, 4_000],
        ["roles", "Roles & Permissions", "Control who can see and do what", ShieldCheck, 4_000, 6_000],
        ["audit", "Activity Logs", "Track who changed what and when", History, 3_000, 5_000],
      ]),
      ...group("Admin & Operations", [
        ["admin", "Admin Dashboard", "Manage users, content, and settings", LayoutDashboard, 8_000, 12_000],
        ["user-mgmt", "User Management", "Add, edit, and deactivate users", Users, 3_000, 5_000],
        ["settings", "Settings Panel", "Change site options without code", Settings, 2_500, 4_000],
        ["approvals", "Approval Workflows", "Request, review, and approve items", ClipboardCheck, 5_000, 8_000],
        ["tasks", "Task & Project Tracking", "Assign tasks and follow progress", ListTodo, 6_000, 9_000],
        ["employees", "Employee Records", "Staff profiles, documents, and details", IdCard, 5_000, 8_000],
        ["attendance", "Attendance & Time Tracking", "Time in, time out, and summaries", Clock, 5_000, 8_000],
        ["inventory", "Inventory Management", "Stock levels, suppliers, and alerts", Package, 7_000, 10_000],
        ["crm", "Customer Management (CRM)", "Leads, customer history, and follow-ups", Contact, 8_000, 12_000],
      ]),
      ...group("Commerce & Payments", [
        ["payments", "Online Payments", "GCash, Maya, and card checkout", CreditCard, 6_000, 9_000],
        ["ecommerce", "Product Catalog & Cart", "Browse products, add to cart, and order", ShoppingCart, 8_000, 12_000],
        ["orders", "Order Management", "Track orders from placed to delivered", ClipboardList, 5_000, 8_000],
        ["invoices", "Invoices & Receipts", "Generate and send billing documents", Receipt, 4_000, 6_000],
        ["subscriptions", "Subscriptions & Memberships", "Recurring plans and member access", Repeat, 6_000, 9_000],
        ["coupons", "Discounts & Promo Codes", "Vouchers and limited-time promos", Tag, 2_500, 4_000],
        ["shipping", "Delivery & Shipping Rates", "Delivery areas, fees, and tracking", Truck, 4_000, 6_000],
        ["budget", "Budget & Expense Tracking", "Record spending and set budgets", PiggyBank, 5_000, 8_000],
      ]),
      ...group("Booking & Scheduling", [
        ["booking", "Booking & Reservations", "Appointments, rooms, or services", CalendarCheck, 6_000, 9_000],
        ["calendar", "Calendar & Events", "Shared calendars and event pages", CalendarDays, 4_000, 6_000],
        ["reminders", "Email / SMS Reminders", "Automatic reminders before schedules", BellRing, 2_500, 4_000],
        ["queue", "Queue Management", "Digital queue numbers and status", Ticket, 5_000, 7_000],
      ]),
      ...group("Content & Pages", [
        ["cms", "Blog / Content Manager", "Publish and edit pages without code", FileText, 4_000, 6_000],
        ["gallery", "Photo Gallery / Portfolio", "Showcase photos and past work", Images, 2_000, 3_500],
        ["faq", "FAQ & Help Center", "Answers to common questions", CircleQuestionMark, 2_000, 3_000],
        ["forms", "Custom Forms & Surveys", "Collect responses and feedback", ListChecks, 3_000, 5_000],
        ["reviews", "Reviews & Ratings", "Customer stars and testimonials", Star, 3_000, 4_500],
        ["i18n", "Multi-language", "English, Filipino, and more", Languages, 3_000, 5_000],
        ["seo", "SEO Setup", "Get found on Google", TrendingUp, 2_000, 3_500],
        ["dark-mode", "Dark Mode", "Light and dark themes", Moon, 1_500, 2_500],
      ]),
      ...group("Communication", [
        ["chat", "Real-time Chat", "Live messaging between users", MessageCircle, 7_000, 10_000],
        ["email-notif", "Email Notifications", "Automatic emails for key events", Mail, 2_000, 3_500],
        ["sms", "SMS Notifications", "Text alerts to customers", MessageSquareText, 3_000, 5_000],
        ["in-app-notif", "In-app Notifications", "Alerts inside the dashboard", Bell, 2_500, 4_000],
        ["newsletter", "Newsletter / Email Marketing", "Send updates to subscribers", Send, 3_000, 5_000],
        ["inquiries", "Contact & Inquiry Forms", "Leads straight to your inbox", Inbox, 1_500, 2_500],
        ["comments", "Comments & Discussions", "Threads and replies on posts", MessagesSquare, 3_000, 5_000],
      ]),
      ...group("Data & Integrations", [
        ["search", "Search & Filters", "Find records fast with smart filters", Search, 3_000, 4_500],
        ["reports", "Reports & Analytics", "Charts, summaries, and insights", ChartColumn, 6_000, 9_000],
        ["exports", "Excel / PDF Export", "Download reports and records", FileSpreadsheet, 3_000, 4_500],
        ["uploads", "File Uploads & Media", "Upload images, documents, and videos", Upload, 2_500, 4_000],
        ["maps", "Maps & Location", "Store maps, pins, and directions", MapPin, 3_500, 5_000],
        ["integrations", "Third-party Integrations", "Connect to APIs and tools you use", Plug, 5_000, 8_000],
        ["pwa", "Installable Web App (PWA)", "Add to home screen like an app", AppWindow, 3_000, 5_000],
        ["ai", "AI Chatbot / Assistant", "AI-powered answers and automation", Sparkles, 8_000, 12_000],
      ]),
    ],
  },
  {
    id: "mobile",
    name: "Mobile App",
    tagline: "iOS and Android apps",
    icon: Smartphone,
    base: { min: 30_000, max: 40_000 },
    baseLabel: "iOS & Android setup, UI design, QA & store release",
    features: [
      ...group("Accounts & Security", [
        ["auth", "User Accounts & Login", "Sign up, log in, and password reset", Lock, 4_000, 6_000],
        ["social-login", "Google / Facebook / Apple Login", "One-tap sign in with social accounts", KeyRound, 2_000, 3_000],
        ["otp", "Phone / OTP Verification", "Verify users by mobile number", Smartphone, 2_500, 4_000],
        ["biometrics", "Face ID / Fingerprint", "Unlock the app with biometrics", FingerprintPattern, 2_000, 3_000],
        ["profiles", "User Profiles", "Editable profiles with photos", CircleUser, 2_500, 4_000],
        ["roles", "Roles & Permissions", "Different access for staff and users", ShieldCheck, 3_500, 5_000],
      ]),
      ...group("Engagement", [
        ["push", "Push Notifications", "Alerts and reminders on the phone", Bell, 3_000, 4_500],
        ["onboarding", "Onboarding Screens", "Welcome walkthrough for new users", GalleryHorizontal, 1_500, 2_500],
        ["feed", "Social Feed", "Posts, photos, and updates", Newspaper, 6_000, 9_000],
        ["comments", "Comments & Likes", "Reactions and replies on posts", MessagesSquare, 3_000, 4_500],
        ["follow", "Follow / Friends", "Connect with other users", UserPlus, 3_000, 4_500],
        ["chat", "Real-time Chat", "Live messaging between users", MessageCircle, 7_000, 10_000],
        ["stories", "Stories / Short Videos", "Short video and story posts", Clapperboard, 8_000, 12_000],
        ["gamification", "Points, Badges & Leaderboards", "Rewards that keep users coming back", Trophy, 5_000, 8_000],
        ["referrals", "Referral / Invite Friends", "Reward users for inviting others", Gift, 3_000, 4_500],
        ["reviews", "Reviews & Ratings", "Stars and feedback from users", Star, 3_000, 4_500],
      ]),
      ...group("Commerce & Payments", [
        ["payments", "In-app Payments", "GCash, Maya, and card payments", CreditCard, 6_000, 9_000],
        ["subscriptions", "Subscriptions & Premium", "Paid plans and premium features", Repeat, 6_000, 9_000],
        ["ecommerce", "Product Catalog & Cart", "Shop, add to cart, and check out", ShoppingCart, 8_000, 12_000],
        ["orders", "Order Tracking", "Follow orders until delivery", Truck, 4_000, 6_000],
        ["wallet", "E-Wallet / Credits", "Store credits and balances", Wallet, 6_000, 9_000],
        ["coupons", "Promo Codes & Vouchers", "Discounts and limited-time deals", Tag, 2_500, 4_000],
        ["loyalty", "Loyalty Points", "Earn and redeem points", BadgePercent, 4_000, 6_000],
        ["budget", "Budget & Expense Tracker", "Log spending and set limits", PiggyBank, 5_000, 8_000],
      ]),
      ...group("Booking & Scheduling", [
        ["booking", "Booking & Reservations", "Appointments and reservations", CalendarCheck, 6_000, 9_000],
        ["calendar", "Calendar & Reminders", "Schedules with reminders", CalendarDays, 3_500, 5_000],
        ["queue", "Queue / Ticketing", "Digital queue numbers and tickets", Ticket, 4_500, 6_500],
      ]),
      ...group("Location & Device", [
        ["maps", "Maps & Location", "Maps, pins, and directions", MapPin, 4_000, 6_000],
        ["live-tracking", "Live Location Tracking", "Real-time rider or driver tracking", Navigation, 7_000, 10_000],
        ["store-locator", "Nearby Places / Store Locator", "Find the closest branch", Store, 3_000, 4_500],
        ["camera", "Camera & Photo Upload", "Take and upload photos in the app", Camera, 2_500, 4_000],
        ["qr", "QR / Barcode Scanner", "Scan codes with the phone camera", QrCode, 2_500, 4_000],
        ["media", "Video & Audio Player", "Stream videos, music, or podcasts", CirclePlay, 4_000, 6_000],
        ["voice", "Voice Notes / Recording", "Record and send audio", Mic, 3_500, 5_000],
        ["files", "Document Upload", "Send IDs, PDFs, and files", FileUp, 2_500, 4_000],
        ["share", "Share to Social Media", "Share content to Facebook and more", Share2, 1_500, 2_500],
        ["offline", "Offline Mode & Sync", "Works without internet, syncs later", WifiOff, 7_000, 10_000],
      ]),
      ...group("Content & Learning", [
        ["articles", "Articles / News", "Publish updates and announcements", FileText, 4_000, 6_000],
        ["courses", "Courses & Lessons", "Modules, lessons, and progress", GraduationCap, 7_000, 10_000],
        ["quizzes", "Quizzes & Exams", "Timed tests with scoring", ListChecks, 5_000, 8_000],
        ["forms", "Forms & Surveys", "Collect responses in the app", ClipboardList, 3_000, 4_500],
        ["search", "Search & Filters", "Find content fast", Search, 3_000, 4_500],
        ["i18n", "Multi-language", "English, Filipino, and more", Languages, 3_000, 5_000],
        ["dark-mode", "Dark Mode", "Light and dark themes", Moon, 1_500, 2_500],
      ]),
      ...group("Business & Admin", [
        ["admin", "Web Admin Panel", "Manage users and content from a browser", LayoutDashboard, 8_000, 12_000],
        ["reports", "Analytics Dashboard", "Charts and progress tracking", ChartColumn, 5_000, 8_000],
        ["attendance", "Attendance / Check-in", "Clock in with location or QR", Clock, 4_500, 6_500],
        ["health", "Health & Fitness Tracking", "Steps, workouts, and health logs", HeartPulse, 6_000, 9_000],
        ["support", "In-app Support / Help Desk", "Tickets and support chat", LifeBuoy, 3_500, 5_000],
        ["integrations", "Third-party Integrations", "Connect to APIs and tools you use", Plug, 5_000, 8_000],
        ["ai", "AI Features", "Chatbot, recommendations, or automation", Sparkles, 8_000, 12_000],
      ]),
    ],
  },
  {
    id: "desktop",
    name: "Desktop App",
    tagline: "Windows and macOS software",
    icon: Monitor,
    base: { min: 35_000, max: 45_000 },
    baseLabel: "Windows/macOS setup, UI design, installer & QA",
    features: [
      ...group("Accounts & Security", [
        ["auth", "User Accounts & Login", "Secure sign in for staff", Lock, 3_500, 5_000],
        ["roles", "Roles & Permissions", "Admin, cashier, and custom access", ShieldCheck, 3_500, 5_000],
        ["audit", "Activity Logs", "Track who changed what and when", History, 3_000, 4_500],
        ["branches", "Multi-branch Support", "Manage several stores or offices", Building2, 6_000, 9_000],
      ]),
      ...group("Data & Sync", [
        ["local-db", "Offline Database", "Runs fully offline with local storage", Database, 4_000, 6_000],
        ["lan", "Multi-PC (LAN) Setup", "Several computers share one database", Network, 5_000, 8_000],
        ["cloud-sync", "Cloud Sync", "Sync data online across devices", RefreshCw, 6_000, 9_000],
        ["backup", "Backup & Restore", "Scheduled backups and one-click restore", ArchiveRestore, 2_500, 4_000],
        ["import", "Data Import", "Bring in data from Excel or old systems", FileInput, 2_500, 4_000],
      ]),
      ...group("Business Operations", [
        ["pos", "Point of Sale (POS)", "Checkout, cashiering, and sales records", Receipt, 9_000, 13_000],
        ["inventory", "Inventory Management", "Stock levels, suppliers, and alerts", Package, 7_000, 10_000],
        ["purchasing", "Purchasing & Suppliers", "Purchase orders and deliveries", Truck, 5_000, 8_000],
        ["billing", "Billing & Invoicing", "Invoices, statements, and balances", FileText, 4_000, 6_000],
        ["customers", "Customer Records", "Customer list and purchase history", Contact, 3_500, 5_000],
        ["appointments", "Appointments & Scheduling", "Bookings for clinics and services", CalendarCheck, 5_000, 8_000],
        ["attendance", "Attendance & Time Tracking", "Time in, time out, and summaries", Clock, 4_500, 6_500],
        ["payroll", "Payroll", "Salaries, deductions, and payslips", Banknote, 8_000, 12_000],
      ]),
      ...group("Hardware & Printing", [
        ["hardware", "Scanner & Cash Drawer Support", "Barcode scanners and cash drawers", ScanBarcode, 4_500, 6_500],
        ["printing", "Receipt & Document Printing", "Print receipts, invoices, and forms", Printer, 3_000, 4_500],
        ["labels", "Barcode & Label Printing", "Print price tags and labels", Tag, 3_000, 4_500],
      ]),
      ...group("Reports & System", [
        ["dashboard", "Analytics Dashboard", "Charts and business summaries", ChartColumn, 5_000, 8_000],
        ["exports", "Reports & Excel/PDF Export", "Daily, monthly, and custom reports", FileSpreadsheet, 3_500, 5_500],
        ["auto-update", "Auto Updates", "Push new versions automatically", AppWindow, 3_000, 4_500],
        ["alerts", "Desktop Notifications", "Low stock and reminder alerts", Bell, 2_000, 3_000],
      ]),
    ],
  },
];

export interface LineItem extends PriceRange {
  platform: PlatformId;
  name: string;
  kind: "base" | "feature" | "floor" | "cap";
}

export interface EstimateBreakdown {
  lineItems: LineItem[];
  subtotal: PriceRange;
  discount: PriceRange;
  total: PriceRange;
  weeks: PriceRange;
  /** True when at least one platform hit PROJECT_CAP, so the final price is set on a call. */
  capped: boolean;
}

export function getPlatform(id: string) {
  return platforms.find((p) => p.id === id);
}

const roundTo1000 = (n: number) => Math.round(n / 1000) * 1000;
const sumRanges = (items: PriceRange[]) =>
  items.reduce((sum, r) => ({ min: sum.min + r.min, max: sum.max + r.max }), { min: 0, max: 0 });

export function estimateWeeks(total: PriceRange): PriceRange {
  const min = Math.max(3, Math.round(total.min / WEEKLY_PACE.fast));
  return { min, max: Math.max(min + 1, Math.round(total.max / WEEKLY_PACE.slow)) };
}

/** Keeps a platform's price inside PROJECT_FLOOR–PROJECT_CAP, with at least a ₱10,000 spread. */
function clampPlatform(range: PriceRange): PriceRange {
  const min = Math.min(Math.max(range.min, PROJECT_FLOOR), PROJECT_CAP);
  const max = Math.min(Math.max(range.max, min + 10_000), PROJECT_CAP);
  return { min: Math.min(min, max), max };
}

/**
 * Builds the price breakdown for the chosen platforms and features.
 * `featureKeys` are "platform:feature" pairs, e.g. "web:auth". Unknown keys are ignored.
 * `extra` is added after the per-platform floor/cap (used for AI-priced custom features).
 */
export function calculateEstimate(platformIds: string[], featureKeys: string[], extra: PriceRange = { min: 0, max: 0 }): EstimateBreakdown {
  const chosen = platforms.filter((p) => platformIds.includes(p.id));
  const lineItems: LineItem[] = [];
  let capped = false;

  for (const platform of chosen) {
    const items: LineItem[] = [{ platform: platform.id, name: platform.baseLabel, kind: "base", ...platform.base }];
    for (const feature of platform.features) {
      if (featureKeys.includes(`${platform.id}:${feature.id}`)) {
        items.push({ platform: platform.id, name: feature.name, kind: "feature", min: feature.min, max: feature.max });
      }
    }

    // Show the floor/cap as its own line so the breakdown still adds up.
    const raw = sumRanges(items);
    const clamped = clampPlatform(raw);
    if (clamped.min !== raw.min || clamped.max !== raw.max) {
      const isCap = raw.max > PROJECT_CAP;
      capped ||= isCap;
      items.push({
        platform: platform.id,
        name: isCap ? "Maximum project rate" : "Minimum project rate",
        kind: isCap ? "cap" : "floor",
        min: clamped.min - raw.min,
        max: clamped.max - raw.max,
      });
    }
    lineItems.push(...items);
  }

  const platformTotal = sumRanges(lineItems);
  const subtotal = { min: platformTotal.min + extra.min, max: platformTotal.max + extra.max };
  const rate = chosen.length > 1 ? MULTI_PLATFORM_DISCOUNT : 0;
  const discount = { min: roundTo1000(subtotal.min * rate), max: roundTo1000(subtotal.max * rate) };
  const total = { min: roundTo1000(subtotal.min - discount.min), max: roundTo1000(subtotal.max - discount.max) };

  return { lineItems, subtotal, discount, total, weeks: estimateWeeks(total), capped };
}

export function formatPHP(n: number) {
  return new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(n);
}

/**
 * Formats a range. `signed` is for adjustment lines (floor, cap, discount): it adds +/−,
 * shows a single value when one side is zero, and lists the smaller amount first.
 */
export function formatRange(r: PriceRange, signed = false) {
  const fmt = (n: number) => (signed && n > 0 ? "+" : "") + (n < 0 ? "−" + formatPHP(-n) : formatPHP(n));
  if (!signed) return r.min === r.max ? fmt(r.min) : `${fmt(r.min)} – ${fmt(r.max)}`;

  const values = [r.min, r.max].filter((n) => n !== 0).sort((a, b) => Math.abs(a) - Math.abs(b));
  if (values.length === 0) return fmt(0);
  return values.length === 1 || values[0] === values[1] ? fmt(values[0]) : `${fmt(values[0])} – ${fmt(values[1])}`;
}
