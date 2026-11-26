import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: {
    default: "Adjoa Yeboah Clothing | Premium Ghanaian Fashion",
    template: "%s | Adjoa Yeboah Clothing",
  },
  description:
    "Adjoa Yeboah Clothing — contemporary Ghanaian fashion, bespoke occasionwear and distinctive African-inspired design.",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  applicationName: "Adjoa Yeboah Clothing",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Adjoa Yeboah" },
};

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAF7F2] text-[#181512] antialiased">
        <AppShell>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AppShell>
      </body>
    </html>
  );
}
