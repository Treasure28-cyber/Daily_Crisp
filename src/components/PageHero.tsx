import Image from "next/image";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="bg-white px-4 py-4 sm:px-6 sm:py-6">
      <div className="relative isolate mx-auto flex min-h-[270px] max-w-[1360px] items-center overflow-hidden rounded-[1.75rem] px-6 py-14 text-white sm:min-h-[320px] sm:px-10 sm:py-16 lg:px-16">
        <Image
          src="/daily-crisps-interior-hero-v2.png"
          alt="Daily Crisps restaurant interior with branded signage"
          fill
          preload
          sizes="(max-width: 1536px) 96vw, 1360px"
          className="-z-20 object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/65 via-black/42 to-black/30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/35 via-transparent to-black/15" />
        <div className="w-full max-w-7xl">
          <div className="max-w-2xl">
            <p className="font-barlow text-xs font-semibold uppercase tracking-[0.22em] text-red-200">{eyebrow}</p>
            <h1 className="mt-3 font-playfair text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">{title}</h1>
            {description ? <p className="mt-4 max-w-xl font-barlow text-sm font-light leading-6 text-white/85 sm:text-base sm:leading-7">{description}</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
