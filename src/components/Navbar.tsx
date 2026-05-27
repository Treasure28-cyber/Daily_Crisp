"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Our Menu" },
  { href: "/order", label: "Order Now" },
  // { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact Us" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const transparentHome = pathname === "/" && !scrolled;
  const glassNav = scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        pathname === "/" ? "-mb-[88px] sm:-mb-[96px]" : ""
      } ${
        glassNav
          ? "border-b border-white/60 bg-white/88 py-2 shadow-xl backdrop-blur-xl"
          : transparentHome
            ? "border-b border-white/50 bg-white/78 py-4 shadow-sm backdrop-blur-md"
            : "border-b border-[var(--mid-grey)] bg-white py-4"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex min-w-[90px] items-center gap-3" aria-label="Daily Crisps home">
          <span className="inline-flex rounded-full bg-transparent transition">
            <Image
              src="/logo.webp"
              alt="Daily Crisps"
              width={104}
              height={108}
              className="h-14 w-auto object-contain sm:h-16"
              priority
            />
          </span>
        </Link>
        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative font-barlow text-sm font-medium transition ${
                  active
                    ? "text-[var(--red-light)]"
                    : "text-[var(--charcoal)] hover:text-[var(--red)]"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-2 left-0 h-0.5 bg-[var(--red)] transition-all ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>
        <Link
          href="/order"
          aria-label="Open order page"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--mid-grey)] text-[var(--charcoal)] transition hover:border-[var(--red)] hover:bg-white hover:text-[var(--red)]"
        >
          <ShoppingBag className="h-5 w-5" />
        </Link>
      </nav>
    </header>
  );
}
