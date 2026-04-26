import { useEffect, useState } from "react";

// Realistic-looking baseline: ~14% of world population at any moment
// (population ~8.1B * 0.14 ≈ 1.13B). Wobble for "live" feel.
const BASELINE = 1_134_872_419;

function easeOutQuad(t: number) {
  return t * (2 - t);
}

export const LiveCounter = () => {
  const [value, setValue] = useState(BASELINE);
  const [target, setTarget] = useState(BASELINE);

  // Pick a new realistic target every ~600ms
  useEffect(() => {
    const id = setInterval(() => {
      const drift = Math.floor((Math.random() - 0.45) * 80_000);
      setTarget((t) => {
        const next = t + drift;
        // Mean-revert toward baseline so it doesn't wander
        const correction = Math.floor((BASELINE - next) * 0.05);
        return next + correction;
      });
    }, 600);
    return () => clearInterval(id);
  }, []);

  // Smoothly tween value -> target
  useEffect(() => {
    let raf = 0;
    const start = value;
    const end = target;
    const startTime = performance.now();
    const duration = 600;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = easeOutQuad(t);
      setValue(Math.round(start + (end - start) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  const formatted = value.toLocaleString("en-US");
  const digits = formatted.split("");

  return (
    <div className="relative">
      <div className="flex items-center justify-center gap-1 sm:gap-2 font-mono font-extrabold tabular-nums leading-none">
        {digits.map((d, i) => (
          <span
            key={i}
            className={
              d === ","
                ? "text-foreground/30 text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
                : "text-foreground text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight"
            }
          >
            {d}
          </span>
        ))}
        <span className="ml-2 w-[4px] sm:w-[6px] h-10 sm:h-16 md:h-20 lg:h-24 bg-primary/80 animate-blink" aria-hidden />
      </div>
    </div>
  );
};
