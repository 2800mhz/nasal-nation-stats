export const Nav = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container flex items-center justify-between h-12">
        <a href="#" className="flex items-center gap-2 font-mono font-extrabold tracking-tight">
          <span className="w-5 h-5 bg-primary text-primary-foreground flex items-center justify-center text-[11px]">
            ⌁
          </span>
          <span className="text-sm">NOSEPICK<span className="text-primary">.API</span></span>
          <span className="ml-2 font-mono text-[9px] px-1.5 py-0.5 border border-border text-muted-foreground">
            v4.2.1
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7 font-mono text-xs text-muted-foreground">
          <a href="#telemetry" className="hover:text-primary transition-colors">TELEMETRY</a>
          <a href="#docs" className="hover:text-primary transition-colors">DOCS</a>
          <a href="#methodology" className="hover:text-primary transition-colors">METHODOLOGY</a>
          <a href="#pricing" className="hover:text-primary transition-colors">PRICING</a>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-foreground/80 border border-primary/40 bg-primary/5 px-2 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-flicker" />
            ALL SYSTEMS NOMINAL
          </span>
          <a
            href="#pricing"
            className="font-mono text-[11px] uppercase tracking-widest font-bold px-3 py-1.5 bg-primary text-primary-foreground hover:brightness-110 transition-all"
          >
            Get Key
          </a>
        </div>
      </div>
    </header>
  );
};
