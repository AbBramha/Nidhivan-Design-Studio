import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Nidhivan Design Studio | Ar. Lovesh Garg",
  description: "Designing Spaces That Feel Alive. Architectural commissions, interior design, and bespoke landscape architecture.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`} data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col selection:bg-white selection:text-black">
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
