import type { Metadata } from "next";
import { Barlow, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { TopBar } from "@/components/TopBar";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-playfair",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-barlow",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dailycrisps.ng"),
  title: {
    default: "Daily Crisps | Calabar",
    template: "%s | Daily Crisps",
  },
  description: "Calabar's finest crispy chicken restaurant on Inyang Street",
  openGraph: {
    title: "Daily Crisps | Calabar",
    description: "Calabar's finest crispy chicken restaurant on Inyang Street",
    siteName: "Daily Crisps",
    images: [
      {
        url: "/daily-crips-images/Fried%20Rice,%20Chicken%20with%20Salad_.jpg",
        width: 1200,
        height: 900,
        alt: "Daily Crisps rice, chicken, and salad platter",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${playfair.variable} ${barlow.variable}`}>
      <body className="flex min-h-screen flex-col">
        <TopBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
