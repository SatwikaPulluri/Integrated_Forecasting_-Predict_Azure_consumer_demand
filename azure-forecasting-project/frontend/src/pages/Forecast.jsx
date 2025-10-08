import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

export default function Forecast() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("http://localhost:5000/api/forecast")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setStatus("success");
      })
      .catch((err) => {
        console.error("❌ Forecast fetch error:", err);
        setStatus("error");
      });
  }, []);

  if (status === "loading") return <p style={{ color: "white" }}>Loading forecast...</p>;
  if (status === "error")
    return <p style={{ color: "red" }}>Failed to load forecast</p>;

  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: "Forecast CPU",
        data: data.map((d) => d.forecast_cpu),
        borderColor: "#a78bfa", // Purple to match reference
        fill: false,
        tension: 0.3,
      },
    ],
  };

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.05)",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        backdropFilter: "blur(5px)",
        border: "1px solid rgba(255,255,255,0.1)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", paddingBottom: "10px", marginBottom: "15px" }}>
        CPU Forecast (Next 7 Days)
      </h2>
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
            <th style={{ padding: "10px", border: "none" }}>Forecast CPU</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <td style={{ padding: "10px", border: "none" }}>{d.date}</td>
              <td style={{ padding: "10px", border: "none" }}>{d.forecast_cpu.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}