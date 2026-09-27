"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  // { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact Us" },
];

export function Navbar() {
  const pathname = usePathname();
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const transparentHome = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${pathname === "/" ? "-mb-[82px]" : ""} ${
        transparentHome
          ? "border-b border-white/15 bg-[#1d0d08]/35 py-4 text-white backdrop-blur-md"
          : "border-b border-black/5 bg-[rgba(255,251,246,.94)] py-3 text-[var(--charcoal)] shadow-[0_12px_36px_rgba(61,27,17,.08)] backdrop-blur-xl"
      }`}
    >
      <nav className="mx-auto flex max-w-[86rem] items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex min-w-[90px] items-center gap-3" aria-label="Daily Crisps home">
          <span className={`inline-flex rounded-full p-1 transition ${transparentHome ? "bg-white/95" : "bg-transparent"}`}>
            <Image
              src="/logo.webp"
              alt="Daily Crisps"
              width={104}
              height={108}
              className="h-11 w-auto object-contain"
              priority
            />
          </span>
        </Link>
        <div className="hidden items-center gap-9 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative font-barlow text-sm font-medium transition ${
                  active
                    ? transparentHome ? "text-white" : "text-[var(--red)]"
                    : transparentHome ? "text-white/75 hover:text-white" : "text-[var(--charcoal)] hover:text-[var(--red)]"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-2 left-0 h-px transition-all ${transparentHome ? "bg-white" : "bg-[var(--red)]"} ${
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
            className={`relative inline-flex h-11 w-11 items-center justify-center rounded-full border transition ${transparentHome ? "border-white/35 text-white hover:border-white hover:bg-white hover:text-[var(--red)]" : "border-[var(--mid-grey)] text-[var(--charcoal)] hover:border-[var(--red)] hover:bg-white hover:text-[var(--red)]"}`}
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 ? (
              <span className="absolute -right-1 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-[var(--red)] px-1.5 font-barlow text-xs font-bold leading-none text-white shadow-[0_8px_18px_rgba(192,21,31,0.35)] ring-2 ring-white">
                {count}
              </span>
            ) : null}
          </Link>
          <Link
            href="/order"
            className="hidden items-center gap-2 rounded-full bg-[var(--red)] px-5 py-3 font-barlow text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:bg-[var(--red-dark)] sm:inline-flex"
          >
            Order now <ArrowUpRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition lg:hidden ${transparentHome ? "border-white/35 bg-white/10 text-white hover:border-white" : "border-[var(--mid-grey)] bg-white/80 text-[var(--charcoal)] hover:border-[var(--red)] hover:text-[var(--red)]"}`}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      <div
        id="mobile-navigation"
        className={`${menuOpen ? "grid" : "hidden"} absolute left-3 right-3 top-[calc(100%+0.5rem)] gap-1 overflow-hidden rounded-2xl border border-red-100 bg-[var(--off-white)] p-2 shadow-[0_18px_44px_rgba(86,31,31,0.12)] lg:hidden`}
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
        <Link
          href="/order"
          onClick={() => setMenuOpen(false)}
          className="mt-1 rounded-xl bg-[var(--red)] px-5 py-4 text-center font-barlow text-sm font-semibold uppercase tracking-[0.12em] text-white"
        >
          Start an order
        </Link>
      </div>
    </header>
  );
}
