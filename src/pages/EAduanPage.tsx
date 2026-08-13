import { useState, type FormEvent } from "react";
import PageShell from "../components/layout/PageShell";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";

interface FormData {
  nama: string;
  emel: string;
  subjek: string;
  mesej: string;
}

const EMPTY: FormData = { nama: "", emel: "", subjek: "", mesej: "" };

const CONTACT_ITEMS = [
  {
    icon: "location_on",
    label: "Alamat",
    value:
      "Tingkat 2, 8–12, Bangunan Sultan Salahuddin Abdul Aziz Shah, 40592 Shah Alam, Selangor, Malaysia",
  },
  { icon: "mail", label: "E-mel", value: "pwn@selangor.gov.my" },
  { icon: "call", label: "Telefon", value: "03-5544 7000" },
  { icon: "print", label: "Faks", value: "03-5521 2533" },
];

export default function EAduanPage() {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(data: FormData) {
    const next: Partial<FormData> = {};
    if (!data.nama.trim()) next.nama = "Nama diperlukan.";
    if (!data.emel.trim()) next.emel = "E-mel diperlukan.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.emel)) next.emel = "Format e-mel tidak sah.";
    if (!data.subjek.trim()) next.subjek = "Subjek diperlukan.";
    if (!data.mesej.trim()) next.mesej = "Mesej diperlukan.";
    return next;
  }

  function handleChange(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
    if (submitted) setSubmitted(false);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate(form);
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSubmitted(true);
    }
  }

  function handleReset() {
    setForm(EMPTY);
    setErrors({});
    setSubmitted(false);
  }

  const fieldClass = (hasError?: string) =>
    `mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-kiosk-muted-fg ${
      hasError
        ? "border-gemilang-red"
        : "border-kiosk-border focus:border-royal focus:ring-2 focus:ring-royal-glow/40"
    }`;

  return (
    <PageShell showBack backTo="/menu" subtleBackdrop contentClassName="items-center px-6 py-10">
      <div className="mx-auto w-full max-w-5xl animate-fade-in-up pb-10">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-gemilang-yellow uppercase">
            🇲🇾 eAduan
          </p>
          <h1 className="font-heading mt-2 text-3xl font-bold text-kiosk-fg sm:text-4xl">
            Perbendaharaan Negeri Selangor
          </h1>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <aside className="kiosk-card min-w-0 overflow-hidden rounded-3xl">
            <div className="flex h-2">
              <span className="flex-1 bg-royal" />
              <span className="flex-1 bg-kiosk-card" />
              <span className="flex-1 bg-gemilang-red" />
              <span className="flex-1 bg-gemilang-yellow" />
            </div>
            <div className="space-y-5 p-7">
              <h2 className="font-heading text-lg font-bold text-ink">
                Perbendaharaan Negeri Selangor
              </h2>
              {CONTACT_ITEMS.map((c) => (
                <p key={c.label} className="flex items-start gap-3 text-sm text-kiosk-muted-fg">
                  <Icon name={c.icon} className="mt-0.5 shrink-0 text-royal" />
                  <span className="min-w-0 flex-1 break-words">{c.value}</span>
                </p>
              ))}
              <div className="jalur-stripe h-1.5 w-full rounded-full opacity-70" />
              <p className="text-xs text-kiosk-muted-fg">
                Waktu operasi: Isnin – Jumaat, 8.00 pagi – 5.00 petang
              </p>
            </div>
          </aside>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="kiosk-card min-w-0 space-y-4 rounded-3xl p-7"
          >
            <h2 className="font-heading text-lg font-bold text-ink">Borang Aduan</h2>

            {submitted && (
              <div className="flex items-center gap-2 rounded-xl bg-royal/10 px-4 py-3 text-sm font-medium text-royal-deep">
                <Icon name="check_circle" className="text-lg text-royal" />
                Terima kasih! Aduan demo anda telah "dihantar" (tiada data disimpan).
              </div>
            )}

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-kiosk-muted-fg">
                Nama Penuh *
              </span>
              <input
                value={form.nama}
                onChange={(e) => handleChange("nama", e.target.value)}
                placeholder="Nama penuh anda"
                className={fieldClass(errors.nama)}
              />
              {errors.nama && (
                <p className="mt-1 text-xs font-medium text-gemilang-red">{errors.nama}</p>
              )}
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-kiosk-muted-fg">
                E-mel *
              </span>
              <input
                type="email"
                value={form.emel}
                onChange={(e) => handleChange("emel", e.target.value)}
                placeholder="nama@contoh.com"
                className={fieldClass(errors.emel)}
              />
              {errors.emel && (
                <p className="mt-1 text-xs font-medium text-gemilang-red">{errors.emel}</p>
              )}
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-kiosk-muted-fg">
                Subjek *
              </span>
              <input
                value={form.subjek}
                onChange={(e) => handleChange("subjek", e.target.value)}
                placeholder="Subjek aduan"
                className={fieldClass(errors.subjek)}
              />
              {errors.subjek && (
                <p className="mt-1 text-xs font-medium text-gemilang-red">{errors.subjek}</p>
              )}
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-kiosk-muted-fg">
                Butiran Aduan *
              </span>
              <textarea
                value={form.mesej}
                onChange={(e) => handleChange("mesej", e.target.value)}
                placeholder="Nyatakan aduan anda dengan jelas..."
                rows={5}
                className={`${fieldClass(errors.mesej)} resize-none`}
              />
              {errors.mesej && (
                <p className="mt-1 text-xs font-medium text-gemilang-red">{errors.mesej}</p>
              )}
            </label>

            <div className="flex gap-3 pt-2">
              <Button type="submit" variant="cta" size="lg" icon="send" className="flex-1">
                Hantar Aduan
              </Button>
              <Button type="button" variant="secondary" size="lg" icon="refresh" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageShell>
  );
}
