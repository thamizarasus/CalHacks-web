import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ScanProvider } from "./context/ScanContext";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import FeaturesPage from "./components/FeaturesPage";
import ScanningPage from "./components/ScanningPage";
import ResultsPage from "./components/ResultsPage";
import About from "./pages/About";

export default function App() {
  return (
    <ScanProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/scanning" element={<ScanningPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </ScanProvider>
  );
}
