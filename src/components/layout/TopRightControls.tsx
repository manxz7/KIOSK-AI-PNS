import { useEffect, useRef, useState } from "react";
import Icon from "../ui/Icon";
import { LANGUAGE_LABELS, useApp, type LanguageCode } from "../../context/AppContext";

const SHORT_CODE: Record<LanguageCode, string> = {
  ms: "BM",
  en: "EN",
  zh: "中文",
  ta: "தமிழ்",
};

function LanguageMenuButton({
  icon,
  value,
  onChange,
  ariaLabel,
}: {
  icon: string;
  value: LanguageCode;
  onChange: (l: LanguageCode) => void;
  ariaLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        aria-label={ariaLabel}
        aria-pressed={open}
        onClick={() => setOpen((o) => !o)}
        className={`glass-panel flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-kiosk-fg transition cursor-pointer ${
          open ? "ring-2 ring-gemilang-yellow" : ""
        }`}
      >
        <Icon name={icon} className="text-base" />
        {SHORT_CODE[value]}
      </button>
      {open && (
        <div className="animate-fade-in-up absolute right-0 z-20 mt-2 w-52 overflow-hidden rounded-2xl border border-gemilang-yellow/40 bg-kiosk-card p-1 shadow-xl">
          {(Object.keys(LANGUAGE_LABELS) as LanguageCode[]).map((code) => (
            <button
              key={code}
              onClick={() => {
                onChange(code);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium cursor-pointer transition-colors ${
                value === code ? "bg-kiosk-muted text-royal-deep" : "text-ink hover:bg-kiosk-muted"
              }`}
            >
              <span>{LANGUAGE_LABELS[code]}</span>
              {value === code && <Icon name="check" className="text-lg text-royal" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TopRightControls() {
  const { language, setLanguage, voiceLanguage, setVoiceLanguage } = useApp();

  return (
    <div className="flex items-center gap-2">
      <LanguageMenuButton
        icon="mic"
        value={voiceLanguage}
        onChange={setVoiceLanguage}
        ariaLabel="Pilih Bahasa Suara"
      />
      <LanguageMenuButton
        icon="language"
        value={language}
        onChange={setLanguage}
        ariaLabel="Pilih Bahasa"
      />
    </div>
  );
}
