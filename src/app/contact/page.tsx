import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/Button";

export default function ContactPage() {
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
            <form className="mt-10 space-y-4">
              {["Name", "Email", "Phone"].map((field) => (
                <input
                  key={field}
                  placeholder={field}
                  className="w-full border border-transparent bg-[var(--off-white)] px-4 py-3 font-barlow outline-none focus:border-[var(--red)]"
                />
              ))}
              <textarea
                placeholder="Message"
                rows={5}
                className="w-full resize-none border border-transparent bg-[var(--off-white)] px-4 py-3 font-barlow outline-none focus:border-[var(--red)]"
              />
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
