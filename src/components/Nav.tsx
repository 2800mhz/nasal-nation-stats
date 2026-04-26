export const Nav = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex items-center justify-between h-14">
        <a href="#" className="flex items-center gap-2 font-mono font-extrabold tracking-tight">
          <span className="w-6 h-6 rounded-sm bg-primary text-primary-foreground flex items-center justify-center text-xs shadow-neon">
            ⌁
          </span>
          <span>NOSEPICK<span className="text-primary text-glow">.API</span></span>
          <span className="ml-2 font-mono text-[9px] px-1.5 py-0.5 rounded-sm border border-border text-muted-foreground">
            v4.2.1
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7 font-mono text-xs text-muted-foreground">
          <a href="#docs" className="hover:text-primary transition-colors">DOCS</a>
          <a href="#pricing" className="hover:text-primary transition-colors">PRICING</a>
          <a href="#methodology" className="hover:text-primary transition-colors">METHODOLOGY</a>
          <a href="#" className="hover:text-primary transition-colors">STATUS</a>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-flicker shadow-neon" />
            ALL SYSTEMS NOMINAL
          </span>
          <a
            href="#pricing"
            className="font-mono text-xs uppercase tracking-widest font-bold px-3 py-1.5 rounded-sm bg-primary text-primary-foreground hover:shadow-glow transition-all"
          >
            Get Key
          </a>
        </div>
      </div>
    </header>
  );
};
