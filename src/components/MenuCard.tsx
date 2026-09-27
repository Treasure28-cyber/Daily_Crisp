import Image from "next/image";
import type { MenuItem } from "@/data/menu";
import { formatPrice } from "@/data/menu";
import { OrderButton } from "./OrderButton";

const categoryNotes: Record<MenuItem["category"], string> = {
  "Main Course": "A comforting base for the plate you are building.",
  Continental: "A hearty kitchen favourite prepared for your order.",
  Protein: "The satisfying finish that makes the meal complete.",
  Soups: "Rich, warming and made for a proper Nigerian meal.",
};

export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#eaded5] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#ddbcb0] hover:shadow-[0_22px_45px_rgba(70,31,19,.09)]">
      <div className="relative aspect-square overflow-hidden bg-[var(--light-grey)]">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 48vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
          style={{ objectPosition: item.imagePosition }}
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent" aria-hidden="true" />
        {item.badge ? (
          <span className="absolute left-4 top-4 rounded-full bg-[var(--cream)] px-3 py-1.5 font-barlow text-xs font-semibold uppercase tracking-[0.12em] text-[var(--red-dark)] shadow-sm">
            {item.badge}
          </span>
        ) : null}
        <span className="absolute bottom-4 left-4 font-barlow text-xs font-semibold uppercase tracking-[0.14em] text-white">
          {item.category}
        </span>
        {item.available === false ? (
          <span className="absolute inset-0 flex items-center justify-center bg-[#fff8ee]/90 font-barlow text-sm font-bold uppercase tracking-[0.14em] text-[var(--red)]">
            Sold out today
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-playfair text-2xl font-semibold leading-tight text-[var(--charcoal)]">{item.name}</h3>
          <p className="shrink-0 font-playfair text-2xl font-semibold text-[var(--red)]">{formatPrice(item.price)}</p>
        </div>
        <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
          {categoryNotes[item.category]}
        </p>
        <div className="mt-auto pt-5">
          <OrderButton item={item} className="w-full px-6 py-3">
            Add to order
          </OrderButton>
        </div>
      </div>
    </article>
  );
}
