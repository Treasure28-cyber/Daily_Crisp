"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/Button";

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
    setSent(true);
  }

  return (
    <section className="bg-[var(--off-white)] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="font-barlow text-xs font-semibold uppercase tracking-[0.2em] text-[var(--red)]">
            Visit Inyang Street
          </p>
          <h1 className="mt-3 font-playfair text-5xl font-bold text-[var(--charcoal)]">
            Contact Us
          </h1>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="bg-white p-8">
            <h2 className="font-playfair text-3xl font-bold text-[var(--charcoal)]">
              Reach Daily Crisps
            </h2>
            <div className="mt-6 space-y-5 font-barlow text-[var(--text-muted)]">
              <p className="flex gap-3">
                <MapPin className="h-5 w-5 text-[var(--red)]" /> No. 36 Inyang
                Street, Calabar, Cross River State, Nigeria
              </p>
              <p className="flex gap-3">
                <Phone className="h-5 w-5 text-[var(--red)]" /> +234 904 611
                6130
              </p>
              <p className="flex gap-3">
                <Mail className="h-5 w-5 text-[var(--red)]" />{" "}
                hello@dailycrisps.ng
              </p>
              <p className="flex gap-3">
                <Clock className="h-5 w-5 text-[var(--red)]" /> Daily: 11:00 AM
                - 10:30 PM
              </p>
            </div>
            <div className="mt-6 flex gap-3 text-[var(--charcoal)]">
              {["IG", "FB", "X"].map((label) => (
                <span
                  key={label}
                  className="flex h-10 w-10 items-center justify-center border border-[var(--mid-grey)] font-barlow text-xs font-semibold"
                >
                  {label}
                </span>
              ))}
            </div>
            <form className="mt-10 space-y-4" onSubmit={submitContact} noValidate>
              <div>
                <input
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
                <input
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
                <input
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
                <textarea
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
                  Message validated. Daily Crisps will respond shortly.
                </p>
              ) : null}
              {/* TODO: connect to backend - POST /api/contact */}
              <Button className="w-full">Send Message</Button>
            </form>
          </div>
          <div className="overflow-hidden rounded-[1.75rem] bg-light-grey shadow-[0_18px_45px_rgba(26,26,26,0.08)]">
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
  );
}
