import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="container grid md:grid-cols-4 gap-8 font-mono text-xs">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2 font-extrabold">
          <span className="w-5 h-5 bg-primary text-primary-foreground flex items-center justify-center text-[10px]">⌁</span>
          NOSEPICK<span className="text-primary">.API</span>
        </div>
        <p className="text-muted-foreground mt-3 max-w-sm leading-relaxed">
          The world's most cited real-time nasal-exploration inference platform.
          Operated by Rhinometric Labs GmbH, Berlin.
        </p>
        <Link
          to="/status"
          className="inline-flex items-center gap-2 mt-4 text-foreground/80 hover:text-primary"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-flicker" />
          System Status: All Systems Nominal ✓
        </Link>
        <p className="text-muted-foreground/60 mt-4 text-[10px]">
          Powered by rhino-v4.2.1 · ε-differential privacy · IRB approved · © 2025 Rhinometric Labs.
        </p>
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Product</div>
        <ul className="space-y-2 text-foreground/80">
          <li><a href="/#docs" className="hover:text-primary">API Reference</a></li>
          <li><a href="/#countries" className="hover:text-primary">Country Explorer</a></li>
          <li><a href="/#playground" className="hover:text-primary">API Playground</a></li>
          <li><Link to="/status" className="hover:text-primary">Status</Link></li>
        </ul>
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Research</div>
        <ul className="space-y-2 text-foreground/80">
          <li><a href="/#methodology" className="hover:text-primary">Methodology</a></li>
          <li><a href="/#research" className="hover:text-primary">Empirical Foundation</a></li>
          <li><a href="https://pubmed.ncbi.nlm.nih.gov/7852253/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Jefferson 1995</a></li>
          <li><a href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0288352" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Kluijtmans 2023</a></li>
        </ul>
      </div>
    </div>
  </footer>
);
