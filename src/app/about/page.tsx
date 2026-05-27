// PAGE DISABLED - uncomment component export below to re-enable
// import { notFound } from 'next/navigation'
import { notFound } from "next/navigation";

export default function AboutPage() {
  notFound();
}

// ORIGINAL PAGE BELOW - kept for future use
/*
import Image from "next/image";

const galleryImages = [
  {
    src: "/daily-crips-images/jollof-rice-1.jpg",
    alt: "Jollof rice plated for service",
  },
  {
    src: "/daily-crips-images/peppered-chicken-1.jpg",
    alt: "Peppered chicken close up",
    position: "center 44%",
  },
  {
    src: "/daily-crips-images/fried-beef-1.jpg",
    alt: "Fried beef pieces",
  },
  {
    src: "/daily-crips-images/salad-1.jpg",
    alt: "Fresh salad bowl",
    position: "center 42%",
  },
  {
    src: "/daily-crips-images/scrambled-egg.jpg",
    alt: "Scrambled egg side dish",
    position: "center 44%",
  },
  {
    src: "/daily-crips-images/okro-soup.jpg",
    alt: "Okro soup bowl",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-[var(--off-white)] px-6 py-16 text-center">
        <p className="font-barlow text-xs font-semibold uppercase tracking-[0.2em] text-[var(--red)]">Daily Crisps</p>
        <h1 className="mt-3 font-playfair text-5xl font-bold text-[var(--charcoal)]">Our Story</h1>
      </section>
      <section className="bg-white px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-playfair text-4xl font-bold text-[var(--charcoal)]">A Calabar kitchen built around honest crunch.</h2>
            <div className="mt-6 space-y-5 font-barlow text-lg font-light leading-8 text-[var(--text-muted)]">
              <p>Daily Crisps began on Inyang Street with one simple obsession: serve chicken that arrives hot, clean, and audibly crisp without losing the warmth of local spice.</p>
              <p>Our menu stays focused on familiar comfort: jollof, fried rice, soups, proteins, and continental plates made for everyday lunch runs, family pickups, and late evening cravings.</p>
              <p>Every batch is prepared with careful seasoning, fresh sourcing, and a kitchen rhythm that respects both speed and taste.</p>
            </div>
          </div>
          <div className="relative min-h-[420px] overflow-hidden rounded-2xl bg-[var(--light-grey)]">
            <Image
              src="/daily-crips-images/Fried%20Rice,%20Chicken%20with%20Salad_.jpg"
              alt="Daily Crisps rice, chicken, and salad plate"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </div>
      </section>
      <section className="bg-[var(--off-white)] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex gap-5 overflow-x-auto pb-3">
            {galleryImages.map((image) => (
              <div key={image.src} className="relative h-56 min-w-[300px] overflow-hidden rounded-xl bg-[var(--light-grey)]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="300px"
                  className="object-cover"
                  style={{ objectPosition: image.position }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
*/
