import { Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/layout/ScrollToTop";
import CoverPage from "./pages/CoverPage";
import UserCategoryPage from "./pages/UserCategoryPage";
import MainMenuPage from "./pages/MainMenuPage";
import PinjamanPage from "./pages/PinjamanPage";
import PembayaranPage from "./pages/PembayaranPage";
import SemakanPage from "./pages/SemakanPage";
import InfoPage from "./pages/InfoPage";
import EAduanPage from "./pages/EAduanPage";
import AIAssistantPage from "./pages/AIAssistantPage";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<CoverPage />} />
        <Route path="/kategori" element={<UserCategoryPage />} />
        <Route path="/menu" element={<MainMenuPage />} />
        <Route path="/pinjaman" element={<PinjamanPage />} />
        <Route path="/pembayaran" element={<PembayaranPage />} />
        <Route path="/semakan" element={<SemakanPage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/eaduan" element={<EAduanPage />} />
        <Route path="/ai-assistant" element={<AIAssistantPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
