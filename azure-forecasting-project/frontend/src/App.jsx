import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import UsageTrends from "./pages/UsageTrends";
import Storage from "./pages/Storage";
import Forecast from "./pages/Forecast";
import Features from "./pages/Features";
import Insights from "./pages/Insights";
import Reports from "./pages/Reports";
import ModelComparison from "./pages/ModelComparison";
import EdaVisuals from "./pages/EdaVisuals";

export default function App() {
  return (
    <Router>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          background: "linear-gradient(135deg, #1f2a40 0%, #2a3b5c 100%)",
          color: "white",
          overflow: "hidden", // prevent full-page scrolling
        }}
      >
        <Header />

        {/* Layout Container */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* Sidebar stays fixed */}
          <div
            style={{
              width: "250px",
  flexShrink: 0,
  height: "calc(100vh - 60px)", // full height minus header
  position: "sticky", // keeps sidebar fixed
  top: "-60px", // right below header
  overflow: "hidden", // no scroll
  background: "rgba(255,255,255,0.05)",
  borderRight: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Sidebar />
          </div>

          {/* Scrollable Main Content */}
          <main
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px",
              height: "calc(100vh - 60px)", // fill below header
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/usagetrends" element={<UsageTrends />} />
              <Route path="/storage" element={<Storage />} />
              <Route path="/forecast" element={<Forecast />} />
              <Route path="/features" element={<Features />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/comparison" element={<ModelComparison />} />
              <Route path="/edavisuals" element={<EdaVisuals />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
