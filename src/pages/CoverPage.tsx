import { useNavigate } from "react-router-dom";
import PageShell from "../components/layout/PageShell";
import Robot3D from "../components/ui/Robot3D";
import Button from "../components/ui/Button";
import { useApp } from "../context/AppContext";

export default function CoverPage() {
  const navigate = useNavigate();
  const { reset } = useApp();

  function start() {
    reset();
    navigate("/kategori");
  }

  return (
    <PageShell contentClassName="items-center justify-center px-6 py-10 text-center">
      <div className="flex max-w-2xl flex-col items-center gap-2 animate-fade-in-up">
        <span className="glass-panel rounded-full px-5 py-2 text-xs font-semibold tracking-[0.3em] text-kiosk-fg uppercase">
          🇲🇾 Perbendaharaan Negeri Selangor
        </span>

        <div className="glass-panel h-64 w-64 overflow-hidden rounded-[2.5rem] sm:h-80 sm:w-80">
          <Robot3D className="h-full w-full" />
        </div>

        <h1 className="font-heading mt-4 max-w-xl text-3xl font-bold leading-tight text-kiosk-fg sm:text-5xl">
          Pembantu Digital <span className="gold-text">Kerajaan</span> Anda
        </h1>
        <p className="mt-3 max-w-md text-base text-kiosk-fg/70">
          Sentuh skrin atau bercakap untuk urusan cukai, gaji, pinjaman dan aduan — 24 jam,
          dalam empat bahasa.
        </p>

        <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Button size="xl" variant="cta" icon="arrow_forward" onClick={start}>
            🇲🇾 Mula
          </Button>
          <Button size="xl" variant="secondary" icon="mic" onClick={start}>
            Bercakap
          </Button>
        </div>

        <p className="mt-6 text-xs tracking-widest text-kiosk-fg/50 uppercase">
          Tekan Mula untuk bermula
        </p>
      </div>
    </PageShell>
  );
}
