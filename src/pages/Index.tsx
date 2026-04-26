import { Nav } from "@/components/Nav";
import { LiveCounter } from "@/components/LiveCounter";
import { StatCard } from "@/components/StatCard";
import { TrendChart } from "@/components/TrendChart";
import { RegionalBreakdown } from "@/components/RegionalBreakdown";
import { ApiDocs } from "@/components/ApiDocs";
import { Pricing } from "@/components/Pricing";
import { Methodology } from "@/components/Methodology";
import { TrustBar } from "@/components/TrustBar";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* HERO */}
      <section className="relative pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="container">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground border border-border rounded-full px-3 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse-dot" />
              LIVE · UTC {new Date().toISOString().slice(11, 19)} · STREAM #4729-Δ
            </div>

            <h1 className="font-mono text-xs md:text-sm uppercase tracking-[0.4em] text-muted-foreground mb-6">
              Humans currently picking their nose
            </h1>

            <LiveCounter />

            <p className="font-mono text-xs md:text-sm text-muted-foreground mt-8 max-w-xl">
              <span className="text-primary text-glow">±2.3%</span> margin · 97.3% confidence interval ·
              recalibrated every 60s by our Rhinometric™ inference cluster.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
              <a
                href="#docs"
                className="font-mono text-xs uppercase tracking-widest font-bold px-5 py-3 rounded-sm bg-primary text-primary-foreground hover:shadow-glow transition-all"
              >
                Read the Docs →
              </a>
              <a
                href="#pricing"
                className="font-mono text-xs uppercase tracking-widest font-bold px-5 py-3 rounded-sm border border-border hover:border-primary hover:text-primary transition-all"
              >
                Get API Key
              </a>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* DASHBOARD */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">/ telemetry</span>
              <h2 className="font-mono text-2xl md:text-4xl font-extrabold mt-2">
                Real-time <span className="text-primary text-glow">global telemetry</span>
              </h2>
            </div>
            <div className="font-mono text-[11px] text-muted-foreground flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-flicker shadow-neon" />
              ws://api.nosepick.io/v1/stream · CONNECTED
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard
              label="Per Second"
              value="312,488"
              hint="new picks initiated"
              trend="up"
              delta="4.2%"
              badge="LIVE"
            />
            <StatCard
              label="Avg. Duration"
              value="3.7s"
              hint="per session · global"
              trend="flat"
              delta="0.0%"
            />
            <StatCard
              label="Peak Region"
              value="Asia · 14:00 UTC"
              hint="next predicted peak"
              trend="up"
              delta="8.1%"
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

          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
            <TrendChart />
            <RegionalBreakdown />
          </div>
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
