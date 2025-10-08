import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

// ✅ Import and register Chart.js modules
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Charts() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    console.log("📡 Fetching API once...");
    fetch("http://localhost:5000/api/usage-trends")
      .then((res) => {
        if (!res.ok) throw new Error("Network error: " + res.status);
        return res.json();
      })
      .then((json) => {
        console.log("✅ API Response:", json);
        setData(json);
        setStatus("success");
      })
      .catch((err) => {
        console.error("❌ Fetch error:", err);
        setStatus("error");
      });
  }, []);

  if (status === "loading") return <p>Loading chart...</p>;
  if (status === "error") return <p style={{ color: "red" }}>Failed to load data</p>;
  if (!data || data.length === 0) return <p>No data available</p>;

  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: "CPU Usage",
        data: data.map((d) => d.usage_cpu),
        borderColor: "blue",
        borderWidth: 2,
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div style={{ width: "80%", margin: "20px auto" }}>
      <h2 className="text-xl font-bold mb-4">Usage Trends</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}
