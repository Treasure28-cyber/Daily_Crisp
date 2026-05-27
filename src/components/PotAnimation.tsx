export function PotAnimation() {
  return (
    <div className="hidden lg:block">
      <div className="relative h-72 w-72 animate-float-pot rounded-full border border-[var(--mid-grey)] bg-white shadow-xl">
        <div className="absolute left-1/2 top-8 h-16 w-2 rounded-full bg-[var(--red)] opacity-30 animate-steam" />
        <div className="absolute left-[42%] top-10 h-14 w-2 rounded-full bg-[var(--red)] opacity-20 animate-steam [animation-delay:0.4s]" />
        <div className="absolute inset-x-12 bottom-14 h-24 rounded-b-3xl rounded-t-lg bg-[var(--charcoal)]" />
        <div className="absolute bottom-32 left-14 right-14 h-5 rounded-full bg-[var(--red)]" />
      </div>
    </div>
  );
}
