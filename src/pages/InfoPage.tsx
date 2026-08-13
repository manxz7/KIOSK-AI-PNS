import ServiceListPage from "../components/layout/ServiceListPage";
import { INFO_ITEMS } from "../data/kioskData";

export default function InfoPage() {
  return (
    <ServiceListPage
      title="Info"
      subtitle="Maklumat & pengumuman terkini"
      backTo="/menu"
      items={INFO_ITEMS}
    />
  );
}
