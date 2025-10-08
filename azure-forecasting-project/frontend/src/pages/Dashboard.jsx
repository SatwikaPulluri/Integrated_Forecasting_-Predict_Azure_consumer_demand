import { useEffect, useState } from "react";
import { TrendingUp, Cpu, Database, AlertTriangle, BarChart3 } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [usageData, setUsageData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [insights, setInsights] = useState({});
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/api/usage-trends").then((r) => r.json()),
      fetch("http://localhost:5000/api/forecast").then((r) => r.json()),
      fetch("http://localhost:5000/api/insights").then((r) => r.json()),
    ])
      .then(([usage, forecast, insights]) => {
        setUsageData(usage);
        setForecastData(forecast);
        setInsights(insights);
        setStatus("success");
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
      });
  }, []);

  if (status === "loading") return <p style={{ color: "white" }}>Loading dashboard...</p>;
  if (status === "error") return <p style={{ color: "red" }}>Failed to load data</p>;

  // Chart data
  const chartData = {
    labels: usageData.map((d) => d.date),
    datasets: [
      {
        label: "CPU Usage (Actual)",
        data: usageData.map((d) => d.usage_cpu),
        borderColor: "#60a5fa",
        fill: false,
      },
      {
        label: "Forecast (Next 7 Days)",
        data: forecastData.map((d) => d.forecast_cpu),
        borderColor: "#facc15",
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "#e4e4e7" } },
    },
    scales: {
      x: { ticks: { color: "#a1a1aa" } },
      y: { ticks: { color: "#a1a1aa" } },
    },
  };

  const gridContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  };

  const card = {
    background: "rgba(255,255,255,0.05)",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255,255,255,0.1)",
    textAlign: "center",
  };

  const titleStyle = {
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginBottom: "8px",
  };

  const valueStyle = {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#93c5fd",
  };

  const subLabel = {
    fontSize: "0.9rem",
    opacity: 0.7,
  };

  const chartCard = {
    ...card,
    gridColumn: "span 2",
    textAlign: "left",
  };

  return (
    <div>
      <h1 style={{ fontSize: "2rem", marginBottom: "10px", color: "#e4e4e7" }}>
        Azure Capacity Forecast Dashboard
      </h1>
      <p style={{ color: "#a1a1aa", marginBottom: "30px" }}>
        Real-time overview of usage trends, forecasts, and capacity health.
      </p>

      {/* KPI Cards */}
      <div style={gridContainer}>
        <div style={card}>
          <Cpu size={30} color="#93c5fd" />
          <h3 style={titleStyle}>Avg CPU Utilization</h3>
          <p style={valueStyle}>{insights.avg_cpu || "74"}%</p>
          <p style={subLabel}>Based on last 30 days</p>
        </div>

        <div style={card}>
          <TrendingUp size={30} color="#7dd3fc" />
          <h3 style={titleStyle}>Peak Usage</h3>
          <p style={valueStyle}>{insights.peak_date || "2025-10-01"}</p>
          <p style={subLabel}>Maximum observed CPU</p>
        </div>

        <div style={card}>
          <BarChart3 size={30} color="#fde047" />
          <h3 style={titleStyle}>Max Forecasted CPU</h3>
          <p style={valueStyle}>{Math.max(...forecastData.map((f) => f.forecast_cpu))}%</p>
          <p style={subLabel}>Predicted for next 7 days</p>
        </div>

        <div style={card}>
          <AlertTriangle size={30} color="#f87171" />
          <h3 style={titleStyle}>Status</h3>
          <p style={valueStyle}>
            {insights.recommendation || "Stable"}
          </p>
          <p style={subLabel}>System Health</p>
        </div>
      </div>

      {/* Chart Section */}
      <div style={chartCard}>
        <h3 style={titleStyle}>Usage vs Forecast</h3>
        <div style={{ height: "400px" }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Quick Links */}
      <div style={{ marginTop: "30px", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <a href="/insights" style={linkBtn}>View Detailed Insights</a>
        <a href="/forecast" style={linkBtn}>View Forecast Details</a>
        <a href="/comparison" style={linkBtn}>Model Comparison</a>
        <a href="/edavisuals" style={linkBtn}>EDA Visuals</a>
        <a href="/reports" style={linkBtn}>Reports & Exports</a>
      </div>
    </div>
  );
}

// Shared button style
const linkBtn = {
  background: "#3b82f6",
  color: "white",
  padding: "10px 20px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "600",
  transition: "background 0.3s ease",
};
