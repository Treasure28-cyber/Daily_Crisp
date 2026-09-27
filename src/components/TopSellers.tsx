import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { menuItems, formatPrice } from "@/data/menu";
import { OrderButton } from "./OrderButton";
import { SectionReveal } from "./SectionReveal";

const descriptions: Record<string, string> = {
  "Peppered Chicken": "Local chicken finished in a fragrant pepper glaze with a deep, satisfying kick.",
  "Jollof Rice": "Smoky party-style rice with tomatoes, peppers and the flavour that brings everyone closer.",
  "Afang Soup": "A rich Calabar favourite with leafy body, slow-built flavour and comforting warmth.",
};

export function TopSellers() {
  const items = ["Peppered Chicken", "Jollof Rice", "Afang Soup"].map(
    (name) => menuItems.find((item) => item.name === name)!,
  );
  const [featured, ...supporting] = items;

  return (
    <section className="bg-[var(--off-white)] px-5 py-20 sm:px-8 sm:py-28" aria-labelledby="bestsellers-title">
      <SectionReveal className="mx-auto max-w-[86rem]">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow text-[var(--red)]">Most requested</p>
            <h2 id="bestsellers-title" className="mt-4 font-playfair text-4xl font-semibold leading-[1.02] tracking-[-.035em] text-[var(--charcoal)] sm:text-6xl">
              The plates Calabar<br className="hidden sm:block" /> keeps coming back for.
            </h2>
          </div>
          <Link href="/menu" className="group inline-flex items-center gap-2 font-barlow text-sm font-semibold uppercase tracking-[0.14em] text-[var(--red)]">
            Explore the full menu <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.45fr_.85fr]">
          <article className="group relative min-h-[540px] overflow-hidden rounded-[2rem] bg-[var(--charcoal)] text-white sm:min-h-[650px]">
            <Image
              src={featured.image}
              alt={featured.imageAlt}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover transition duration-700 group-hover:scale-[1.025]"
              style={{ objectPosition: featured.imagePosition }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(25,8,4,.88)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <p className="eyebrow text-[#ffd39a]">Daily Crisps signature</p>
              <div className="mt-3 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-xl">
                  <h3 className="font-playfair text-4xl font-semibold sm:text-5xl">{featured.name}</h3>
                  <p className="mt-3 max-w-lg text-base leading-7 text-white/78">{descriptions[featured.name]}</p>
                </div>
                <div className="shrink-0 sm:text-right">
                  <p className="font-playfair text-3xl font-semibold text-[#ffd39a]">{formatPrice(featured.price)}</p>
                  <OrderButton item={featured} className="mt-4 w-full border-white/20 px-6 py-3 sm:w-auto">
                    Add to order
                  </OrderButton>
                </div>
              </div>
            </div>
          </article>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {supporting.map((item) => (
              <article key={item.id} className="group grid overflow-hidden rounded-[1.75rem] border border-[#ead9ce] bg-white sm:grid-rows-[1fr_auto] lg:grid-cols-[.9fr_1.1fr] lg:grid-rows-1">
                <div className="relative min-h-64 overflow-hidden bg-[var(--light-grey)] sm:min-h-72 lg:min-h-0">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 17vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                    style={{ objectPosition: item.imagePosition }}
                  />
                </div>
                <div className="flex flex-col justify-center p-6 lg:p-7">
                  <p className="eyebrow text-[var(--pepper)]">{item.category}</p>
                  <h3 className="mt-2 font-playfair text-3xl font-semibold text-[var(--charcoal)]">{item.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{descriptions[item.name]}</p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <p className="font-playfair text-2xl font-semibold text-[var(--red)]">{formatPrice(item.price)}</p>
                    <OrderButton item={item} className="px-4 py-2.5">Add</OrderButton>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
