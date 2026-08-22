import type { Metadata } from "next";
import { Barlow, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CartProvider } from "@/components/CartProvider";
import { business, businessHours } from "@/data/business";
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
  metadataBase: new URL(business.siteUrl),
  title: {
    default: "Daily Crisps | Crispy Chicken & Nigerian Food in Calabar",
    template: "%s | Daily Crisps",
  },
  description: "Order crispy chicken, Nigerian rice dishes and local soups from Daily Crisps on Inyang Street, Calabar.",
  applicationName: business.name,
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: business.siteUrl,
    title: "Daily Crisps | Crispy Chicken & Nigerian Food in Calabar",
    description: "Order crispy chicken, Nigerian rice dishes and local soups from Daily Crisps on Inyang Street, Calabar.",
    siteName: business.name,
    images: [
      {
        url: "/daily-crips-images/Fried%20Rice,%20Chicken%20with%20Salad_.jpg",
        width: 1200,
        height: 900,
        alt: "Daily Crisps rice, chicken, and salad platter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Crisps | Crispy Chicken & Nigerian Food in Calabar",
    description: "Crispy chicken, Nigerian rice dishes and local soups from Inyang Street, Calabar.",
    images: ["/daily-crisps-interior-hero-v2.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const restaurantJsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${business.siteUrl}/#restaurant`,
    name: business.name,
    url: business.siteUrl,
    logo: `${business.siteUrl}/logo.webp`,
    image: `${business.siteUrl}/daily-crisps-interior-hero-v2.png`,
    telephone: business.phoneE164,
    email: business.email,
    priceRange: "₦500-₦3,000",
    servesCuisine: ["Nigerian", "Calabar", "Chicken"],
    hasMenu: `${business.siteUrl}/menu`,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.streetAddress,
      addressLocality: business.locality,
      addressRegion: business.region,
      addressCountry: business.country,
    },
    openingHoursSpecification: businessHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.days.map((day) => `https://schema.org/${day}`),
      opens: hours.opens,
      closes: hours.closes,
    })),
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${barlow.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(restaurantJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
