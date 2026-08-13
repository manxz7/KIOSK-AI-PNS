import { useEffect, type ReactNode } from "react";
import Icon from "./Icon";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="animate-fade-in-up fixed inset-0 z-50 flex items-center justify-center bg-royal-deep/60 backdrop-blur-sm p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="kiosk-card relative w-full max-w-md rounded-3xl p-7 md:p-8"
      >
        <span className="jalur-stripe absolute inset-x-0 top-0 h-1.5 rounded-t-3xl" />
        <button
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-4 top-5 flex h-9 w-9 items-center justify-center rounded-full text-kiosk-muted-fg transition-colors hover:bg-kiosk-muted hover:text-ink cursor-pointer"
        >
          <Icon name="close" />
        </button>
        {children}
      </div>
    </div>
  );
}
