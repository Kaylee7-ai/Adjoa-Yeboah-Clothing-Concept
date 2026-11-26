export default function Loading() {
  return (
    <main
      className="flex min-h-[100svh] items-center justify-center bg-[var(--color-ivory)] px-6"
      aria-label="Loading Adjoa Yeboah Clothing"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="font-display text-3xl tracking-tight text-[var(--color-espresso)]">
          AYC<span className="text-[var(--color-champagne)]">.</span>
        </span>
        <span className="h-1 w-24 overflow-hidden rounded-full bg-black/10">
          <span className="block h-full w-1/2 animate-pulse rounded-full bg-[var(--color-champagne)]" />
        </span>
        <p className="text-xs tracking-[0.18em] text-[var(--color-muted)]">
          PREPARING YOUR EXPERIENCE
        </p>
      </div>
    </main>
  );
}
