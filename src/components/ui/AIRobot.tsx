import Icon from "./Icon";

interface AIRobotProps {
  size?: "sm" | "lg";
}

export default function AIRobot({ size = "lg" }: AIRobotProps) {
  const dims = size === "lg" ? "w-64 h-64 md:w-80 md:h-80" : "w-28 h-28 md:w-32 md:h-32";
  const iconSize = size === "lg" ? "text-[96px] md:text-[120px]" : "text-[44px] md:text-[52px]";

  return (
    <div className={`relative ${dims} flex flex-col items-center justify-center shrink-0`}>
      {/* outer dashed rotating ring */}
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-royal-glow/40 animate-spin-slow" />
      {/* inner rotating ring, reverse */}
      <div className="absolute inset-4 rounded-full border border-gemilang-yellow/50 animate-spin-slow-reverse" />

      {/* floating particles */}
      <span className="absolute top-2 left-8 w-2 h-2 rounded-full bg-gemilang-yellow animate-float" style={{ animationDelay: "0.2s" }} />
      <span className="absolute bottom-6 right-4 w-1.5 h-1.5 rounded-full bg-royal-glow animate-float" style={{ animationDelay: "1s" }} />
      <span className="absolute top-10 right-0 w-1.5 h-1.5 rounded-full bg-gemilang-red/70 animate-float" style={{ animationDelay: "1.8s" }} />
      <span className="absolute bottom-2 left-6 w-2 h-2 rounded-full bg-royal-glow/70 animate-float" style={{ animationDelay: "0.6s" }} />

      {/* glow */}
      <div className="absolute inset-6 rounded-full bg-royal/30 blur-2xl" />

      {/* core orb */}
      <div className="animate-breathe ring-kiosk-fg/40 relative flex h-[68%] w-[68%] items-center justify-center rounded-full bg-gradient-to-br from-royal-glow via-royal to-royal-deep shadow-glow-gold ring-4">
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/0 to-white/20" />
        <Icon name="smart_toy" filled className={`text-kiosk-fg ${iconSize}`} />
        <span className="absolute bottom-3 h-2.5 w-2.5 rounded-full bg-gemilang-yellow shadow-glow-gold" />
      </div>

      {/* conic-gradient glow platform */}
      <div className="relative -mt-3 h-16 w-56 md:h-20 md:w-64">
        <div
          className="animate-ring-spin absolute inset-0 rounded-[50%] opacity-90"
          style={{
            background:
              "conic-gradient(from 0deg, oklch(0.85 0.16 92), oklch(0.56 0.22 27), oklch(0.62 0.19 258), oklch(0.85 0.16 92))",
            filter: "blur(14px)",
          }}
        />
        <div className="absolute inset-x-6 inset-y-4 rounded-[50%] border border-gemilang-yellow/60 bg-royal/40 backdrop-blur-sm" />
      </div>
    </div>
  );
}
