import { useEffect, useState } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function UsageTrends() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/usage-trends")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data.length) return <p style={{ color: "white" }}>Loading...</p>;

  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: "CPU Usage",
        data: data.map((d) => d.usage_cpu),
        borderColor: "#a78bfa", // Purple line color
        fill: false,
      },
    ],
  };

  const cardStyle = {
    background: "rgba(255,255,255,0.05)",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255,255,255,0.1)",
    height: "100%",
  };

  const cardTitleStyle = {
    fontSize: "1.25rem",
    fontWeight: "bold",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    paddingBottom: "10px",
    marginBottom: "15px",
  };

  return (
    <div style={cardStyle}>
      <h2 style={cardTitleStyle}>CPU Usage Trends</h2>
      <Line data={chartData} />

      <table
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <thead>
          <tr style={{ background: "rgba(255,255,255,0.1)" }}>
            <th style={{ padding: "10px", border: "none" }}>Date</th>
            <th style={{ padding: "10px", border: "none" }}>CPU Usage</th>
            <th style={{ padding: "10px", border: "none" }}>Bar</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 10).map((row, idx) => (
            <tr
              key={idx}
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              <td style={{ padding: "10px" }}>{row.date}</td>
              <td style={{ padding: "10px" }}>{row.usage_cpu}</td>
              <td style={{ padding: "10px" }}>
                <div
                  style={{
                    background: "#333",
                    height: "10px",
                    borderRadius: "4px",
                  }}
                >
                  <div
                    style={{
                      width: `${row.usage_cpu / 10}%`,
                      background: "#60a5fa", // Blue bar color
                      height: "100%",
                      borderRadius: "4px",
                    }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}