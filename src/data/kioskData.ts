export interface MenuItem {
  key: string;
  label: string;
  icon: string;
  description?: string;
}

export const USER_CATEGORIES = [
  { key: "Awam", label: "Awam", icon: "groups", description: "Orang ramai / pelanggan" },
  {
    key: "Kakitangan Kerajaan",
    label: "Kakitangan Kerajaan",
    icon: "badge",
    description: "Penjawat awam negeri / persekutuan",
  },
  { key: "Kontraktor", label: "Kontraktor", icon: "engineering", description: "Kontraktor & pembekal" },
] as const;

export const MAIN_MENU: MenuItem[] = [
  { key: "pinjaman", label: "Pinjaman", icon: "payments", description: "Kalkulator & permohonan pinjaman" },
  { key: "pembayaran", label: "Pembayaran", icon: "credit_card", description: "Cukai & bayaran hasil negeri" },
  { key: "semakan", label: "Semakan", icon: "fact_check", description: "Semak gaji & status bayaran" },
  { key: "info", label: "Info", icon: "info", description: "Maklumat & pengumuman" },
  { key: "eaduan", label: "eAduan", icon: "campaign", description: "Hubungi & sampaikan aduan" },
];

export const PINJAMAN_ITEMS: MenuItem[] = [
  { key: "kalkulator", label: "Kalkulator", icon: "calculate", description: "Kira anggaran ansuran pinjaman" },
  { key: "komputer", label: "Komputer", icon: "computer", description: "Pinjaman peralatan komputer" },
  { key: "kenderaan", label: "Kenderaan", icon: "directions_car", description: "Pinjaman kenderaan" },
  { key: "perumahan", label: "Perumahan", icon: "home", description: "Pinjaman perumahan" },
];

export const PEMBAYARAN_ITEMS: MenuItem[] = [
  { key: "cukai-tanah", label: "Cukai Tanah", icon: "landscape", description: "Bayaran cukai tanah" },
  { key: "cukai-hiburan", label: "Cukai Hiburan", icon: "celebration", description: "Bayaran cukai hiburan" },
  { key: "cukai-pintu", label: "Cukai Pintu", icon: "door_front", description: "Bayaran cukai pintu" },
  {
    key: "fi-kelestarian",
    label: "FI Kelestarian Negeri Selangor",
    icon: "eco",
    description: "Fi kelestarian negeri",
  },
  {
    key: "pbh",
    label: "Permohonan Pulang Balik Hasil (PBH)",
    icon: "receipt_long",
    description: "Permohonan bayaran balik hasil",
  },
];

export const SEMAKAN_ITEMS: MenuItem[] = [
  { key: "gaji", label: "Gaji", icon: "account_balance_wallet", description: "Semakan slip & rekod gaji" },
  { key: "status-pembayaran", label: "Status Pembayaran", icon: "pending_actions", description: "Semak status bayaran" },
];

export const INFO_ITEMS: MenuItem[] = [
  { key: "maklumat-1", label: "Maklumat 1", icon: "article", description: "Placeholder maklumat" },
  { key: "maklumat-2", label: "Maklumat 2", icon: "description", description: "Placeholder maklumat" },
];

export const FAQ_QUESTIONS: Record<string, string[]> = {
  pinjaman: [
    "Bagaimana cara memohon pinjaman?",
    "Apakah syarat kelayakan pinjaman?",
    "Berapa lama tempoh kelulusan pinjaman?",
  ],
  pembayaran: [
    "Bagaimana cara membayar cukai tanah?",
    "Adakah terdapat penalti bayaran lewat?",
    "Bolehkah saya bayar secara online?",
  ],
  semakan: [
    "Bagaimana cara semak slip gaji saya?",
    "Bagaimana cara semak status pembayaran?",
    "Kenapa status pembayaran saya tertangguh?",
  ],
  info: ["Apakah waktu operasi kaunter?", "Di mana lokasi pejabat PNS?", "Apakah perkhidmatan yang disediakan?"],
  eaduan: [
    "Bagaimana cara menghantar aduan?",
    "Berapa lama tempoh maklum balas aduan?",
    "Bolehkah saya semak status aduan saya?",
  ],
  default: [
    "Bagaimana cara memohon pinjaman?",
    "Bagaimana cara bayar cukai tanah?",
    "Semak gaji saya",
    "Bagaimana cara hantar aduan?",
  ],
};

export const DUMMY_AI_RESPONSES: string[] = [
  "Terima kasih atas pertanyaan anda. Ini adalah respons contoh sahaja — sistem AI sebenar akan disambungkan kemudian.",
  "Baik, saya sedang menyemak maklumat berkaitan permintaan anda. Ini adalah paparan demo tanpa data sebenar.",
  "Perkhidmatan ini masih dalam fasa pembangunan antaramuka. Sila hubungi kaunter untuk maklumat rasmi.",
  "Untuk maklumat lanjut, sila lengkapkan borang di kaunter perkhidmatan atau hubungi talian rasmi PNS.",
];
