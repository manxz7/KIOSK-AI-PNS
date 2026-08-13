const particles = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 5.6 + (i % 4) * 3) % 100,
  delay: (i % 9) * 1.7,
  duration: 16 + (i % 5) * 4,
  size: 3 + (i % 4),
}));

/**
 * Dark royal-blue kiosk environment: Jalur Gemilang stripes, crescent-and-star
 * watermark, waving flag band and floating golden particles.
 */
export default function JalurBackdrop({ subtle = false }: { subtle?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-royal" />

      {/* Jalur Gemilang stripes watermark */}
      <div
        className="absolute inset-0"
        style={{
          opacity: subtle ? 0.05 : 0.09,
          background:
            "repeating-linear-gradient(180deg, oklch(0.56 0.22 27 / 85%) 0 26px, transparent 26px 52px)",
        }}
      />

      {/* waving flag band */}
      <div className="absolute inset-x-0 top-1/4 h-72 opacity-[0.14]">
        <div
          className="animate-wave h-full w-[200%]"
          style={{
            background:
              "repeating-linear-gradient(180deg, oklch(0.56 0.22 27 / 80%) 0 18px, oklch(1 0 0 / 85%) 18px 36px)",
            maskImage: "radial-gradient(120% 60% at 50% 50%, black 20%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(120% 60% at 50% 50%, black 20%, transparent 75%)",
            transform: "skewY(-3deg)",
          }}
        />
      </div>

      {/* crescent + star watermark */}
      <svg
        viewBox="0 0 200 200"
        className="absolute -left-16 bottom-[-10%] h-[70vh] w-[70vh] opacity-[0.07]"
      >
        <path d="M120 20a80 80 0 100 160 66 66 0 110-160z" fill="oklch(0.85 0.16 92)" />
        <path
          d="M150 78l7.6 20.7 21.9.9-17.2 13.7 5.9 21.3-18.2-12.3-18.2 12.3 5.9-21.3-17.2-13.7 21.9-.9z"
          fill="oklch(0.85 0.16 92)"
        />
      </svg>

      {/* glow pools */}
      <div
        className="absolute top-1/3 left-1/2 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, oklch(0.85 0.16 92 / 22%), transparent 65%)",
        }}
      />
      <div
        className="absolute -right-24 top-0 h-[45vh] w-[45vh] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, oklch(0.56 0.22 27 / 26%), transparent 68%)",
        }}
      />

      {/* golden particles */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-[-10vh] rounded-full"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: "oklch(0.85 0.16 92)",
            boxShadow: "0 0 12px 2px oklch(0.85 0.16 92 / 70%)",
            animation: `float-particle ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
