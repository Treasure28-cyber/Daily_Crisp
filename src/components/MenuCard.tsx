import Image from "next/image";
import type { MenuItem } from "@/data/menu";
import { formatPrice } from "@/data/menu";
import { LinkButton } from "./Button";

export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/80 bg-white/55 p-2 shadow-[0_18px_45px_rgba(26,26,26,0.08)] ring-1 ring-white/70 backdrop-blur-2xl transition hover:-translate-y-1 hover:bg-white/70 hover:shadow-[0_22px_55px_rgba(26,26,26,0.12)]">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-[var(--light-grey)]">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
          style={{ objectPosition: item.imagePosition }}
        />
        {item.badge ? (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 font-barlow text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[var(--red)] shadow">
            {item.badge}
          </span>
        ) : null}
      </div>
      <div className="relative px-4 pb-4 pt-5 text-center">
        <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-white/90" />
        <h3 className="font-playfair text-2xl font-bold leading-tight text-[var(--charcoal)]">{item.name}</h3>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 font-barlow text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-[var(--red)]">
          <span>{item.emoji}</span>
          <span>{item.category}</span>
        </div>
        <p className="mt-3 font-barlow text-xl font-bold text-[var(--red)]">{formatPrice(item.price)}</p>
        <div className="mt-4">
          <LinkButton href="/order" className="px-5 py-2.5">
            Order Now
          </LinkButton>
        </div>
      </div>
    </article>
  );
}
