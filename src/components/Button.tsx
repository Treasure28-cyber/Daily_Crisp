import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  pulse?: boolean;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type LinkButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  pulse?: boolean;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const styles = {
  primary: "border border-[var(--red)] bg-[var(--red)] text-white hover:bg-[var(--red-light)]",
  secondary: "border border-[var(--charcoal)] bg-white text-[var(--charcoal)] hover:bg-[var(--light-grey)]",
  outline: "border border-[var(--red)] bg-white text-[var(--red)] hover:bg-[var(--red)] hover:text-white",
  ghost: "border border-transparent bg-transparent text-[var(--charcoal)] hover:text-[var(--red)]",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-barlow text-xs font-semibold uppercase tracking-[0.15em] transition";

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
