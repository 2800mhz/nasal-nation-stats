const LOGOS = [
  "STANFORD HCI", "MIT MEDIA", "ETH ZÜRICH", "MAX PLANCK",
  "WHO BEHAVIORAL", "JOHNS HOPKINS", "PFIZER R&D", "UNILEVER",
];

export const TrustBar = () => (
  <div className="border-y border-border bg-card/40 py-6">
    <div className="container">
      <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground text-center mb-4">
        Cited & deployed by
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-6 gap-y-3 items-center justify-items-center font-mono text-[11px] font-semibold text-muted-foreground/70">
        {LOGOS.map((l) => (
          <span key={l} className="whitespace-nowrap hover:text-foreground transition-colors cursor-default">
            {l}
          </span>
        ))}
      </div>
    </div>
  </div>
);
