"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Our Menu" },
  { href: "/order", label: "Order Now" },
  // { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact Us" },
];

export function Navbar() {
  const pathname = usePathname();
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
        pathname === "/" ? "-mb-[72px]" : ""
      } ${
        glassNav
          ? "border-b border-white/60 bg-white/88 py-3 shadow-xl backdrop-blur-xl"
          : transparentHome
            ? "border-b border-white/50 bg-white/78 py-3 shadow-sm backdrop-blur-md"
            : "border-b border-[var(--mid-grey)] bg-white py-3"
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
              className="h-12 w-auto object-contain"
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
        <div className="flex items-center gap-2">
          <Link
            href="/order"
            aria-label="Open order page"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--mid-grey)] text-[var(--charcoal)] transition hover:border-[var(--red)] hover:bg-white hover:text-[var(--red)]"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 ? (
              <span className="absolute -right-1 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-[var(--red)] px-1.5 font-barlow text-[0.68rem] font-bold leading-none text-white shadow-[0_8px_18px_rgba(192,21,31,0.35)] ring-2 ring-white">
                {count}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--mid-grey)] bg-white/80 text-[var(--charcoal)] transition hover:border-[var(--red)] hover:text-[var(--red)] lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      <div
        id="mobile-navigation"
        className={`${menuOpen ? "grid" : "hidden"} absolute left-3 right-3 top-[calc(100%+0.75rem)] gap-1 overflow-hidden rounded-3xl border border-white/90 bg-white/90 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.32)] ring-1 ring-black/10 backdrop-blur-2xl lg:hidden`}
      >
        {links.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            aria-current={pathname === link.href ? "page" : undefined}
            className={`px-5 py-4 font-barlow text-sm font-semibold transition ${
              pathname === link.href
                ? "rounded-2xl bg-red-50/90 text-[var(--red)] shadow-sm"
                : "text-[var(--charcoal)] hover:rounded-2xl hover:bg-white/65 hover:text-[var(--red)]"
            } ${index < links.length - 1 ? "border-b border-black/5" : ""}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
