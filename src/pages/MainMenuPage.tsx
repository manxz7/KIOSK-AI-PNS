import { useNavigate } from "react-router-dom";
import PageShell from "../components/layout/PageShell";
import KioskListRow from "../components/ui/KioskListRow";
import { useApp } from "../context/AppContext";
import { MAIN_MENU } from "../data/kioskData";

export default function MainMenuPage() {
  const navigate = useNavigate();
  const { userName, userCategory } = useApp();

  return (
    <PageShell showBack backTo="/kategori" subtleBackdrop contentClassName="items-center px-5 py-6">
      <div className="mx-auto w-full max-w-xl animate-fade-in-up">
        <p className="text-xs font-semibold tracking-[0.3em] text-gemilang-yellow uppercase">
          🇲🇾 {userCategory ?? "Perbendaharaan Negeri Selangor"}
        </p>
        <h1 className="font-heading mt-2 text-2xl font-bold text-kiosk-fg sm:text-4xl">
          Selamat Datang, <span className="gold-text">{userName || "Pengguna"}</span>
        </h1>
        <p className="mt-2 text-sm text-kiosk-fg/70">
          Sila pilih perkhidmatan di bawah untuk diteruskan.
        </p>

        <div className="mt-6 flex flex-col gap-3.5">
          {MAIN_MENU.map((item) => (
            <KioskListRow
              key={item.key}
              icon={item.icon}
              label={item.label}
              description={item.description}
              onClick={() => navigate(`/${item.key}`)}
            />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
