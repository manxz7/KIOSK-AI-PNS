import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import TopRightControls from "./TopRightControls";
import JalurBackdrop from "./JalurBackdrop";
import Icon from "../ui/Icon";

interface PageShellProps {
  children: ReactNode;
  showBack?: boolean;
  backTo?: string;
  contentClassName?: string;
  subtleBackdrop?: boolean;
  /** Pin the page to exactly one viewport tall with no scroll — for touch-carousel choice screens. */
  fitScreen?: boolean;
}

export default function PageShell({
  children,
  showBack = false,
  backTo,
  contentClassName = "",
  subtleBackdrop = false,
  fitScreen = false,
}: PageShellProps) {
  const navigate = useNavigate();

  return (
    <div
      className={`relative w-full flex flex-col safe-area-x safe-area-top overflow-hidden ${
        fitScreen ? "h-dvh" : "min-h-screen"
      }`}
    >
      <JalurBackdrop subtle={subtleBackdrop} />

      <header className="relative z-20 flex shrink-0 items-center justify-between gap-3 px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => (backTo ? navigate(backTo) : navigate(-1))}
              className="glass-panel flex h-11 w-11 items-center justify-center rounded-full text-kiosk-fg transition-all cursor-pointer hover:ring-2 hover:ring-gemilang-yellow"
              aria-label="Kembali"
            >
              <Icon name="arrow_back" />
            </button>
          )}
          <Logo />
        </div>
        <TopRightControls />
      </header>
      <main
        className={`relative z-10 flex-1 flex flex-col safe-area-bottom ${fitScreen ? "min-h-0" : ""} ${contentClassName}`}
      >
        {children}
      </main>
    </div>
  );
}
