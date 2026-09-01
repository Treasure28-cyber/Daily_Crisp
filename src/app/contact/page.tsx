"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { business } from "@/data/business";

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

  if (!form.name.trim()) {
    errors.name = "Please enter your name.";
  } else if (!/[A-Za-z]/.test(form.name)) {
    errors.name = "Name must include letters.";
  }

  if (!form.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!form.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else if (!/^\d{7,15}$/.test(form.phone)) {
    errors.phone = "Phone number should contain 7 to 15 digits.";
  }

  if (!form.message.trim()) {
    errors.message = "Please enter your message.";
  }

  return errors;
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof ContactForm, boolean>>>({});
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const errors = validateContact(form);
  const visibleErrors = submitted ? errors : Object.fromEntries(Object.entries(errors).filter(([key]) => touched[key as keyof ContactForm]));

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

    window.open(
      `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  }

  return (
    <>
      <PageHero
        eyebrow="Visit Inyang Street"
        title="Contact Us"
        description="Reach our Calabar kitchen for enquiries, special requests, and everything Daily Crisps."
      />
      <section className="bg-[var(--off-white)] px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="rounded-2xl border border-[var(--mid-grey)] bg-white p-6 sm:p-8">
            <form className="space-y-4" onSubmit={submitContact} noValidate>
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block font-barlow text-sm font-medium text-[var(--charcoal)]">Name</label>
                <input
                  id="contact-name"
                  placeholder="Name"
                  value={form.name}
                  onBlur={() => setTouched((current) => ({ ...current, name: true }))}
                  onChange={(event) => updateForm("name", event.target.value)}
                  autoComplete="name"
                  required
                  className="w-full border border-transparent bg-[var(--off-white)] px-4 py-3 font-barlow outline-none focus:border-[var(--red)]"
                />
                {visibleErrors.name ? <p className="mt-1 font-barlow text-xs text-[var(--red)]">{visibleErrors.name}</p> : null}
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block font-barlow text-sm font-medium text-[var(--charcoal)]">Email</label>
                <input
                  id="contact-email"
                  placeholder="Email"
                  value={form.email}
                  onBlur={() => setTouched((current) => ({ ...current, email: true }))}
                  onChange={(event) => updateForm("email", event.target.value)}
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full border border-transparent bg-[var(--off-white)] px-4 py-3 font-barlow outline-none focus:border-[var(--red)]"
                />
                {visibleErrors.email ? <p className="mt-1 font-barlow text-xs text-[var(--red)]">{visibleErrors.email}</p> : null}
              </div>
              <div>
                <label htmlFor="contact-phone" className="mb-1.5 block font-barlow text-sm font-medium text-[var(--charcoal)]">Phone</label>
                <input
                  id="contact-phone"
                  placeholder="Phone"
                  value={form.phone}
                  onBlur={() => setTouched((current) => ({ ...current, phone: true }))}
                  onChange={(event) => updateForm("phone", event.target.value)}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="tel"
                  required
                  className="w-full border border-transparent bg-[var(--off-white)] px-4 py-3 font-barlow outline-none focus:border-[var(--red)]"
                />
                {visibleErrors.phone ? <p className="mt-1 font-barlow text-xs text-[var(--red)]">{visibleErrors.phone}</p> : null}
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-1.5 block font-barlow text-sm font-medium text-[var(--charcoal)]">Message</label>
                <textarea
                  id="contact-message"
                  placeholder="Message"
                  rows={5}
                  value={form.message}
                  onBlur={() => setTouched((current) => ({ ...current, message: true }))}
                  onChange={(event) => updateForm("message", event.target.value)}
                  required
                  className="w-full resize-none border border-transparent bg-[var(--off-white)] px-4 py-3 font-barlow outline-none focus:border-[var(--red)]"
                />
                {visibleErrors.message ? <p className="mt-1 font-barlow text-xs text-[var(--red)]">{visibleErrors.message}</p> : null}
              </div>
              {sent ? (
                <p className="font-barlow text-sm font-semibold text-[var(--red)]">
                  WhatsApp opened with your message ready to send.
                </p>
              ) : null}
              <Button className="w-full">Send via WhatsApp</Button>
            </form>
          </div>
          <div className="h-fit self-start overflow-hidden rounded-2xl border border-[var(--mid-grey)] bg-[var(--light-grey)]">
            <div className="aspect-4/3 w-full sm:aspect-video">
              <iframe
                src="https://maps.google.com/maps?q=No+36+Inyang+Street,+Calabar,+Cross+River+State,+Nigeria&output=embed"
                title="Daily Crisps location map"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
