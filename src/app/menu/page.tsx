"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { MenuCard } from "@/components/MenuCard";
import { SectionReveal } from "@/components/SectionReveal";
import { categories, menuItems, type MenuCategory } from "@/data/menu";

const categoryIntroductions: Record<MenuCategory, string> = {
  All: "The full kitchen line-up—from everyday rice favourites to rich soups and satisfying proteins.",
  "Main Course": "Rice and pasta favourites ready to become the centre of your next plate.",
  Continental: "Comforting sides, sauces and hearty choices for a meal built your way.",
  Protein: "Chicken, beef, fish and eggs prepared to make the plate feel complete.",
  Soups: "Afang, egusi and okro with the depth, warmth and familiarity of home.",
};

export default function MenuPage() {
  const [active, setActive] = useState<MenuCategory>("All");
  const filtered = useMemo(
    () => active === "All" ? menuItems : menuItems.filter((item) => item.category === active),
    [active],
  );

  return (
    <>
      <section className="bg-[var(--cream)] px-5 pb-10 sm:px-8 sm:pb-14" aria-labelledby="menu-title">
        <div className="mx-auto grid max-w-[86rem] overflow-hidden rounded-[2.25rem] bg-[#21100a] text-white lg:grid-cols-[.9fr_1.1fr]">
          <div className="flex flex-col justify-center px-7 py-14 sm:px-12 sm:py-20 lg:px-16">
            <p className="eyebrow text-[#ffd39a]">The Daily Crisps menu</p>
            <h1 id="menu-title" className="mt-5 font-playfair text-5xl font-semibold leading-[.96] tracking-[-.045em] sm:text-7xl">
              Find something<br /><span className="text-[#ff6254]">worth craving.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-white/68">
              Build your plate from smoky rice, rich Calabar soups and properly prepared proteins. Pick what sounds good and send the order straight to our kitchen.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/14 pt-5 text-sm text-white/58">
              <span>{menuItems.length} menu choices</span>
              <span>Made to order</span>
              <span>WhatsApp checkout</span>
            </div>
          </div>
          <div className="relative min-h-[420px] sm:min-h-[540px] lg:min-h-[650px]">
            <Image
              src="/daily-crisps-hero.png"
              alt="A generous Daily Crisps chicken, rice and plantain meal"
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover object-[64%_top]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(33,16,10,.36),transparent_45%)]" />
          </div>
        </div>
      </section>

      <section className="bg-[var(--off-white)] px-5 pb-24 sm:px-8 sm:pb-28" aria-labelledby="menu-list-title">
        <div className="mx-auto max-w-[86rem]">
          <nav aria-label="Menu categories" className="sticky top-[70px] z-30 -mx-5 border-y border-[#eaded5] bg-[rgba(255,251,246,.96)] px-5 shadow-[0_8px_24px_rgba(62,27,17,.05)] backdrop-blur-xl sm:-mx-8 sm:px-8">
            <div className="mx-auto flex max-w-[86rem] gap-2 overflow-x-auto py-3 [scrollbar-width:none] lg:justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActive(category)}
                  aria-pressed={active === category}
                  className={`shrink-0 rounded-lg border px-5 py-2.5 font-barlow text-sm font-semibold transition duration-200 ${
                    active === category
                      ? "border-[var(--red)] bg-[var(--red)] text-white shadow-[0_6px_16px_rgba(170,17,23,.16)]"
                      : "border-[#dfcec3] bg-white text-[var(--charcoal)] hover:border-[var(--red)] hover:bg-[var(--red-soft)] hover:text-[var(--red-dark)]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </nav>

          <SectionReveal className="pt-14">
            <div className="mb-9 flex flex-col gap-5 border-b border-[#eaded5] pb-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="eyebrow text-[var(--red)]">{active === "All" ? "From our kitchen" : active}</p>
                <h2 id="menu-list-title" className="mt-3 font-playfair text-4xl font-semibold tracking-[-.035em] text-[var(--charcoal)] sm:text-5xl">
                  {active === "All" ? "Build the meal you want." : `Explore ${active.toLowerCase()}.`}
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--text-muted)]">{categoryIntroductions[active]}</p>
              </div>
              <p className="font-barlow text-sm text-[var(--text-muted)]"><strong className="text-[var(--charcoal)]">{filtered.length}</strong> choices available</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((item) => <MenuCard key={item.id} item={item} />)}
            </div>
          </SectionReveal>

          <section className="mt-20 flex flex-col gap-7 rounded-[2rem] bg-[var(--red)] px-7 py-10 text-white sm:px-10 md:flex-row md:items-center md:justify-between" aria-label="Continue to checkout">
            <div>
              <p className="eyebrow text-white/65">Ready when you are</p>
              <h2 className="mt-3 font-playfair text-3xl font-semibold sm:text-4xl">Your favourites are waiting in the basket.</h2>
            </div>
            <Link href="/order" className="brand-button brand-button--inverted inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-7 py-4 font-barlow text-xs font-semibold uppercase tracking-[.15em] transition">
              <ShoppingBag className="h-4 w-4" /> Review your order <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </div>
      </section>
    </>
  );
}
