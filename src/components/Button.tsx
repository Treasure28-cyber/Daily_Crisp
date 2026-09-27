import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "inverted" | "light-outline";
  pulse?: boolean;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type LinkButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "inverted" | "light-outline";
  pulse?: boolean;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const styles = {
  primary: "brand-button--primary",
  secondary: "brand-button--secondary",
  outline: "brand-button--outline",
  ghost: "brand-button--ghost",
  inverted: "brand-button--inverted",
  "light-outline": "brand-button--light-outline",
};

const base =
  "brand-button inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-barlow text-xs font-semibold uppercase tracking-[0.15em] transition duration-300";

export function Button({ children, variant = "primary", pulse, className = "", ...props }: ButtonProps) {
  return (
    <button className={`${base} ${styles[variant]} ${pulse ? "animate-pulse-red" : ""} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function LinkButton({ children, href, variant = "primary", pulse, className = "", ...props }: LinkButtonProps) {
  return (
    <Link href={href} className={`${base} ${styles[variant]} ${pulse ? "animate-pulse-red" : ""} ${className}`} {...props}>
      {children}
    </Link>
  );
}
