const SOURCES = [
  { tag: "Nature Methods", year: 2024, title: "Inferring nasal exploration behavior from satellite proxies", id: "10.1038/s41592-024-9182" },
  { tag: "MIT Tech Review", year: 2024, title: "How a Berlin startup mapped a billion fingers in real time", id: "MITTR-2024-Q3" },
  { tag: "JAMA Ergonomics", year: 2023, title: "Diurnal patterns of unconscious facial contact", id: "10.1001/jama.erg.2023.4471" },
  { tag: "WHO Working Paper", year: 2025, title: "Towards a global behavioral hygiene index", id: "WHO/BH/2025.04" },
];

export const Methodology = () => (
  <section id="methodology" className="border-t border-border py-20">
    <div className="container grid lg:grid-cols-[1fr_1.2fr] gap-12">
      <div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">/ methodology</span>
        <h2 className="font-mono text-3xl md:text-4xl font-extrabold mt-3 leading-tight">
          Backed by <span className="text-primary text-glow">peer-reviewed</span> research.
        </h2>
        <p className="text-muted-foreground mt-4 leading-relaxed">
          Our Rhinometric™ inference engine fuses 47 anonymized telemetry streams — wearable accelerometry,
          public webcam aggregate motion, satellite-derived crowd density, and ambient pollen indices —
          through a proprietary transformer trained on 14B labeled gesture-seconds.
        </p>
        <p className="text-muted-foreground mt-3 leading-relaxed">
          We do <span className="text-foreground font-medium">not</span> identify individuals. Ever. All inference
          happens at the population level with differential privacy guarantees (ε = 0.3).
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3 font-mono text-xs">
          <div className="border border-border rounded-sm p-3">
            <div className="text-primary text-glow text-2xl font-bold">14B</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">labeled gestures</div>
          </div>
          <div className="border border-border rounded-sm p-3">
            <div className="text-primary text-glow text-2xl font-bold">47</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">data streams</div>
          </div>
          <div className="border border-border rounded-sm p-3">
            <div className="text-primary text-glow text-2xl font-bold">ε=0.3</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">privacy budget</div>
          </div>
        </div>
      </div>

      <div className="border border-border bg-card p-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Selected Citations
        </div>
        <ul className="divide-y divide-border">
          {SOURCES.map((s) => (
            <li key={s.id} className="py-3.5 first:pt-0 last:pb-0">
              <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground mb-1">
                <span className="text-primary">{s.tag}</span>
                <span>·</span>
                <span>{s.year}</span>
                <span className="ml-auto opacity-60">{s.id}</span>
              </div>
              <div className="text-sm text-foreground/90 leading-snug">{s.title}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
