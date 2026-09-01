import Image from "next/image";
import type { MenuItem } from "@/data/menu";
import { formatPrice } from "@/data/menu";
import { OrderButton } from "./OrderButton";

export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[var(--mid-grey)] bg-white transition hover:border-red-200 hover:shadow-[0_14px_34px_rgba(112,41,41,0.08)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--light-grey)]">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
          style={{ objectPosition: item.imagePosition }}
        />
        {item.badge ? (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 font-barlow text-xs font-semibold uppercase tracking-[0.12em] text-[var(--red)] shadow">
            {item.badge}
          </span>
        ) : null}
        {item.available === false ? <span className="absolute inset-0 flex items-center justify-center bg-white/80 font-barlow text-sm font-bold uppercase tracking-[0.14em] text-[var(--red)]">Sold out today</span> : null}
      </div>
      <div className="px-5 pb-5 pt-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-playfair text-xl font-bold leading-tight text-[var(--charcoal)]">{item.name}</h3>
          <p className="shrink-0 font-barlow text-lg font-bold text-[var(--red)]">{formatPrice(item.price)}</p>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 font-barlow text-xs font-semibold uppercase tracking-[0.13em] text-[var(--text-muted)]">
          <span>{item.emoji}</span>
          <span>{item.category}</span>
        </div>
        <div className="mt-4 flex justify-end">
          <OrderButton item={item} className="min-w-40 px-6 py-2.5">
            Add to order
          </OrderButton>
        </div>
      </div>
    </article>
  );
}
