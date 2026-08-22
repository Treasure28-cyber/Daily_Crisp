import Image from "next/image";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative isolate flex min-h-[320px] items-center overflow-hidden bg-[var(--charcoal)] px-6 py-16 text-white sm:min-h-[380px] sm:py-20">
      <Image
        src="/daily-crisps-interior-hero-v2.png"
        alt="Daily Crisps restaurant interior with branded signage"
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/65 to-black/25" />
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-2xl">
          <p className="font-barlow text-xs font-semibold uppercase tracking-[0.22em] text-red-300">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-playfair text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-xl font-barlow text-sm font-light leading-6 text-white/85 sm:text-base sm:leading-7">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
