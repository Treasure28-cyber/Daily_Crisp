"use client";

import { useMemo, useState } from "react";
import { MenuCard } from "@/components/MenuCard";
import { categories, menuItems, type MenuCategory } from "@/data/menu";

export default function MenuPage() {
  const [active, setActive] = useState<MenuCategory>("All");
  const filtered = useMemo(() => (active === "All" ? menuItems : menuItems.filter((item) => item.category === active)), [active]);

  return (
    <>
      <section className="bg-[var(--off-white)] px-6 py-16 text-center">
        <p className="font-barlow text-xs font-semibold uppercase tracking-[0.2em] text-[var(--red)]">Ultimate Menu</p>
        <h1 className="mt-3 font-playfair text-5xl font-bold text-[var(--charcoal)]">Our Full Menu</h1>
        <p className="mx-auto mt-4 max-w-2xl font-barlow text-lg font-light leading-8 text-[var(--text-muted)]">
          Browse the real Daily Crisps kitchen list, from rice plates and proteins to soups with proper Calabar soul.
        </p>
      </section>
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActive(category)}
                className={`rounded-full border px-5 py-3 font-barlow text-xs font-semibold uppercase tracking-[0.15em] transition ${
                  active === category
                    ? "border-[var(--red)] bg-[var(--red)] text-white"
                    : "border-[var(--red)] bg-white text-[var(--red)] hover:bg-red-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
