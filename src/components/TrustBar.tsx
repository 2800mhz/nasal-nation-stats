const LOGOS = [
  "STANFORD HCI LAB", "MIT MEDIA LAB", "ETH ZÜRICH", "MAX PLANCK INST.",
  "WHO BEHAVIORAL", "PFIZER R&D", "UNILEVER HYGIENE", "JOHNS HOPKINS",
];

export const TrustBar = () => (
  <div className="border-y border-border bg-card/50 py-5 overflow-hidden">
    <div className="container">
      <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground text-center mb-3">
        Cited & deployed by
      </div>
      <div className="flex items-center justify-around flex-wrap gap-x-8 gap-y-3 font-mono text-xs font-bold text-muted-foreground/70">
        {LOGOS.map((l) => (
          <span key={l} className="hover:text-primary transition-colors cursor-default">{l}</span>
        ))}
      </div>
    </div>
  </div>
);
