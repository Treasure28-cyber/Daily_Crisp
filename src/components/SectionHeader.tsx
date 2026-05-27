type SectionHeaderProps = {
  label: string;
  title: string;
  body?: string;
  align?: "left" | "center";
};

export function SectionHeader({ label, title, body, align = "center" }: SectionHeaderProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="font-barlow text-xs font-semibold uppercase tracking-[0.2em] text-[var(--red)]">{label}</p>
      <h2 className="mt-3 font-playfair text-4xl font-bold leading-tight text-[var(--charcoal)] md:text-5xl">{title}</h2>
      {body ? <p className="mt-4 font-barlow text-lg font-light leading-8 text-[var(--text-muted)]">{body}</p> : null}
    </div>
  );
}
