import { useNavigate } from "react-router-dom";
import logoPns from "../../assets/logo-pns.png";

export default function Logo() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="glass-panel flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4 text-sm font-semibold text-kiosk-fg cursor-pointer"
    >
      <img
        src={logoPns}
        alt="Logo Perbendaharaan Negeri Selangor"
        className="h-8 w-8 shrink-0 rounded-full object-contain"
      />
      <span className="hidden sm:inline">Perbendaharaan Negeri Selangor</span>
      <span className="sm:hidden">PNS</span>
    </button>
  );
}
