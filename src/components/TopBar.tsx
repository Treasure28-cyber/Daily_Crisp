import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";

export function TopBar() {
  return (
    <div className="hidden w-full bg-[var(--charcoal)] font-barlow text-[0.8rem] text-white md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
        <div className="flex items-center gap-2 text-white/85">
          <MapPin className="h-3.5 w-3.5 text-white/45" />
          <span>No. 36 Inyang Street, Calabar, Nigeria</span>
          <span className="text-white/35">·</span>
          <Phone className="h-3.5 w-3.5 text-white/45" />
          <span>+234 904 611 6130</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 text-white/45" />
          <span className="text-white/85">Daily: 11:00 AM - 10:30 PM</span>
          <span className="text-white/35">·</span>
          <Link href="/order" className="font-semibold text-[var(--red-light)] hover:text-white">
            Order Hot Chicken Now!
          </Link>
        </div>
      </div>
    </div>
  );
}
