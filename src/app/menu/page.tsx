"use client";

import { useMemo, useState } from "react";
import { MenuCard } from "@/components/MenuCard";
import { PageHero } from "@/components/PageHero";
import { categories, menuItems, type MenuCategory } from "@/data/menu";

export default function MenuPage() {
  const [active, setActive] = useState<MenuCategory>("All");
  const filtered = useMemo(
    () => active === "All" ? menuItems : menuItems.filter((item) => item.category === active),
    [active],
  );

  return (
    <>
      <PageHero
        eyebrow="Ultimate Menu"
        title="Our Full Menu"
        description="Browse the real Daily Crisps kitchen list, from rice plates and proteins to soups with proper Calabar soul."
      />
      <section className="bg-[var(--off-white)] px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Menu categories" className="sticky top-[72px] z-30 mb-8 -mx-6 border-y border-red-100 bg-white/96 px-6 shadow-[0_8px_22px_rgba(86,31,31,0.05)] backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl gap-7 overflow-x-auto py-1 sm:justify-center">
              {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActive(category)}
                aria-pressed={active === category}
                className={`relative shrink-0 border-0 bg-transparent px-0 py-4 font-barlow text-sm font-semibold transition ${
                  active === category
                    ? "text-[var(--red)] after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:rounded-full after:bg-[var(--red)]"
                    : "text-[var(--charcoal)] hover:text-[var(--red)]"
                }`}
              >
                {category}
              </button>
              ))}
            </div>
          </nav>
          <div className="mb-6 flex items-center justify-between gap-4 font-barlow text-sm text-[var(--text-muted)]">
            <p><strong className="text-[var(--charcoal)]">{filtered.length}</strong> items</p>
            <p>Tap any item to add it to your order</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
