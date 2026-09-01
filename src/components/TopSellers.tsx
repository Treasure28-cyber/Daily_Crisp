import Image from "next/image";
import Link from "next/link";
import { menuItems } from "@/data/menu";
import { formatPrice } from "@/data/menu";
import { OrderButton } from "./OrderButton";

const descriptions: Record<string, string> = {
  "Peppered Chicken": "Local chicken tossed in a fragrant pepper glaze with a deep, crackly finish.",
  "Jollof Rice": "Smoky party-style rice with tomatoes, peppers, and Daily Crisps spice depth.",
  "Afang Soup": "A rich Calabar classic with leafy body, slow-built flavor, and comforting heat.",
};

export function TopSellers() {
  const items = ["Peppered Chicken", "Jollof Rice", "Afang Soup"].map((name) => menuItems.find((item) => item.name === name)!);

  return (
    <section className="bg-white px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-barlow text-xs font-semibold uppercase tracking-[0.2em] text-[var(--red)]">Highly Requested</p>
            <h2 className="mt-3 font-playfair text-4xl font-bold text-[var(--charcoal)] md:text-5xl">Today&apos;s Top Crispy Sellers</h2>
          </div>
          <Link href="/menu" className="font-barlow text-sm font-semibold uppercase tracking-[0.15em] text-[var(--red)]">
            View All Menu Items &rarr;
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="group overflow-hidden rounded-2xl border border-[var(--mid-grey)] bg-white transition hover:border-red-200 hover:shadow-[0_14px_34px_rgba(112,41,41,0.08)]">
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--light-grey)]">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                  style={{ objectPosition: item.imagePosition }}
                />
                <span className="absolute left-3 top-3 rounded-full bg-[var(--red)] px-3 py-1 font-barlow text-xs font-semibold uppercase tracking-[0.12em] text-white shadow">
                  Bestseller
                </span>
              </div>
              <div className="px-5 pb-5 pt-4">
                <p className="font-barlow text-xs text-amber-500">
                  &#9733;&#9733;&#9733;&#9733;&#9733; <span className="text-[var(--text-muted)]">4.9 &middot; 320 reviews</span>
                </p>
                <div className="mt-3 flex items-start justify-between gap-3"><h3 className="font-playfair text-xl font-bold text-[var(--charcoal)]">{item.name}</h3><p className="shrink-0 font-barlow text-lg font-bold text-[var(--red)]">{formatPrice(item.price)}</p></div>
                <p className="mt-2 font-barlow text-sm font-light leading-6 text-[var(--text-muted)]">{descriptions[item.name]}</p>
                <div className="mt-4">
                  <OrderButton item={item} className="w-full px-5 py-2.5">
                    Add to order
                  </OrderButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
