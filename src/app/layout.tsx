import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import AppShell from "@/components/AppShell";

const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Adjoa Yeboah Clothing | Ghanaian Designer Fashion",
    template: "%s | Adjoa Yeboah Clothing",
  },
  description:
    "Discover expressive Ghanaian designer fashion, ready-to-wear pieces and bespoke creations from Adjoa Yeboah Clothing in Accra.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon", type: "image/png", sizes: "64x64" },
    ],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  applicationName: "Adjoa Yeboah Clothing",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Adjoa Yeboah",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="min-h-screen antialiased">
        <AppShell>
          <Header />
          <main className="min-h-screen pt-[calc(var(--header-height)+env(safe-area-inset-top))]">{children}</main>
          <Footer />
        </AppShell>
      </body>
    </html>
  );
}
