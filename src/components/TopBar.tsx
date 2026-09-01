import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";

export function TopBar() {
  return (
    <div className="hidden w-full border-b border-red-100 bg-[var(--red-soft)] font-barlow text-sm text-[var(--charcoal)] md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
        <div className="flex items-center gap-2 text-[var(--text-muted)]">
          <MapPin className="h-3.5 w-3.5 text-[var(--red)]" />
          <span>No. 36 Inyang Street, Calabar, Nigeria</span>
          <span className="text-red-200">·</span>
          <Phone className="h-3.5 w-3.5 text-[var(--red)]" />
          <span>+234 904 611 6130</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 text-[var(--red)]" />
          <span className="text-[var(--text-muted)]">Daily: 11:00 AM - 10:30 PM</span>
          <span className="text-red-200">·</span>
          <Link href="/order" className="font-semibold text-[var(--red)] hover:text-[var(--red-light)]">
            Order Hot Chicken Now!
          </Link>
        </div>
      </div>
    </div>
  );
}
