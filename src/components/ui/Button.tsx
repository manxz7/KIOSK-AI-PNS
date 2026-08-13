import type { ButtonHTMLAttributes, ReactNode } from "react";
import Icon from "./Icon";

type Variant = "primary" | "secondary" | "cta" | "ghost";
type Size = "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: string;
  iconTrailing?: string;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-red text-kiosk-fg border border-gemilang-yellow/60 shadow-glow-red hover:scale-[1.03]",
  cta: "animate-glow-pulse bg-gradient-red text-kiosk-fg border border-gemilang-yellow/70 hover:scale-[1.03]",
  secondary: "glass-panel text-kiosk-fg hover:ring-2 hover:ring-gemilang-yellow",
  ghost: "glass-panel text-kiosk-fg hover:ring-2 hover:ring-gemilang-yellow",
};

const sizeClasses: Record<Size, string> = {
  md: "px-6 py-3 text-sm rounded-full gap-2 tracking-[0.15em] uppercase",
  lg: "px-9 py-4 text-base rounded-full gap-2.5 tracking-[0.18em] uppercase",
  xl: "px-14 py-5 text-lg rounded-full gap-3 tracking-[0.2em] uppercase",
};

export default function Button({
  variant = "primary",
  size = "lg",
  icon,
  iconTrailing,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center font-bold transition-all duration-200 ease-out active:scale-[0.97] cursor-pointer disabled:opacity-50 disabled:pointer-events-none ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {icon && <Icon name={icon} />}
      {children}
      {iconTrailing && <Icon name={iconTrailing} />}
    </button>
  );
}
