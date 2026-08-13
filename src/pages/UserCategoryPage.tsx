import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../components/layout/PageShell";
import CardCarousel from "../components/ui/CardCarousel";
import NameInputModal from "../components/ui/NameInputModal";
import { useApp } from "../context/AppContext";
import { USER_CATEGORIES } from "../data/kioskData";
import type { UserCategory } from "../context/AppContext";

export default function UserCategoryPage() {
  const navigate = useNavigate();
  const { setUserCategory, setUserName } = useApp();
  const [modalOpen, setModalOpen] = useState(false);

  function handleSelect(category: UserCategory) {
    setUserCategory(category);
    setModalOpen(true);
  }

  function handleNameSubmit(name: string) {
    setUserName(name);
    setModalOpen(false);
    navigate("/menu");
  }

  return (
    <PageShell
      showBack
      backTo="/"
      subtleBackdrop
      fitScreen
      contentClassName="items-center justify-center px-4 text-center"
    >
      <div className="flex w-full max-w-4xl flex-col items-center animate-fade-in-up">
        <p className="text-xs font-semibold tracking-[0.3em] text-gemilang-yellow uppercase">
          🇲🇾 Langkah 1
        </p>
        <h1 className="font-heading mt-3 text-2xl font-bold text-kiosk-fg sm:text-4xl">
          Sila Pilih Kategori Pengguna
        </h1>
        <p className="mt-2 max-w-md text-sm text-kiosk-fg/70">
          Pilihan ini membantu kami menyediakan perkhidmatan yang lebih tepat untuk anda.
        </p>

        <div className="mt-4 w-full">
          <CardCarousel
            items={USER_CATEGORIES.map((cat) => ({
              key: cat.key,
              icon: cat.icon,
              label: cat.label,
              description: cat.description,
              onClick: () => handleSelect(cat.key as UserCategory),
            }))}
          />
        </div>

        <p className="mt-2 flex items-center gap-2 text-xs text-kiosk-fg/50">
          <span className="material-symbols-rounded text-base">swipe</span>
          Leret ke kiri / kanan untuk lihat pilihan lain
        </p>
      </div>

      <NameInputModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleNameSubmit}
      />
    </PageShell>
  );
}
