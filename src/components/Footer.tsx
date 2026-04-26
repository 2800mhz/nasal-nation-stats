export const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="container grid md:grid-cols-4 gap-8 font-mono text-xs">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2 font-extrabold">
          <span className="w-5 h-5 rounded-sm bg-primary text-primary-foreground flex items-center justify-center text-[10px]">⌁</span>
          NOSEPICK<span className="text-primary">.API</span>
        </div>
        <p className="text-muted-foreground mt-3 max-w-sm leading-relaxed">
          The world's most cited real-time nasal-exploration inference platform.
          Operated by Rhinometric Labs GmbH, Berlin.
        </p>
        <p className="text-muted-foreground/60 mt-4 text-[10px]">
          Powered by rhino-v4.2.1 · ε-differential privacy · IRB approved · © 2025 Rhinometric Labs.
        </p>
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Product</div>
        <ul className="space-y-2 text-foreground/80">
          <li><a href="#docs" className="hover:text-primary">API Reference</a></li>
          <li><a href="#pricing" className="hover:text-primary">Pricing</a></li>
          <li><a href="#" className="hover:text-primary">Webhooks</a></li>
          <li><a href="#" className="hover:text-primary">SDKs</a></li>
        </ul>
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Company</div>
        <ul className="space-y-2 text-foreground/80">
          <li><a href="#methodology" className="hover:text-primary">Methodology</a></li>
          <li><a href="#" className="hover:text-primary">Research</a></li>
          <li><a href="#" className="hover:text-primary">Press Kit</a></li>
          <li><a href="#" className="hover:text-primary">Careers (we are not hiring)</a></li>
        </ul>
      </div>
    </div>
  </footer>
);
