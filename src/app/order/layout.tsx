import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Food on WhatsApp in Calabar",
  description: "Build your Daily Crisps order online and send it directly to our Calabar kitchen through WhatsApp.",
  alternates: { canonical: "/order" },
  openGraph: {
    title: "Order Daily Crisps on WhatsApp",
    description: "Choose your dishes and send your order directly to our Calabar kitchen.",
    url: "/order",
  },
};

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
