import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import JalurBackdrop from "../components/layout/JalurBackdrop";
import Robot3D from "../components/ui/Robot3D";
import Icon from "../components/ui/Icon";
import { useApp, type LanguageCode } from "../context/AppContext";
import { FAQ_QUESTIONS } from "../data/kioskData";

interface ChatMessage {
  id: number;
  role: "user" | "ai";
  text: string;
}

export default function AIAssistantPage() {
  const navigate = useNavigate();
  const { activeTopic, userName, language, setLanguage } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      role: "ai",
      text: `Selamat datang${activeTopic ? ` ke bahagian ${activeTopic}` : ""}. Apa yang boleh saya bantu hari ini${userName ? `, ${userName}` : ""}?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isThinking]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isThinking) return;

    setMessages((m) => [...m, { id: Date.now(), role: "user", text: trimmed }]);
    setInput("");
    setIsThinking(true);

    try {
      const lang = language === "en" ? "en" : "ms";
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: trimmed }], lang }),
      });

      const data = await response.json();
      const reply = response.ok ? data.content : data.error || "Maaf, berlaku ralat. Sila cuba lagi.";

      setMessages((m) => [...m, { id: Date.now() + 1, role: "ai", text: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          role: "ai",
          text: "Maaf, sambungan ke pelayan gagal. Sila semak internet dan cuba lagi.",
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  const faqList = FAQ_QUESTIONS.default;

  function LangPill({ code, label }: { code: LanguageCode; label: string }) {
    const active = language === code;
    return (
      <button
        onClick={() => setLanguage(code)}
        className={`rounded-full px-3 py-1.5 text-xs font-bold tracking-wide transition-all cursor-pointer ${
          active
            ? "bg-gemilang-yellow text-royal-deep shadow-glow-gold"
            : "border border-kiosk-fg/20 text-kiosk-fg/80 hover:border-gemilang-yellow/50 hover:text-gemilang-yellow"
        }`}
      >
        {label}
      </button>
    );
  }

  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden safe-area-x safe-area-top">
      <JalurBackdrop subtle />

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between gap-2 px-4 py-4 md:px-6">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate("/menu")}
            aria-label="Kembali"
            className="glass-panel flex h-10 w-10 items-center justify-center rounded-2xl text-kiosk-fg transition-colors hover:ring-2 hover:ring-gemilang-yellow cursor-pointer"
          >
            <Icon name="arrow_back" />
          </button>
          {activeTopic && (
            <span className="rounded-full border border-gemilang-yellow/40 bg-gemilang-yellow/10 px-3.5 py-1.5 text-xs font-semibold text-gemilang-yellow">
              {activeTopic}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label="Mod Paparan"
            className="glass-panel flex h-10 w-10 items-center justify-center rounded-2xl text-kiosk-fg/80 transition-colors hover:text-gemilang-yellow cursor-pointer"
          >
            <Icon name="tablet" className="text-xl" />
          </button>
          <button
            onClick={() => setSoundOn((s) => !s)}
            aria-pressed={soundOn}
            aria-label="Bunyi"
            className="glass-panel flex h-10 w-10 items-center justify-center rounded-2xl text-kiosk-fg/80 transition-colors hover:text-gemilang-yellow cursor-pointer"
          >
            <Icon name={soundOn ? "volume_up" : "volume_off"} className="text-xl" />
          </button>
          <div className="glass-panel ml-1 flex items-center gap-1.5 rounded-full p-1">
            <LangPill code="ms" label="BM" />
            <LangPill code="en" label="EN" />
          </div>
        </div>
      </header>

      {/* Status row */}
      <div className="relative z-20 flex items-center justify-center gap-2 pb-1">
        <span className="h-2 w-2 rounded-full bg-gemilang-yellow shadow-glow-gold animate-pulse" />
        <span className="text-xs font-medium tracking-wide text-kiosk-fg/60">Sedia membantu</span>
      </div>

      {/* Scrollable content: messages + robot */}
      <div ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto px-4 md:px-8">
        <div className="mx-auto flex h-full max-w-2xl flex-col">
          <div className="flex flex-col gap-3 pt-2">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`relative max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-lg ${
                    m.role === "user"
                      ? "rounded-br-sm bg-gemilang-yellow text-royal-deep"
                      : "rounded-bl-sm border border-kiosk-fg/10 bg-royal-deep/60 pr-9 text-kiosk-fg backdrop-blur"
                  }`}
                >
                  {m.text}
                  {m.role === "ai" && (
                    <Icon name="volume_up" className="absolute right-2.5 top-2.5 text-base text-gemilang-yellow/70" />
                  )}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-kiosk-fg/10 bg-royal-deep/60 px-4 py-3 backdrop-blur">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-kiosk-fg/70 [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-kiosk-fg/70 [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-kiosk-fg/70" />
                </div>
              </div>
            )}
          </div>

          <div className="h-[52vh] min-h-[360px] w-full shrink-0">
            <Robot3D className="h-full w-full" />
          </div>
        </div>
      </div>

      {/* FAQ chips */}
      <div className="relative z-20 flex gap-2.5 overflow-x-auto px-4 pb-3 md:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {faqList.map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            disabled={isThinking}
            className="glass-panel shrink-0 rounded-full px-4 py-2.5 text-sm font-medium text-kiosk-fg transition-all hover:border-gemilang-yellow/50 active:scale-[0.97] disabled:opacity-40 cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input bar */}
      <form
        onSubmit={handleSubmit}
        className="relative z-20 flex items-center gap-2 border-t border-kiosk-fg/10 bg-royal-deep/60 px-4 py-3 backdrop-blur md:px-8 md:py-4 safe-area-bottom"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Taip soalan anda..."
          disabled={isThinking}
          className="flex-1 rounded-2xl border border-kiosk-fg/15 bg-kiosk-fg/5 px-5 py-3.5 text-sm text-kiosk-fg outline-none transition-colors placeholder:text-kiosk-fg/40 focus:border-gemilang-yellow/60 disabled:opacity-60"
        />
        <button
          type="button"
          aria-label="Mikrofon"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-kiosk-fg/15 bg-kiosk-fg/5 text-kiosk-fg/80 transition-all hover:border-gemilang-yellow/50 cursor-pointer"
        >
          <Icon name="mic" />
        </button>
        <button
          type="submit"
          aria-label="Hantar"
          disabled={!input.trim() || isThinking}
          className="bg-gradient-red text-kiosk-fg flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl shadow-glow-red transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        >
          <Icon name="send" filled />
        </button>
      </form>
    </div>
  );
}
