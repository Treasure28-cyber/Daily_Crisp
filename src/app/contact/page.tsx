"use client";

import Image from "next/image";
import type { FormEvent } from "react";
import { useState } from "react";
import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/Button";
import { SectionReveal } from "@/components/SectionReveal";
import { business, businessHours } from "@/data/business";

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type ContactErrors = Partial<Record<keyof ContactForm, string>>;

function sanitizeName(value: string) {
  return value.replace(/[0-9]/g, "");
}

function sanitizePhone(value: string) {
  return value.replace(/\D/g, "");
}

function validateContact(form: ContactForm) {
  const errors: ContactErrors = {};

  if (!form.name.trim()) errors.name = "Please enter your name.";
  else if (!/[A-Za-z]/.test(form.name)) errors.name = "Name must include letters.";

  if (!form.email.trim()) errors.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Please enter a valid email address.";

  if (!form.phone.trim()) errors.phone = "Please enter your phone number.";
  else if (!/^\d{7,15}$/.test(form.phone)) errors.phone = "Phone number should contain 7 to 15 digits.";

  if (!form.message.trim()) errors.message = "Please enter your message.";
  return errors;
}

const inputClass = "w-full rounded-xl border border-[#e4d7ce] bg-[var(--off-white)] px-4 py-3.5 font-barlow text-[var(--charcoal)] outline-none transition placeholder:text-[#9b8e88] focus:border-[var(--red)] focus:bg-white";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof ContactForm, boolean>>>({});
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", phone: "", message: "" });

  const errors = validateContact(form);
  const visibleErrors = submitted
    ? errors
    : Object.fromEntries(Object.entries(errors).filter(([key]) => touched[key as keyof ContactForm]));

  function updateForm(field: keyof ContactForm, value: string) {
    const nextValue = field === "name" ? sanitizeName(value) : field === "phone" ? sanitizePhone(value) : value;
    setForm((current) => ({ ...current, [field]: nextValue }));
    setSent(false);
  }

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length > 0) return;

    const message = [
      "Hello Daily Crisps,",
      "",
      "I am contacting you through your website.",
      "",
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Phone: ${form.phone.trim()}`,
      "",
      "Message:",
      form.message.trim(),
    ].join("\n");

    window.open(`https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <>
      <section className="bg-[var(--cream)] px-5 pb-10 sm:px-8 sm:pb-14" aria-labelledby="contact-title">
        <div className="relative isolate mx-auto min-h-[590px] max-w-[86rem] overflow-hidden rounded-[2.25rem] text-white">
          <Image
            src="/daily-crisps-interior-hero-v2.png"
            alt="The Daily Crisps restaurant and kitchen in Calabar"
            fill
            priority
            sizes="(max-width: 1536px) 96vw, 1376px"
            className="-z-20 object-cover object-center"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(24,10,6,.92),rgba(28,11,6,.67)_48%,rgba(20,8,4,.18))]" />
          <div className="flex min-h-[590px] items-center px-7 py-16 sm:px-12 lg:px-16">
            <div className="max-w-2xl">
              <p className="eyebrow text-[#ffd39a]">Visit, call or send a message</p>
              <h1 id="contact-title" className="mt-5 font-playfair text-5xl font-semibold leading-[.96] tracking-[-.045em] sm:text-7xl">
                Let&apos;s get you<br /><span className="text-[#ff6254]">something satisfying.</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-8 text-white/72">
                Find our kitchen on Inyang Street or reach the team for order questions, special requests and everything Daily Crisps.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--off-white)] px-5 py-16 sm:px-8 sm:py-20" aria-labelledby="contact-options-title">
        <SectionReveal className="mx-auto max-w-[86rem]">
          <div className="mb-9 max-w-3xl">
            <p className="eyebrow text-[var(--red)]">Choose what works for you</p>
            <h2 id="contact-options-title" className="mt-3 font-playfair text-4xl font-semibold tracking-[-.035em] text-[var(--charcoal)] sm:text-5xl">The kitchen is within reach.</h2>
          </div>
          <div className="grid border-y border-[#eaded5] md:grid-cols-3 md:divide-x md:divide-[#eaded5]">
            <a href={`https://wa.me/${business.whatsappNumber}`} target="_blank" rel="noreferrer" className="group px-2 py-8 md:px-8">
              <MessageCircle className="h-6 w-6 text-[var(--red)]" />
              <h3 className="mt-5 font-playfair text-2xl font-semibold text-[var(--charcoal)]">Message the kitchen</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">Ask about an order or send a special request through WhatsApp.</p>
              <span className="mt-5 inline-block font-barlow text-sm font-semibold text-[var(--red)] transition group-hover:translate-x-1">Open WhatsApp →</span>
            </a>
            <a href={`tel:${business.phoneE164}`} className="group border-t border-[#eaded5] px-2 py-8 md:border-t-0 md:px-8">
              <Phone className="h-6 w-6 text-[var(--red)]" />
              <h3 className="mt-5 font-playfair text-2xl font-semibold text-[var(--charcoal)]">Call Daily Crisps</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">Speak directly with the team during kitchen hours.</p>
              <span className="mt-5 inline-block font-barlow text-sm font-semibold text-[var(--red)] transition group-hover:translate-x-1">{business.phoneDisplay} →</span>
            </a>
            <a href="https://maps.google.com/?q=No+36+Inyang+Street,+Calabar,+Cross+River+State,+Nigeria" target="_blank" rel="noreferrer" className="group border-t border-[#eaded5] px-2 py-8 md:border-t-0 md:px-8">
              <MapPin className="h-6 w-6 text-[var(--red)]" />
              <h3 className="mt-5 font-playfair text-2xl font-semibold text-[var(--charcoal)]">Visit Inyang Street</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{business.streetAddress}, {business.locality}, {business.region}.</p>
              <span className="mt-5 inline-block font-barlow text-sm font-semibold text-[var(--red)] transition group-hover:translate-x-1">Get directions →</span>
            </a>
          </div>
        </SectionReveal>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 sm:py-28" aria-labelledby="message-title">
        <SectionReveal className="mx-auto grid max-w-[86rem] gap-12 lg:grid-cols-[.78fr_1.22fr] lg:gap-20">
          <div>
            <p className="eyebrow text-[var(--red)]">Talk to the team</p>
            <h2 id="message-title" className="mt-4 font-playfair text-4xl font-semibold leading-tight tracking-[-.035em] text-[var(--charcoal)] sm:text-5xl">Send a message to our kitchen.</h2>
            <p className="mt-5 max-w-md text-base leading-8 text-[var(--text-muted)]">
              Tell us what you need. After validation, your message opens in WhatsApp for you to review and send.
            </p>

            <div className="mt-9 border-y border-[#eaded5] py-7">
              <p className="flex gap-3 text-sm text-[var(--text-muted)]"><Mail className="mt-1 h-5 w-5 shrink-0 text-[var(--red)]" /> {business.email}</p>
              <div className="mt-6 flex gap-3 text-sm text-[var(--text-muted)]">
                <Clock3 className="mt-1 h-5 w-5 shrink-0 text-[var(--red)]" />
                <div className="space-y-2">
                  {businessHours.map((hours) => <p key={hours.label}><strong className="text-[var(--charcoal)]">{hours.label}:</strong> {hours.display}</p>)}
                </div>
              </div>
            </div>
          </div>

          <form className="rounded-[2rem] border border-[#eaded5] bg-[var(--cream)] p-6 sm:p-9" onSubmit={submitContact} noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-2 block font-barlow text-sm font-semibold text-[var(--charcoal)]">Your name</label>
                <input id="contact-name" placeholder="Ada Ekanem" value={form.name} onBlur={() => setTouched((current) => ({ ...current, name: true }))} onChange={(event) => updateForm("name", event.target.value)} autoComplete="name" required aria-invalid={Boolean(visibleErrors.name)} aria-describedby={visibleErrors.name ? "contact-name-error" : undefined} className={inputClass} />
                {visibleErrors.name ? <p id="contact-name-error" className="mt-2 font-barlow text-xs text-[var(--red)]">{visibleErrors.name}</p> : null}
              </div>
              <div>
                <label htmlFor="contact-phone" className="mb-2 block font-barlow text-sm font-semibold text-[var(--charcoal)]">Phone number</label>
                <input id="contact-phone" placeholder="0800 000 0000" value={form.phone} onBlur={() => setTouched((current) => ({ ...current, phone: true }))} onChange={(event) => updateForm("phone", event.target.value)} inputMode="numeric" pattern="[0-9]*" autoComplete="tel" required aria-invalid={Boolean(visibleErrors.phone)} aria-describedby={visibleErrors.phone ? "contact-phone-error" : undefined} className={inputClass} />
                {visibleErrors.phone ? <p id="contact-phone-error" className="mt-2 font-barlow text-xs text-[var(--red)]">{visibleErrors.phone}</p> : null}
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor="contact-email" className="mb-2 block font-barlow text-sm font-semibold text-[var(--charcoal)]">Email address</label>
              <input id="contact-email" placeholder="you@example.com" value={form.email} onBlur={() => setTouched((current) => ({ ...current, email: true }))} onChange={(event) => updateForm("email", event.target.value)} type="email" autoComplete="email" required aria-invalid={Boolean(visibleErrors.email)} aria-describedby={visibleErrors.email ? "contact-email-error" : undefined} className={inputClass} />
              {visibleErrors.email ? <p id="contact-email-error" className="mt-2 font-barlow text-xs text-[var(--red)]">{visibleErrors.email}</p> : null}
            </div>
            <div className="mt-5">
              <label htmlFor="contact-message" className="mb-2 block font-barlow text-sm font-semibold text-[var(--charcoal)]">How can we help?</label>
              <textarea id="contact-message" placeholder="Tell us about your order, request or visit…" rows={6} value={form.message} onBlur={() => setTouched((current) => ({ ...current, message: true }))} onChange={(event) => updateForm("message", event.target.value)} required aria-invalid={Boolean(visibleErrors.message)} aria-describedby={visibleErrors.message ? "contact-message-error" : undefined} className={`${inputClass} resize-none`} />
              {visibleErrors.message ? <p id="contact-message-error" className="mt-2 font-barlow text-xs text-[var(--red)]">{visibleErrors.message}</p> : null}
            </div>
            {sent ? <p className="mt-5 rounded-xl bg-white px-4 py-3 font-barlow text-sm font-semibold text-[var(--red-dark)]" role="status">WhatsApp opened with your message ready to send.</p> : null}
            <Button className="mt-6 w-full py-4"><MessageCircle className="h-4 w-4" /> Continue in WhatsApp</Button>
          </form>
        </SectionReveal>
      </section>

      <section className="bg-[var(--cream)] px-5 pb-24 sm:px-8 sm:pb-28" aria-labelledby="map-title">
        <SectionReveal className="mx-auto grid max-w-[86rem] overflow-hidden rounded-[2rem] border border-[#eaded5] bg-white lg:grid-cols-[.72fr_1.28fr]">
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <p className="eyebrow text-[var(--red)]">No. 36 Inyang Street</p>
            <h2 id="map-title" className="mt-4 font-playfair text-4xl font-semibold text-[var(--charcoal)]">Come hungry. We&apos;re right here.</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">Use the map for directions to the Daily Crisps kitchen in Calabar.</p>
          </div>
          <div className="min-h-[420px] bg-[var(--light-grey)]">
            <iframe src="https://maps.google.com/maps?q=No+36+Inyang+Street,+Calabar,+Cross+River+State,+Nigeria&output=embed" title="Daily Crisps location map" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" className="h-full min-h-[420px] w-full border-0" />
          </div>
        </SectionReveal>
      </section>
    </>
  );
}
