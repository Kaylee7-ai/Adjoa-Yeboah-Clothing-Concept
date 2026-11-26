import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: { default: "Adjoa Yeboah Clothing | Premium Ghanaian Fashion", template: "%s | Adjoa Yeboah Clothing" },
  description: "An independent premium Ghanaian fashion storefront concept.",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  applicationName: "Adjoa Yeboah Clothing",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Adjoa Yeboah" }
};

export const viewport: Viewport = { themeColor: "#f8f5ef", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f8f5ef] text-[#30251f] antialiased">
        <AppShell>
          <div className="bg-[#eadfd2] px-3 py-2 text-center text-[9px] font-semibold tracking-[1.35px] text-[#5b4637]">
            INDEPENDENT WEBSITE CONCEPT · NOT THE OFFICIAL BRAND STORE
          </div>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AppShell>
      </body>
    </html>
  );
}
