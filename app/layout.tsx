import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { BackToTop } from "@/components/BackToTop";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const metadata: Metadata = {
  title: "Daero Labs | Build What's Next",
  description: "Daero Labs is a small, focused software studio building modern web, mobile, CRM, and desktop applications with clean architecture and future-ready tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body id="top" className={`${inter.variable} ${sora.variable} antialiased bg-white-smoke dark:bg-rich-black transition-colors duration-300`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <SmoothScrollProvider>
                  {children}
                </SmoothScrollProvider>
              </main>
              <Footer />
              <BackToTop />
            </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
