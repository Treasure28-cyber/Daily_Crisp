import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact, Directions & Opening Hours",
  description: "Find Daily Crisps at No. 36 Inyang Street, Calabar. View opening hours or contact our kitchen by phone and WhatsApp.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Daily Crisps in Calabar",
    description: "Address, opening hours, phone and directions for Daily Crisps on Inyang Street.",
    url: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
