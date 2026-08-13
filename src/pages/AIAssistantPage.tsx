import { useEffect, useRef, useState, type FormEvent } from "react";
import PageShell from "../components/layout/PageShell";
import AIRobot from "../components/ui/AIRobot";
import Icon from "../components/ui/Icon";
import { useApp } from "../context/AppContext";
import { DUMMY_AI_RESPONSES, FAQ_QUESTIONS } from "../data/kioskData";

interface ChatMessage {
  id: number;
  role: "user" | "ai";
  text: string;
}

export default function AIAssistantPage() {
  const { activeTopic, userName } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      role: "ai",
      text: `Saya boleh membantu anda dengan urusan kerajaan${
        activeTopic ? ` berkaitan "${activeTopic}"` : ""
      }. Apa yang boleh saya bantu hari ini${userName ? `, ${userName}` : ""}?`,
    },
  ]);
  const [input, setInput] = useState("");
  const responseIndex = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((m) => [...m, { id: Date.now(), role: "user", text: trimmed }]);
    setInput("");

    const reply = DUMMY_AI_RESPONSES[responseIndex.current % DUMMY_AI_RESPONSES.length];
    responseIndex.current += 1;

    setTimeout(() => {
      setMessages((m) => [...m, { id: Date.now() + 1, role: "ai", text: reply }]);
    }, 550);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  const faqList = FAQ_QUESTIONS.default;

  return (
    <PageShell showBack backTo="/menu" subtleBackdrop contentClassName="items-center px-5 py-6">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
        <div className="flex flex-col items-center text-center">
          <AIRobot size="sm" />
          <h1 className="font-heading mt-4 text-2xl font-bold text-kiosk-fg sm:text-3xl">
            Bagaimana saya boleh <span className="gold-text">membantu?</span>
          </h1>
          {activeTopic && (
            <span className="glass-panel mt-3 rounded-full px-4 py-1.5 text-xs font-semibold text-kiosk-fg">
              {activeTopic}
            </span>
          )}
        </div>

        <div ref={scrollRef} className="mt-8 flex-1 space-y-3 overflow-y-auto">
          {messages.map((m) =>
            m.role === "ai" ? (
              <div key={m.id} className="flex max-w-[85%] items-start gap-3">
                <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gemilang-yellow/60 bg-royal text-kiosk-fg">
                  🤖
                </span>
                <p className="rounded-3xl rounded-tl-md border border-gemilang-yellow/30 bg-royal px-5 py-3 text-sm text-kiosk-fg shadow-lg">
                  {m.text}
                </p>
              </div>
            ) : (
              <div key={m.id} className="flex justify-end">
                <p className="max-w-[85%] rounded-3xl rounded-tr-md border-r-4 border-gemilang-red bg-kiosk-card px-5 py-3 text-sm text-ink shadow-lg">
                  {m.text}
                </p>
              </div>
            ),
          )}
        </div>

        <div className="mt-6">
          <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-gemilang-yellow uppercase">
            Soalan Popular
          </p>
          <div className="flex flex-wrap gap-2">
            {faqList.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="glass-panel rounded-full px-4 py-2 text-sm font-medium text-kiosk-fg transition hover:scale-105 cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-kiosk-card mt-5 mb-2 flex items-center gap-2 rounded-full p-2 shadow-xl"
        >
          <button
            type="button"
            aria-label="Input suara"
            className="bg-kiosk-muted text-royal grid h-11 w-11 shrink-0 place-items-center rounded-full cursor-pointer"
          >
            <Icon name="mic" />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Taip soalan anda..."
            className="min-w-0 flex-1 bg-transparent px-2 text-sm text-ink outline-none placeholder:text-kiosk-muted-fg"
          />
          <button
            type="submit"
            aria-label="Hantar"
            disabled={!input.trim()}
            className="bg-gradient-red text-kiosk-fg grid h-11 w-11 shrink-0 place-items-center rounded-full disabled:opacity-40 cursor-pointer"
          >
            <Icon name="send" filled />
          </button>
        </form>
      </div>
    </PageShell>
  );
}
