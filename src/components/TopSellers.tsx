import Image from "next/image";
import Link from "next/link";
import { menuItems } from "@/data/menu";
import { formatPrice } from "@/data/menu";
import { LinkButton } from "./Button";

const descriptions: Record<string, string> = {
  "Peppered Chicken": "Local chicken tossed in a fragrant pepper glaze with a deep, crackly finish.",
  "Jollof Rice": "Smoky party-style rice with tomatoes, peppers, and Daily Crisps spice depth.",
  "Afang Soup": "A rich Calabar classic with leafy body, slow-built flavor, and comforting heat.",
};

export function TopSellers() {
  const items = ["Peppered Chicken", "Jollof Rice", "Afang Soup"].map((name) => menuItems.find((item) => item.name === name)!);

  return (
    <section className="bg-white px-6 py-20">
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
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="group overflow-hidden rounded-2xl border border-white/80 bg-white/55 p-2 shadow-[0_18px_45px_rgba(26,26,26,0.08)] ring-1 ring-white/70 backdrop-blur-2xl transition hover:-translate-y-1 hover:bg-white/70 hover:shadow-[0_22px_55px_rgba(26,26,26,0.12)]">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-[var(--light-grey)]">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                  style={{ objectPosition: item.imagePosition }}
                />
                <span className="absolute left-3 top-3 rounded-full bg-[var(--red)] px-3 py-1 font-barlow text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white shadow">
                  Bestseller
                </span>
              </div>
              <div className="relative px-4 pb-4 pt-5 text-center">
                <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-white/90" />
                <p className="font-barlow text-sm text-amber-500">
                  &#9733;&#9733;&#9733;&#9733;&#9733; <span className="text-[var(--text-muted)]">4.9 &middot; 320 reviews</span>
                </p>
                <h3 className="mt-3 font-playfair text-2xl font-bold text-[var(--charcoal)]">{item.name}</h3>
                <p className="mt-3 font-barlow text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-[var(--red)]">{item.category}</p>
                <p className="mx-auto mt-2 line-clamp-2 max-w-[240px] font-barlow text-sm font-light leading-6 text-[var(--text-muted)]">{descriptions[item.name]}</p>
                <p className="mt-3 font-barlow text-xl font-bold text-[var(--red)]">{formatPrice(item.price)}</p>
                <div className="mt-4">
                  <LinkButton href="/order" className="px-5 py-2.5">
                    Quick Order
                  </LinkButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
