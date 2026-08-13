import ServiceListPage from "../components/layout/ServiceListPage";
import { SEMAKAN_ITEMS } from "../data/kioskData";

export default function SemakanPage() {
  return (
    <ServiceListPage
      title="Semakan"
      subtitle="Pilih semakan yang anda perlukan"
      backTo="/menu"
      items={SEMAKAN_ITEMS}
    />
  );
}
