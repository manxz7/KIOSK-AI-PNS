import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type UserCategory = "Awam" | "Kakitangan Kerajaan" | "Kontraktor";

export type LanguageCode = "en" | "ms" | "zh" | "ta";

export const LANGUAGE_LABELS: Record<LanguageCode, string> = {
  en: "English",
  ms: "Bahasa Melayu",
  zh: "Mandarin",
  ta: "Tamil",
};

interface AppState {
  userCategory: UserCategory | null;
  setUserCategory: (c: UserCategory) => void;
  userName: string;
  setUserName: (n: string) => void;
  language: LanguageCode;
  setLanguage: (l: LanguageCode) => void;
  voiceLanguage: LanguageCode;
  setVoiceLanguage: (l: LanguageCode) => void;
  activeTopic: string | null;
  setActiveTopic: (t: string | null) => void;
  reset: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [userCategory, setUserCategory] = useState<UserCategory | null>(null);
  const [userName, setUserName] = useState("");
  const [language, setLanguage] = useState<LanguageCode>("ms");
  const [voiceLanguage, setVoiceLanguage] = useState<LanguageCode>("ms");
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const reset = () => {
    setUserCategory(null);
    setUserName("");
    setActiveTopic(null);
  };

  const value = useMemo(
    () => ({
      userCategory,
      setUserCategory,
      userName,
      setUserName,
      language,
      setLanguage,
      voiceLanguage,
      setVoiceLanguage,
      activeTopic,
      setActiveTopic,
      reset,
    }),
    [userCategory, userName, language, voiceLanguage, activeTopic],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
