import ServiceListPage from "../components/layout/ServiceListPage";
import { PEMBAYARAN_ITEMS } from "../data/kioskData";

export default function PembayaranPage() {
  return (
    <ServiceListPage
      title="Pembayaran"
      subtitle="Pilih jenis bayaran untuk bercakap dengan AI Assistant"
      backTo="/menu"
      items={PEMBAYARAN_ITEMS}
    />
  );
}
