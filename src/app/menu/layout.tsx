import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu & Prices in Calabar",
  description: "See Daily Crisps menu prices for Nigerian rice dishes, chicken, beef, fish and local soups in Calabar.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "Daily Crisps Menu & Prices in Calabar",
    description: "Browse Nigerian rice dishes, proteins and local soups from Daily Crisps.",
    url: "/menu",
  },
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return children;
}
