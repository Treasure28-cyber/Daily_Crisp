import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { TopSellers } from "@/components/TopSellers";
import { RoyalExperienceCarousel } from "@/components/RoyalExperienceCarousel";

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
      <section className="relative isolate overflow-hidden bg-white px-6 pb-16 pt-32 sm:pt-36 lg:py-28">
        <div className="absolute inset-y-0 right-0 -z-10 hidden w-[58%] bg-gradient-to-l from-red-50 via-white to-transparent lg:block" />
        <div className="mx-auto grid min-h-[calc(100vh-88px)] w-full max-w-7xl items-center gap-12 lg:grid-cols-[0.86fr_1fr]">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-red-100 bg-red-50 px-4 py-2 font-barlow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--red)] shadow-sm">
              &#10022; Calabar&apos;s #1 Crispy Chicken Spot
            </span>
            <h1 className="mt-6 max-w-3xl font-playfair text-5xl font-black leading-[1.02] text-[var(--charcoal)] md:text-7xl">
              Golden Crunch.
              <br />
              <span className="text-[var(--red)]">Pure Local Spice.</span>
              <br />
              Crafted with Pride.
            </h1>
            <p className="mt-6 max-w-[520px] font-barlow text-lg font-light leading-8 text-[var(--text-muted)]">
              Daily Crisps serves Calabar&apos;s favorite golden chicken, bold
              rice plates, and local soups from our Inyang Street kitchen,
              always hot, clean, and deeply seasoned.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/menu">
                <button
                  className="rounded-full bg-[#C0151F] px-8 py-4 font-barlow text-sm font-semibold uppercase tracking-widest text-white transition-all hover:-translate-y-0.5 hover:bg-[#E8202C]"
                  style={{ animation: "pulseRed 2.5s infinite" }}
                >
                  Explore Our Menu
                </button>
              </Link>
              <Link href="/order">
                <button className="rounded-full border-2 border-[#C0151F] bg-transparent px-8 py-4 font-barlow text-sm font-semibold uppercase tracking-widest text-[#C0151F] transition-all hover:-translate-y-0.5 hover:bg-[#C0151F] hover:text-white">
                  Order Now
                </button>
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl gap-4 border-t border-[var(--mid-grey)] pt-6 font-barlow text-sm text-[var(--text-muted)] sm:grid-cols-3">
              <strong className="text-[var(--charcoal)]">
                100% Fresh Local Birds
              </strong>
              <strong className="text-[var(--charcoal)]">
                15+ Signature Spices
              </strong>
              <strong className="text-[var(--charcoal)]">
                4.9&#9733; Over 2,500 Reviews
              </strong>
            </div>
          </div>
          <div className="relative mx-auto flex aspect-square w-full max-w-[520px] items-center justify-center sm:max-w-[600px] lg:max-w-[680px] lg:justify-end">
            <div className="absolute inset-[8%] rounded-full bg-red-50 blur-3xl" />
            <Image
              src="/hero-bg-removebg.png"
              alt="Daily Crisps jollof rice with grilled chicken, plantain, and salad"
              width={900}
              height={900}
              preload
              sizes="(max-width: 640px) 88vw, (max-width: 1024px) 58vw, 48vw"
              className="relative z-10 h-auto w-full object-contain drop-shadow-[0_30px_55px_rgba(26,26,26,0.22)]"
            />
          </div>
        </div>
      </section>

      <TopSellers />

      <section className="bg-[var(--off-white)] px-6 py-20">
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
                        background: "#C0151F",
                        opacity: 0.4,
                      }}
                    />
                    <div
                      className="hidden md:block"
                      style={{
                        width: "1.5px",
                        height: "100px",
                        background: "#C0151F",
                        opacity: 0.4,
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
                  <p className="mt-5 max-w-[280px] font-barlow text-sm font-light leading-7 text-[var(--text-muted)]">
                    {item.quote}
                  </p>
                  <div className="mt-6">
                    <h3 className="font-playfair text-xl font-bold text-[var(--charcoal)]">
                      {item.name}
                    </h3>
                    <p className="font-barlow text-xs font-semibold uppercase tracking-[0.18em] text-[var(--red)]">
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
              <Link href="/contact">
                <button className="rounded-full bg-[#C0151F] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-all hover:-translate-y-0.5 hover:bg-[#E8202C]">
                  Contact our Chefs
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
