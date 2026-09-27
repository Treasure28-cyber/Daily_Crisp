import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { business, businessHours } from "@/data/business";

const explore = [
  ["Home", "/"],
  ["Menu", "/menu"],
  ["Order online", "/order"],
  ["Visit & contact", "/contact"],
];

function FooterHeading({ children }: { children: string }) {
  return <h3 className="eyebrow text-[#f7bd7d]">{children}</h3>;
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#1d0d08] text-white">
      <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-[var(--red)]/12 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-[86rem] px-5 pb-8 pt-16 sm:px-8 sm:pt-20">
        <div className="grid gap-14 border-b border-white/12 pb-14 lg:grid-cols-[1.35fr_.7fr_.9fr_1fr]">
          <div className="max-w-md">
            <Link href="/" className="inline-flex items-center gap-4" aria-label="Daily Crisps home">
              <span className="inline-flex rounded-full bg-white p-1.5">
                <Image src="/logo.webp" alt="" width={90} height={70} className="h-14 w-auto object-contain" />
              </span>
              <span className="font-barlow text-sm font-semibold uppercase tracking-[0.2em]">Daily Crisps</span>
            </Link>
            <p className="mt-7 font-playfair text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Calabar favourites,<br />made for a proper appetite.
            </p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/62">
              Freshly prepared rice dishes, local soups and satisfying proteins from our kitchen on Inyang Street.
            </p>
            <Link href="/order" className="mt-7 inline-flex items-center gap-2 border-b border-[#f7bd7d] pb-1 font-barlow text-sm font-semibold uppercase tracking-[0.14em] text-[#f7bd7d]">
              Start your order <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div>
            <FooterHeading>Explore</FooterHeading>
            <nav className="mt-6 flex flex-col items-start gap-3" aria-label="Footer navigation">
              {explore.map(([label, href]) => (
                <Link key={href} href={href} className="text-sm text-white/68 transition hover:translate-x-1 hover:text-white">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <FooterHeading>Kitchen hours</FooterHeading>
            <div className="mt-6 space-y-4 text-sm text-white/68">
              {businessHours.map((hours) => (
                <p key={hours.label}>
                  <span className="block text-white">{hours.label}</span>
                  {hours.display}
                </p>
              ))}
            </div>
          </div>

          <div>
            <FooterHeading>Find us</FooterHeading>
            <address className="mt-6 space-y-5 text-sm not-italic leading-6 text-white/68">
              <a href="https://maps.google.com/?q=No+36+Inyang+Street,+Calabar,+Cross+River+State,+Nigeria" className="flex gap-3 transition hover:text-white">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#f7bd7d]" />
                {business.streetAddress}, {business.locality}, {business.region}, Nigeria
              </a>
              <a href={`tel:${business.phoneE164}`} className="flex gap-3 transition hover:text-white">
                <Phone className="h-4 w-4 shrink-0 text-[#f7bd7d]" /> {business.phoneDisplay}
              </a>
              <a href={`mailto:${business.email}`} className="flex gap-3 transition hover:text-white">
                <Mail className="h-4 w-4 shrink-0 text-[#f7bd7d]" /> {business.email}
              </a>
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 Daily Crisps. All rights reserved.</p>
          <p>Freshly prepared in Calabar, Nigeria.</p>
        </div>
      </div>
    </footer>
  );
}
