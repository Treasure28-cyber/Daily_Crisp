import Image from "next/image";
import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";
import { TopSellers } from "@/components/TopSellers";
import { RoyalExperienceCarousel } from "@/components/RoyalExperienceCarousel";
import { LinkButton } from "@/components/Button";
import { RestaurantFaq } from "@/components/RestaurantFaq";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const testimonials = [
  {
    name: "Ekanem Bassey",
    role: "Calabar Local Guide",
    quote:
      "The Daily Signature Crispy Chicken is hands-down the crunchiest in Cross River! Double battered, perfectly spicy, and always piping hot. 10/10 recommend!",
  },
  {
    name: "Obinna Okafor",
    role: "Unical Student",
    quote:
      "Best chicken burger in town! The Calabar Heatwave Burger is real fire. I love how consistent and clean their physical space is on Inyang Street.",
  },
  {
    name: "Victoria Effiong",
    role: "Food Blogger",
    quote:
      "Love the Hibiscus Ginger Zobo Twist! It paired perfectly with the Royal Platter. The taste is incredibly fresh and premium, not sugary artificial stuff.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-white px-6 pb-10 pt-24 text-white sm:pb-12 sm:pt-28 lg:py-16">
        <Image
          src="/daily-crisps-interior-hero-v2.png"
          alt=""
          fill
          preload
          sizes="100vw"
          className="-z-30 object-cover object-center"
        />
        <div className="absolute inset-0 -z-20 bg-gradient-to-r from-black/65 via-black/42 to-black/30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/35 via-transparent to-black/15" />
        <div className="mx-auto grid min-h-[calc(100svh-72px)] w-full max-w-7xl items-center">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-white/25 bg-black/15 px-3.5 py-1.5 font-barlow text-xs font-semibold uppercase tracking-[0.16em] text-red-200 shadow-sm backdrop-blur-md">
              &#10022; Calabar&apos;s Crispy Chicken
            </span>
            <h1 className="mt-4 max-w-2xl font-playfair text-[2.55rem] font-black leading-[1.02] text-white sm:text-5xl md:text-6xl">
              Golden Crunch.
              <br />
              <span className="text-red-300">Calabar Spice.</span>
            </h1>
            <p className="mt-4 max-w-[500px] font-barlow text-sm font-light leading-6 text-white/85 sm:text-base sm:leading-7">
              Crispy chicken, bold rice and local favourites—served hot from
              our Inyang Street kitchen.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/menu" pulse className="w-full px-7 py-3.5 text-xs sm:w-auto">
                Explore Our Menu
              </LinkButton>
              <LinkButton href="/order" variant="outline" className="w-full border-2 px-7 py-3.5 text-xs sm:w-auto">
                Order Now
              </LinkButton>
            </div>
            <div className="mt-6 hidden max-w-2xl gap-4 border-t border-white/20 pt-4 font-barlow text-xs text-white/80 sm:grid sm:grid-cols-3">
              <strong className="text-white">
                100% Fresh Local Birds
              </strong>
              <strong className="text-white">
                15+ Signature Spices
              </strong>
              <strong className="text-white">Order Directly on WhatsApp</strong>
            </div>
          </div>
          {/* Food cutout intentionally disabled so the branded restaurant interior remains the sole hero image.
          <div className="relative mx-auto flex aspect-square w-full max-w-[460px] items-center justify-center sm:max-w-[560px] lg:max-w-[640px] lg:justify-end">
            <div className="absolute inset-[12%] rounded-full bg-red-500/20 blur-3xl" />
            <Image
              src="/hero-bg-removebg.png"
              alt="Daily Crisps jollof rice with grilled chicken, plantain, and salad"
              width={900}
              height={900}
              preload
              sizes="(max-width: 640px) 88vw, (max-width: 1024px) 58vw, 48vw"
              className="relative z-10 h-auto w-full object-contain drop-shadow-[0_30px_55px_rgba(0,0,0,0.5)]"
            />
          </div>
          */}
        </div>
      </section>

      <TopSellers />

      <section className="border-y border-red-100 bg-[var(--off-white)] px-6 py-20 text-[var(--charcoal)]">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Crispy Love"
            title="What Calabar Folk are Saying"
            body="Read true reviews from real local families, foodies, and university students who visit our Inyang Street store."
          />
          <div className="mt-12 flex w-full flex-col items-center justify-center gap-0 md:flex-row">
            {testimonials.map((item, index) => (
              <div key={item.name} className="contents">
                {index > 0 && (
                  <>
                    <div
                      className="mx-auto my-8 block md:hidden"
                      style={{
                        width: "60px",
                        height: "1.5px",
                        background: "#D71920",
                        opacity: 0.65,
                      }}
                    />
                    <div
                      className="hidden md:block"
                      style={{
                        width: "1.5px",
                        height: "100px",
                        background: "#D71920",
                        opacity: 0.65,
                        flexShrink: 0,
                      }}
                    />
                  </>
                )}
                <article className="flex flex-1 flex-col items-center px-6 text-center sm:px-10">
                  <span className="font-playfair text-5xl text-amber-300">
                    &ldquo;
                  </span>
                  <p className="mt-2 font-barlow text-sm text-amber-500">
                    &#9733;&#9733;&#9733;&#9733;&#9733;
                  </p>
                  <p className="mt-5 max-w-[330px] font-barlow text-sm font-light leading-7 text-[var(--text-muted)]">
                    {item.quote}
                  </p>
                  <div className="mt-6">
                    <h3 className="font-playfair text-xl font-bold text-[var(--charcoal)]">
                      {item.name}
                    </h3>
                    <p className="font-barlow text-xs font-semibold uppercase tracking-[0.18em] text-red-400">
                      {item.role}
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-white px-6 py-16 sm:px-10 md:px-16">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 md:flex-row md:items-start">
          <div className="relative grid w-full flex-1">
            <RoyalExperienceCarousel />
          </div>

          <div className="flex-1 text-[var(--charcoal)]">
            <p className="mb-4 text-center text-xs font-medium uppercase tracking-[0.3em] text-[#C0151F] sm:text-left">
              Royal Experience
            </p>
            <h2 className="mb-6 font-playfair text-3xl font-black leading-tight md:text-4xl lg:text-5xl">
              Savor the Royal
              <br />
              <span style={{ color: "#C0151F" }}>Calabar Platter</span>
              <br />
              Tonight
            </h2>
            <p className="mb-8 max-w-xl text-center font-barlow text-base font-light leading-relaxed text-[var(--text-muted)] sm:text-left">
              Get 4 crispy chicken tenders, 4 Calabar hot wings, cheesy fries,
              coleslaw, and 2 chilled locally hand-crafted ginger/zobo beverages
              for just &#8358;12,500. Feeds up to 3 people.
            </p>
            <div className="flex justify-center sm:justify-start">
              <LinkButton href="/contact" className="px-8 py-4 text-sm">
                Contact our Chefs
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      <RestaurantFaq />
    </>
  );
}
