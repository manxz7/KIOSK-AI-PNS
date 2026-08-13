import Icon from "./Icon";

interface KioskListRowProps {
  icon: string;
  label: string;
  description?: string;
  onClick?: () => void;
}

export default function KioskListRow({ icon, label, description, onClick }: KioskListRowProps) {
  return (
    <button
      onClick={onClick}
      className="kiosk-card group flex w-full items-center gap-4 rounded-2xl p-4 text-left transition-all duration-200 ease-out hover:-translate-y-0.5 cursor-pointer md:p-5"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-royal/10 text-royal transition-colors group-hover:bg-royal group-hover:text-kiosk-fg md:h-14 md:w-14">
        <Icon name={icon} className="text-2xl md:text-3xl" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-heading truncate text-base font-semibold text-ink md:text-lg">
          {label}
        </h3>
        {description && (
          <p className="mt-0.5 truncate text-sm text-kiosk-muted-fg">{description}</p>
        )}
      </div>
      <Icon
        name="chevron_right"
        className="shrink-0 text-kiosk-muted-fg transition-transform group-hover:translate-x-0.5 group-hover:text-gemilang-red"
      />
    </button>
  );
}
