import { useState, type FormEvent } from "react";
import Modal from "./Modal";
import Button from "./Button";
import Icon from "./Icon";
import { useApp } from "../../context/AppContext";

interface NameInputModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

export default function NameInputModal({ open, onClose, onSubmit }: NameInputModalProps) {
  const { userCategory, userName } = useApp();
  const [value, setValue] = useState(userName);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim()) {
      setError("Sila masukkan nama penuh anda.");
      return;
    }
    onSubmit(value.trim());
  }

  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate className="text-center">
        {userCategory && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-royal/10 px-3 py-1 text-xs font-semibold text-royal">
            <Icon name="check_circle" className="text-base" />
            {userCategory}
          </span>
        )}

        <h2 className="font-heading mt-4 text-xl font-extrabold text-ink md:text-2xl">
          Selamat Datang
        </h2>
        <p className="mt-1.5 text-sm text-kiosk-muted-fg">
          Sila masukkan nama anda untuk teruskan
        </p>

        <div className="mt-6 text-left">
          <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-ink">
            Nama Penuh
          </label>
          <div className="relative">
            <Icon name="person" className="absolute left-4 top-1/2 -translate-y-1/2 text-royal" />
            <input
              id="fullName"
              type="text"
              autoFocus
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                if (error) setError("");
              }}
              placeholder="Contoh: Ahmad bin Ali"
              className={`w-full rounded-xl border bg-white py-3.5 pl-12 pr-4 text-base text-ink shadow-sm outline-none transition-colors placeholder:text-kiosk-muted-fg ${
                error ? "border-gemilang-red" : "border-kiosk-border focus:border-royal focus:ring-2 focus:ring-royal-glow/40"
              }`}
            />
          </div>
          {error && (
            <p className="mt-2 flex items-center gap-1 text-sm font-medium text-gemilang-red">
              <Icon name="error" className="text-base" />
              {error}
            </p>
          )}
        </div>

        <Button type="submit" size="lg" variant="primary" className="mt-6 w-full" iconTrailing="arrow_forward">
          Teruskan
        </Button>
      </form>
    </Modal>
  );
}
