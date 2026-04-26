import { Nav } from "@/components/Nav";
import { LiveCounter } from "@/components/LiveCounter";
import { StatCard } from "@/components/StatCard";
import { TrendChart } from "@/components/TrendChart";
import { ApiDocs } from "@/components/ApiDocs";
import { Pricing } from "@/components/Pricing";
import { Methodology } from "@/components/Methodology";
import { TrustBar } from "@/components/TrustBar";
import { Footer } from "@/components/Footer";
import { AdvancedTelemetry } from "@/components/AdvancedTelemetry";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import { ObservationClock } from "@/components/ObservationClock";
import { CountryTable } from "@/components/CountryTable";
import { UNPanel } from "@/components/UNPanel";
import { ApiPlayground } from "@/components/ApiPlayground";
import { ResearchPapers } from "@/components/ResearchPapers";

const Index = () => {
  return (
    <div className="min-h-screen">
      <MarqueeTicker />
      <Nav />

      {/* HERO */}
      <section className="relative pt-12 pb-10 md:pt-16 md:pb-14 border-b border-border">
        <div className="container">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground border border-border px-3 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse-dot" />
              LIVE · STREAM #4729-Δ · ε=0.3 · IRB-2024-NP-018
            </div>

            <h1 className="font-mono text-xs md:text-sm uppercase tracking-[0.4em] text-muted-foreground mb-6">
              Humans currently picking their nose
            </h1>

            <LiveCounter />

            <p className="font-mono text-xs md:text-sm text-muted-foreground mt-8 max-w-xl">
              <span className="text-primary">±2.3%</span> margin · 97.3% confidence interval ·
              recalibrated every 60s by our Rhinometric™ inference cluster.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
              <a
                href="#docs"
                className="font-mono text-xs uppercase tracking-widest font-bold px-5 py-3 bg-primary text-primary-foreground hover:brightness-110 transition-all"
              >
                Read the Docs →
              </a>
              <a
                href="#pricing"
                className="font-mono text-xs uppercase tracking-widest font-bold px-5 py-3 border border-border hover:border-primary hover:text-primary transition-all"
              >
                Get API Key
              </a>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* DASHBOARD */}
      <section id="telemetry" className="py-14">
        <div className="container">
          <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">/ telemetry</span>
              <h2 className="font-mono text-2xl md:text-3xl font-extrabold mt-2">
                Real-time global telemetry
              </h2>
            </div>
            <div className="font-mono text-[11px] text-muted-foreground flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-flicker" />
              ws://api.nosepick.io/v1/stream · CONNECTED
            </div>
          </div>

          {/* Clock + headline stats */}
          <div className="grid lg:grid-cols-[1.4fr_1fr_1fr] gap-4 mb-4">
            <ObservationClock />
            <StatCard
              label="Per Second"
              value="312,488"
              hint="new picks initiated"
              trend="up"
              delta="4.2%"
              badge="LIVE"
            />
            <StatCard
              label="Confidence"
              value="97.3%"
              hint="rhinometric model"
              trend="up"
              delta="0.4pp"
              badge="PRO"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard label="Avg. Duration" value="3.7s" hint="per session" trend="flat" delta="0.0%" />
            <StatCard label="Peak Region" value="Asia · 14:00" hint="next predicted peak" trend="up" delta="8.1%" />
            <StatCard label="Model Drift" value="0.0048" hint="KL · 24h" trend="down" delta="-2.1%" />
            <StatCard label="Cohort Coverage" value="94.7%" hint="of tracked pop." trend="up" delta="+0.1pp" />
          </div>

          {/* Trend + UN panel */}
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-4 mb-4">
            <TrendChart />
            <UNPanel />
          </div>

          {/* Country table full-width */}
          <div className="mb-4">
            <CountryTable />
          </div>

          <AdvancedTelemetry />
        </div>
      </section>

      <ApiDocs />
      <Methodology />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;
