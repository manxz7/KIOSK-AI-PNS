import ServiceListPage from "../components/layout/ServiceListPage";
import { PINJAMAN_ITEMS } from "../data/kioskData";

export default function PinjamanPage() {
  return (
    <ServiceListPage
      title="Pinjaman"
      subtitle="Pilih jenis pinjaman untuk bercakap dengan AI Assistant"
      backTo="/menu"
      items={PINJAMAN_ITEMS}
    />
  );
}
