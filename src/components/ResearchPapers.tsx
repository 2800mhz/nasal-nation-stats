const PAPERS = [
  {
    authors: "Jefferson, J. W. & Thompson, T. D.",
    year: 1995,
    title: "Rhinotillexomania: Psychiatric Disorder or Habit?",
    journal: "Journal of Clinical Psychiatry",
    finding: "91% prevalence rate among 254 Wisconsin adults — our global baseline.",
    citation: "J Clin Psychiatry. 1995;56(2):56–9.",
    url: "https://pubmed.ncbi.nlm.nih.gov/7852253/",
  },
  {
    authors: "Andrade, C. & Srihari, B. S.",
    year: 2001,
    title: "A preliminary survey of rhinotillexomania in an adolescent sample",
    journal: "Journal of Clinical Psychiatry",
    finding: "Median frequency 4 picks/day — our picks_per_day constant.",
    citation: "J Clin Psychiatry. 2001;62(6):426–31.",
    url: "https://pubmed.ncbi.nlm.nih.gov/11465519/",
  },
  {
    authors: "Kluijtmans, J. A. J. W. et al.",
    year: 2023,
    title: "Nose picking and SARS-CoV-2 incidence — cohort study, Netherlands",
    journal: "PLOS ONE",
    finding: "84.5% of healthcare workers self-reported as nose pickers.",
    citation: "PLOS ONE. 2023;18(8):e0288352.",
    url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0288352",
  },
  {
    authors: "Chacko, A., Delbaz, A., Walkden, H. et al.",
    year: 2023,
    title: "Chlamydia pneumoniae nasal pathway to brain — Alzheimer's link",
    journal: "Biomolecules",
    finding: "Nose picking facilitates bacterial entry via the olfactory nerve.",
    citation: "Biomolecules. 2023;13(10):1467.",
    url: "https://pubmed.ncbi.nlm.nih.gov/37892250/",
  },
];

export const ResearchPapers = () => (
  <section id="research" className="border-t border-border py-20">
    <div className="container">
      <div className="max-w-2xl mb-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">/ empirical foundation</span>
        <h2 className="font-mono text-3xl md:text-4xl font-extrabold mt-3 leading-tight">
          Empirical Foundation
        </h2>
        <p className="text-muted-foreground mt-3 font-mono text-sm">
          NosePick.API baseline rates are derived from peer-reviewed literature.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {PAPERS.map((p) => (
          <a
            key={p.url}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-border bg-card p-5 hover:border-primary transition-colors flex flex-col"
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-1 border border-border text-muted-foreground">
                {p.journal}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground tabular-nums">{p.year}</span>
            </div>
            <div className="font-mono text-xs text-muted-foreground mb-1">{p.authors}</div>
            <h3 className="font-mono text-sm md:text-base font-bold text-foreground leading-snug mb-3">
              {p.title}
            </h3>
            <div className="border-l-2 border-primary pl-3 mb-4">
              <div className="font-mono text-[9px] uppercase tracking-widest text-primary mb-1">
                Key finding
              </div>
              <p className="font-mono text-xs text-foreground/90 leading-relaxed">{p.finding}</p>
            </div>
            <div className="mt-auto flex items-center justify-between font-mono text-[10px] text-muted-foreground">
              <span className="italic truncate pr-3">{p.citation}</span>
              <span className="text-primary group-hover:translate-x-1 transition-transform shrink-0">
                View Paper →
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);
