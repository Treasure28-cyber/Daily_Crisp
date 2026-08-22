import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { business, businessHours } from "@/data/business";

const explore = [
  ["Home Page", "/"],
  ["Ultimate Menu", "/menu"],
  ["Order Online", "/order"],
  // ["Our Story", "/about"],
  ["Get In Touch", "/contact"],
];

function FooterHeading({ children }: { children: string }) {
  return (
    <h3 className="font-playfair text-xl font-bold text-white">
      {children}
      <span className="mt-3 block h-0.5 w-10 bg-[var(--red)]" />
    </h3>
  );
}

export function Footer() {
  return (
    <footer
      className="relative bg-black text-white"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(192,21,31,0.04) 0%, transparent 60%)",
        }}
      />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-flex rounded-full bg-white px-2 py-1">
              <Image src="/logo.webp" alt="Daily Crisps logo" width={90} height={70} className="h-12 w-auto object-contain" />
            </span>
            <div className="font-barlow text-lg font-semibold tracking-[0.15em]">
              DAILY <span className="text-[var(--red-light)]">CRISPS</span>
            </div>
          </div>
          <p className="mt-5 font-barlow text-sm font-light leading-7 text-white/65">
            Crafting the finest crisp recipes in Calabar with high-grade local chickens, golden secret marinades, and hand-milled peppers. No shortcuts, just pure crispy heritage.
          </p>
          <div className="mt-6 flex gap-3">
            {["IG", "FB", "X"].map((label) => (
              <span key={label} className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 font-barlow text-xs font-semibold text-white/75">
                {label}
              </span>
            ))}
          </div>
        </div>
        <div>
          <FooterHeading>Explore</FooterHeading>
          <div className="mt-6 flex flex-col gap-3 font-barlow text-sm text-white/65">
            {explore.map(([label, href]) => (
              <Link key={href} href={href} className="transition hover:text-[var(--red-light)]">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <FooterHeading>Opening Hours</FooterHeading>
          <div className="mt-6 space-y-4 font-barlow text-sm text-white/65">
            {businessHours.map((hours) => (
              <p key={hours.label}>{hours.label}: <strong className="text-white">{hours.display}</strong></p>
            ))}
          </div>
        </div>
        <div>
          <FooterHeading>Address & Location</FooterHeading>
          <address className="mt-6 space-y-4 font-barlow text-sm not-italic leading-6 text-white/65">
            <a href="https://maps.google.com/?q=No+36+Inyang+Street,+Calabar,+Cross+River+State,+Nigeria" className="flex gap-3 transition hover:text-white"><MapPin className="mt-1 h-4 w-4 shrink-0 text-[var(--red-light)]" /> {business.streetAddress}, {business.locality}, {business.region}, Nigeria</a>
            <a href={`tel:${business.phoneE164}`} className="flex gap-3 transition hover:text-white"><Phone className="h-4 w-4 shrink-0 text-[var(--red-light)]" /> {business.phoneDisplay}</a>
            <a href={`mailto:${business.email}`} className="flex gap-3 transition hover:text-white"><Mail className="h-4 w-4 shrink-0 text-[var(--red-light)]" /> {business.email}</a>
          </address>
        </div>
      </div>
      <div className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 font-barlow text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Daily Crisps. All rights reserved. Made fresh daily in Calabar, Nigeria.</p>
          <p>Crafted with passion for crispy food lovers ♡</p>
        </div>
      </div>
    </footer>
  );
}
