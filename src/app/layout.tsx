import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: {
    default: "Adjoa Yeboah Clothing | Premium Ghanaian Fashion",
    template: "%s | Adjoa Yeboah Clothing"
  },
  description: "Bridal, Kente, Ankara and occasion wear — designed in Accra.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg"
  },
  applicationName: "Adjoa Yeboah Clothing",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Adjoa Yeboah"
  }
};

export const viewport: Viewport = {
  themeColor: "#0c0a09",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0c0a09] text-stone-100 antialiased">
        <AppShell>
          <div className="bg-[#6d4c32] px-3 py-2 text-center text-[9px] tracking-[1.4px] text-white">
            INDEPENDENT WEBSITE CONCEPT · NOT THE OFFICIAL BRAND STORE
          </div>
          <Header />
          {children}
          <Footer />
        </AppShell>
      </body>
    </html>
  );
}
