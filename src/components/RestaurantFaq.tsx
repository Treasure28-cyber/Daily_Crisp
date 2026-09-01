import { business, businessHours } from "@/data/business";

const questions = [
  {
    question: "Where is Daily Crisps located?",
    answer: `${business.streetAddress}, ${business.locality}, ${business.region}, Nigeria.`,
  },
  {
    question: "What time is Daily Crisps open?",
    answer: businessHours.map((hours) => `${hours.label}: ${hours.display}`).join("; "),
  },
  {
    question: "How do I order from Daily Crisps?",
    answer: "Choose items from the menu, review your basket and send the prepared order directly to our kitchen on WhatsApp.",
  },
  {
    question: "What food is on the menu?",
    answer: "The menu includes Nigerian rice dishes, chicken, beef, fish, continental sides and local soups such as Afang, Egusi and Okro.",
  },
  {
    question: "Is delivery included in the displayed total?",
    answer: "No. The kitchen confirms the delivery fee after receiving your WhatsApp order.",
  },
];

export function RestaurantFaq() {
  return (
    <section className="border-y border-red-100 bg-[var(--off-white)] px-6 py-16 text-[var(--charcoal)] sm:py-20" aria-labelledby="faq-title">
      <div className="mx-auto max-w-4xl">
        <p className="font-barlow text-xs font-semibold uppercase tracking-[0.2em] text-[var(--red)]">Quick Answers</p>
        <h2 id="faq-title" className="mt-3 font-playfair text-3xl font-bold sm:text-4xl">Before You Order</h2>
        <div className="mt-8 divide-y divide-red-100 border-y border-red-100">
          {questions.map((item, index) => (
            <details key={item.question} className="group py-1" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-barlow text-base font-semibold marker:content-none">
                {item.question}
                <span aria-hidden="true" className="text-xl font-light text-[var(--red)] transition group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-3xl pb-5 font-barlow text-sm font-light leading-7 text-[var(--text-muted)]">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
