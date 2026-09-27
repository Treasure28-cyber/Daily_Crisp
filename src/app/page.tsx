import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Check,
  Clock3,
  MapPin,
  MessageCircle,
  ShoppingBag,
  UtensilsCrossed,
} from "lucide-react";
import { LinkButton } from "@/components/Button";
import { RoyalExperienceCarousel } from "@/components/RoyalExperienceCarousel";
import { SectionReveal } from "@/components/SectionReveal";
import { TopSellers } from "@/components/TopSellers";
import { business } from "@/data/business";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const cravings = [
  { number: "01", name: "Rice favourites", note: "Smoky, colourful and ready for your choice of protein." },
  { number: "02", name: "Local soups", note: "Afang, egusi and okro with the comfort of home." },
  { number: "03", name: "Proteins", note: "Chicken, beef and fish prepared to complete the plate." },
  { number: "04", name: "Complete plates", note: "The full, satisfying meal when one side is not enough." },
];

const cravingBorders = [
  "",
  "border-t border-[#decfc4] sm:border-l sm:border-t-0",
  "border-t border-[#decfc4] lg:border-l lg:border-t-0",
  "border-t border-[#decfc4] sm:border-l lg:border-t-0",
];

const orderingSteps = [
  { icon: UtensilsCrossed, number: "01", title: "Choose your favourites", text: "Browse the menu and build the meal your appetite is asking for." },
  { icon: ShoppingBag, number: "02", title: "Review your order", text: "Adjust quantities and check your basket before sending it through." },
  { icon: MessageCircle, number: "03", title: "Send it to the kitchen", text: "Your prepared order opens in WhatsApp for confirmation with our team." },
];

export default function Home() {
  return (
    <>
      <section className="relative isolate min-h-[720px] overflow-hidden bg-[#170804] text-white sm:min-h-[790px]" aria-labelledby="home-hero-title">
        <Image
          src="/daily-crisps-hero.png"
          alt="Daily Crisps grilled chicken with rice and plantain"
          fill
          priority
          sizes="100vw"
          className="-z-30 object-cover object-[67%_center] sm:object-[61%_center]"
        />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(20,6,2,.94)_0%,rgba(28,8,2,.8)_37%,rgba(24,7,2,.18)_74%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,2,0,.2),transparent_55%,rgba(8,2,0,.3))]" />

        <div className="mx-auto flex min-h-[720px] max-w-[86rem] items-center px-5 pb-16 pt-32 sm:min-h-[790px] sm:px-8 sm:pt-36">
          <div className="max-w-[680px] animate-fade-in">
            <p className="eyebrow flex items-center gap-3 text-[#ffd39a]"><span className="h-px w-10 bg-[#ffd39a]" /> Freshly prepared in Calabar</p>
            <h1 id="home-hero-title" className="mt-6 font-playfair text-[3.5rem] font-semibold leading-[1.02] tracking-[-.045em] sm:text-[5.5rem] sm:leading-[.98] lg:text-[6.6rem]">
              Daily Crisps.<br />
              <span className="text-[#ff5b4d]">Come hungry.</span><br />
              Leave satisfied.
            </h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-white/78 sm:text-lg sm:leading-8">
              Bold rice dishes, rich local soups and satisfying proteins—made fresh on Inyang Street and served the way hunger demands.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/menu" className="px-7 py-4">Explore the menu <ArrowRight className="h-4 w-4" /></LinkButton>
              <LinkButton href="/order" variant="light-outline" className="px-7 py-4">Start an order</LinkButton>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/18 pt-5 text-sm text-white/62">
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#ffd39a]" /> Made to order</span>
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#ffd39a]" /> Local favourites</span>
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#ffd39a]" /> Easy WhatsApp checkout</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#eaded5] bg-[var(--cream)] px-5 py-16 sm:px-8 sm:py-20" aria-labelledby="cravings-title">
        <SectionReveal className="mx-auto max-w-[86rem]">
          <div className="grid gap-8 lg:grid-cols-[.8fr_2.2fr] lg:gap-16">
            <div>
              <p className="eyebrow text-[var(--red)]">Find your plate</p>
              <h2 id="cravings-title" className="mt-3 font-playfair text-4xl font-semibold leading-tight tracking-[-.035em] text-[var(--charcoal)] sm:text-5xl">What are you craving?</h2>
            </div>
            <div className="grid border-y border-[#decfc4] sm:grid-cols-2 lg:grid-cols-4 lg:border-y-0">
              {cravings.map((item, index) => (
                <Link
                  key={item.name}
                  href="/menu"
                  className={`group relative px-1 py-7 sm:px-6 lg:py-3 ${cravingBorders[index]}`}
                >
                  <span className="font-barlow text-xs font-semibold tracking-[.18em] text-[var(--pepper)]">{item.number}</span>
                  <h3 className="mt-4 font-playfair text-2xl font-semibold text-[var(--charcoal)] transition group-hover:text-[var(--red)]">{item.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{item.note}</p>
                  <ArrowRight className="mt-5 h-4 w-4 text-[var(--red)] transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </SectionReveal>
      </section>

      <TopSellers />

      <section className="relative isolate overflow-hidden bg-[#23100a] px-5 py-20 text-white sm:px-8 sm:py-28" aria-labelledby="royal-title">
        <div className="absolute -right-32 top-12 -z-10 h-96 w-96 rounded-full bg-[var(--red)]/15 blur-3xl" aria-hidden="true" />
        <SectionReveal className="mx-auto grid max-w-[86rem] gap-12 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:gap-20">
          <div className="relative">
            <RoyalExperienceCarousel />
          </div>
          <div className="max-w-xl">
            <p className="eyebrow text-[#ffd39a]">The Royal Experience</p>
            <h2 id="royal-title" className="mt-5 font-playfair text-5xl font-semibold leading-[.98] tracking-[-.04em] sm:text-6xl">
              The Royal<br /><span className="text-[#ff5b4d]">Calabar Platter</span><br />for the whole table.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/68">
              Four crispy chicken tenders, four Calabar hot wings, cheesy fries, coleslaw and two chilled locally crafted ginger or zobo drinks. A generous feast for up to three people.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5 border-y border-white/12 py-5">
              <p className="font-playfair text-4xl font-semibold text-[#ffd39a]">&#8358;12,500</p>
              <p className="max-w-[150px] text-sm leading-5 text-white/55">Feeds up to three people</p>
            </div>
            <LinkButton href="/order" className="mt-8 px-7 py-4">Order your feast <ArrowRight className="h-4 w-4" /></LinkButton>
          </div>
        </SectionReveal>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 sm:py-28" aria-labelledby="calabar-way-title">
        <SectionReveal className="mx-auto grid max-w-[86rem] gap-12 lg:grid-cols-[.88fr_1.12fr] lg:items-center lg:gap-20">
          <div className="order-2 lg:order-1">
            <p className="eyebrow text-[var(--red)]">Made the Calabar way</p>
            <h2 id="calabar-way-title" className="mt-5 font-playfair text-5xl font-semibold leading-[1.02] tracking-[-.04em] text-[var(--charcoal)] sm:text-6xl">
              Familiar food.<br />Full flavour.<br /><span className="text-[var(--red)]">No small satisfaction.</span>
            </h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-[var(--text-muted)]">
              We build every plate around the food Calabar knows and loves: properly seasoned rice, comforting soups and proteins prepared to make the meal feel complete.
            </p>
            <div className="mt-8 grid gap-5 border-y border-[#eaded5] py-6 sm:grid-cols-2">
              <div><p className="font-playfair text-2xl font-semibold text-[var(--charcoal)]">Freshly prepared</p><p className="mt-1 text-sm text-[var(--text-muted)]">Made when you are ready to eat.</p></div>
              <div><p className="font-playfair text-2xl font-semibold text-[var(--charcoal)]">Generously served</p><p className="mt-1 text-sm text-[var(--text-muted)]">A meal that answers the appetite.</p></div>
            </div>
          </div>
          <div className="order-1 grid grid-cols-[1.15fr_.85fr] gap-4 lg:order-2">
            <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] sm:min-h-[650px]">
              <Image src="/daily-crips-images/Fried%20Rice,%20Chicken%20with%20Salad_.jpg" alt="Fried rice, chicken and salad prepared by Daily Crisps" fill sizes="(min-width:1024px) 37vw, 64vw" className="object-cover transition duration-700 hover:scale-[1.025]" />
            </div>
            <div className="relative mt-16 min-h-[420px] overflow-hidden rounded-[2rem] sm:min-h-[520px]">
              <Image src="/daily-crips-images/afang-soup.jpg" alt="Afang soup, a local Calabar favourite" fill sizes="(min-width:1024px) 27vw, 32vw" className="object-cover transition duration-700 hover:scale-[1.025]" />
            </div>
          </div>
        </SectionReveal>
      </section>

      <section className="bg-[var(--cream)] px-5 py-20 sm:px-8 sm:py-28" aria-labelledby="visit-title">
        <SectionReveal className="mx-auto grid max-w-[86rem] overflow-hidden rounded-[2.25rem] bg-[#211713] text-white lg:grid-cols-[1.2fr_.8fr]">
          <div className="relative min-h-[430px] lg:min-h-[620px]">
            <Image src="/daily-crisps-interior-hero-v2.png" alt="The Daily Crisps restaurant interior in Calabar" fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_55%,rgba(33,23,19,.35))]" />
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-14">
            <p className="eyebrow text-[#ffd39a]">Come in, settle down</p>
            <h2 id="visit-title" className="mt-5 font-playfair text-4xl font-semibold leading-tight sm:text-5xl">Your table in the heart of Calabar.</h2>
            <p className="mt-5 text-base leading-8 text-white/65">Visit our Inyang Street kitchen for freshly prepared favourites, or place your order online and let us get the satisfying part started.</p>
            <div className="mt-8 space-y-5 border-y border-white/12 py-6 text-sm text-white/72">
              <p className="flex gap-3"><MapPin className="mt-1 h-5 w-5 shrink-0 text-[#ffd39a]" /> {business.streetAddress}, {business.locality}, {business.region}</p>
              <p className="flex gap-3"><Clock3 className="mt-1 h-5 w-5 shrink-0 text-[#ffd39a]" /> Open daily. See contact page for today&apos;s kitchen hours.</p>
            </div>
            <LinkButton href="/contact" variant="light-outline" className="mt-8 w-full sm:w-fit">Plan your visit <ArrowRight className="h-4 w-4" /></LinkButton>
          </div>
        </SectionReveal>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 sm:py-28" aria-labelledby="ordering-title">
        <SectionReveal className="mx-auto max-w-[86rem]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-[var(--red)]">Simple from craving to kitchen</p>
            <h2 id="ordering-title" className="mt-4 font-playfair text-5xl font-semibold leading-tight tracking-[-.04em] text-[var(--charcoal)] sm:text-6xl">Your next meal, in three easy steps.</h2>
          </div>
          <ol className="mt-14 grid border-y border-[#eaded5] md:grid-cols-3 md:divide-x md:divide-[#eaded5]">
            {orderingSteps.map(({ icon: Icon, number, title, text }) => (
              <li key={number} className="relative border-b border-[#eaded5] px-4 py-8 last:border-b-0 md:border-b-0 md:px-9 md:py-10">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--red-soft)] text-[var(--red)]"><Icon className="h-5 w-5" /></span>
                  <span className="font-playfair text-4xl text-[#e5d6cc]">{number}</span>
                </div>
                <h3 className="mt-6 font-playfair text-2xl font-semibold text-[var(--charcoal)]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{text}</p>
              </li>
            ))}
          </ol>
        </SectionReveal>
      </section>

      <section className="relative isolate overflow-hidden bg-[var(--red)] px-5 py-20 text-white sm:px-8 sm:py-28" aria-labelledby="final-cta-title">
        <Image src="/daily-crisps-hero.png" alt="" fill sizes="100vw" className="-z-20 object-cover object-[70%_70%] opacity-25" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(160,12,18,.98),rgba(186,14,20,.82))]" />
        <SectionReveal className="mx-auto flex max-w-[86rem] flex-col gap-9 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <p className="eyebrow text-white/68">Good food is one decision away</p>
            <h2 id="final-cta-title" className="mt-5 font-playfair text-5xl font-semibold leading-[.98] tracking-[-.04em] sm:text-7xl">Bring the appetite.<br />We&apos;ll bring the satisfaction.</h2>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
            <LinkButton href="/order" variant="inverted" className="px-8 py-4">Order now <ArrowRight className="h-4 w-4" /></LinkButton>
            <LinkButton href="/menu" variant="light-outline" className="px-8 py-4">See the menu</LinkButton>
          </div>
        </SectionReveal>
      </section>
    </>
  );
}
