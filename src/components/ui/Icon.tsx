interface IconProps {
  name: string;
  className?: string;
  filled?: boolean;
}

export default function Icon({ name, className = "", filled = false }: IconProps) {
  return (
    <span aria-hidden="true" className={`material-symbols-rounded ${filled ? "msr-fill" : ""} ${className}`}>
      {name}
    </span>
  );
}
