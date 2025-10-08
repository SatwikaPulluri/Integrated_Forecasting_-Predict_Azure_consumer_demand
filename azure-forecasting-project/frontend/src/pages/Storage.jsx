import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function Storage() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("http://localhost:5000/api/features")
      .then((res) => res.json())
      .then((json) => {
        const regions = ["East US", "West US", "Europe"];
        const storageSummary = regions.map((r) => ({
          region: r,
          storage: Math.floor(Math.random() * 300) + 100,
        }));
        setData(storageSummary);
        setStatus("success");
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
      });
  }, []);

  if (status === "loading") return <p style={{ color: "white" }}>Loading storage...</p>;
  if (status === "error")
    return <p style={{ color: "red" }}>Failed to load storage</p>;

  const chartData = {
    labels: data.map(d => d.region),
    datasets: [
      {
        data: data.map(d => d.storage),
        backgroundColor: ["#0c53a3ff", "#b7491dff", "#f0cd1cff"],
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "black",
          font: { size: 14 }
        }
      },
      tooltip: {
        bodyColor: "black",
        titleColor: "black",
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1) + "%";
            return `${context.label}: ${value} GB (${percentage})`;
          }
        }
      },
      datalabels: {
        color: "black",  // label color
        font: {
          weight: "bold",
          size: 14
        },
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1) + "%";
          return `${value} GB\n${percentage}`;
        }
      }
    }
  };

  const cardStyle = {
    background: "rgba(255,255,255,0.05)",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255,255,255,0.1)",
    height: "100%",
    textAlign: "center"
  };

  const cardTitleStyle = {
    fontSize: "1.25rem",
    fontWeight: "bold",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    paddingBottom: "10px",
    marginBottom: "15px"
  };

  return (
    <div style={cardStyle}>
      <h2 style={cardTitleStyle}>Storage Consumption by Region</h2>
      <div style={{ width: "360px", height: "360px", margin: "0 auto" }}>
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
