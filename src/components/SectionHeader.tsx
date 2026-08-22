type SectionHeaderProps = {
  label: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function SectionHeader({ label, title, body, align = "center", tone = "light" }: SectionHeaderProps) {
  const titleColor = tone === "dark" ? "text-white" : "text-[var(--charcoal)]";
  const bodyColor = tone === "dark" ? "text-white/70" : "text-[var(--text-muted)]";

  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="font-barlow text-xs font-semibold uppercase tracking-[0.2em] text-red-400">{label}</p>
      <h2 className={`mt-3 font-playfair text-3xl font-bold leading-tight sm:text-4xl md:text-5xl ${titleColor}`}>{title}</h2>
      {body ? <p className={`mt-4 font-barlow text-lg font-light leading-8 ${bodyColor}`}>{body}</p> : null}
    </div>
  );
}
