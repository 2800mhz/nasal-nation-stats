import { Check } from "lucide-react";

const TIERS = [
  {
    name: "HOBBY",
    price: "$0",
    period: "/forever",
    blurb: "For casual researchers and curious developers.",
    cta: "Get API Key",
    featured: false,
    features: [
      "1,000 requests / month",
      "82.4% baseline accuracy",
      "Global aggregate only",
      "Community Discord support",
      "Standard 5-min cache",
    ],
  },
  {
    name: "PRO",
    price: "$9.99",
    period: "/month",
    blurb: "For serious applications that demand precision.",
    cta: "Upgrade to Pro",
    featured: true,
    badge: "MOST POPULAR",
    features: [
      "Unlimited requests",
      "99.7% inference accuracy",
      "Real-time webhooks (1Hz)",
      "Demographic segmentation",
      "Regional + city-level data",
      "Predictive forecasting model",
      "Priority email support",
      "SLA: 99.99% uptime",
    ],
  },
  {
    name: "ENTERPRISE",
    price: "Custom",
    period: "/quote",
    blurb: "For governments, NGOs, and Fortune 500 hygiene programs.",
    cta: "Contact Sales",
    featured: false,
    features: [
      "Dedicated inference cluster",
      "Custom regional models",
      "On-premise deployment option",
      "HIPAA + SOC 2 compliance",
      "24/7 dedicated CSM",
      "Co-authored white papers",
    ],
  },
];

export const Pricing = () => (
  <section id="pricing" className="border-t border-border py-20">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">/ pricing</span>
        <h2 className="font-mono text-3xl md:text-5xl font-extrabold mt-3 leading-tight">
          Pay for the <span className="text-primary text-glow">decimals</span>.
        </h2>
        <p className="text-muted-foreground mt-4">
          Free tier gets you the global average. Pro unlocks the granularity that matters.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {TIERS.map((t) => (
          <div
            key={t.name}
            className={`relative rounded-md border bg-card p-6 flex flex-col ${
              t.featured
                ? "border-primary/60 shadow-glow"
                : "border-border shadow-card-elev"
            }`}
          >
            {t.badge && (
              <span className="absolute -top-2.5 left-6 font-mono text-[9px] px-2 py-0.5 rounded-sm bg-primary text-primary-foreground tracking-widest font-bold">
                {t.badge}
              </span>
            )}
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {t.name}
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className={`font-mono text-4xl font-extrabold ${t.featured ? "text-primary text-glow" : "text-foreground"}`}>
                {t.price}
              </span>
              <span className="font-mono text-xs text-muted-foreground">{t.period}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-3 min-h-[40px]">{t.blurb}</p>

            <ul className="mt-6 space-y-2.5 flex-1">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className={`w-4 h-4 mt-0.5 shrink-0 ${t.featured ? "text-primary" : "text-muted-foreground"}`} />
                  <span className="text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>

            <button
              className={`mt-6 w-full font-mono text-xs uppercase tracking-widest font-bold py-3 rounded-sm transition-all ${
                t.featured
                  ? "bg-primary text-primary-foreground hover:shadow-glow hover:brightness-110"
                  : "border border-border text-foreground hover:border-primary/60 hover:text-primary"
              }`}
            >
              {t.cta} →
            </button>
          </div>
        ))}
      </div>

      <p className="text-center font-mono text-[10px] text-muted-foreground mt-8 max-w-xl mx-auto">
        * Accuracy figures derived from internal Rhinometric™ benchmarks. Past performance does not guarantee future picking patterns.
      </p>
    </div>
  </section>
);
