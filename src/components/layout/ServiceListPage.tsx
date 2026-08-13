import { useNavigate } from "react-router-dom";
import PageShell from "./PageShell";
import KioskListRow from "../ui/KioskListRow";
import { useApp } from "../../context/AppContext";
import type { MenuItem } from "../../data/kioskData";

interface ServiceListPageProps {
  title: string;
  subtitle: string;
  backTo: string;
  items: MenuItem[];
}

export default function ServiceListPage({ title, subtitle, backTo, items }: ServiceListPageProps) {
  const navigate = useNavigate();
  const { setActiveTopic } = useApp();

  return (
    <PageShell showBack backTo={backTo} subtleBackdrop contentClassName="items-center px-5 py-6">
      <div className="mx-auto w-full max-w-xl animate-fade-in-up">
        <p className="text-xs font-semibold tracking-[0.3em] text-gemilang-yellow uppercase">
          🇲🇾 Perbendaharaan Negeri Selangor
        </p>
        <h1 className="font-heading mt-2 text-2xl font-bold text-kiosk-fg sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-kiosk-fg/70">{subtitle}</p>

        <div className="mt-6 flex flex-col gap-3.5">
          {items.map((item) => (
            <KioskListRow
              key={item.key}
              icon={item.icon}
              label={item.label}
              description={item.description}
              onClick={() => {
                setActiveTopic(item.label);
                navigate("/ai-assistant");
              }}
            />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
