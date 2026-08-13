import Icon from "./Icon";

interface KioskCardProps {
  icon: string;
  label: string;
  description?: string;
  onClick?: () => void;
}

export default function KioskCard({ icon, label, description, onClick }: KioskCardProps) {
  return (
    <button
      onClick={onClick}
      className="kiosk-card group relative overflow-hidden rounded-3xl p-6 text-left transition duration-300 hover:-translate-y-1.5 cursor-pointer"
    >
      <span className="bg-gradient-gold absolute inset-x-0 top-0 h-1.5" />
      <span className="bg-gradient-red absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-royal/10 text-royal">
        <Icon name={icon} className="text-3xl" />
      </div>
      <h2 className="font-heading mt-5 text-xl font-bold text-ink">{label}</h2>
      {description && <p className="mt-1 text-sm text-kiosk-muted-fg">{description}</p>}
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gemilang-red">
        Teruskan
        <Icon name="arrow_forward" className="text-base transition group-hover:translate-x-1" />
      </span>
    </button>
  );
}
