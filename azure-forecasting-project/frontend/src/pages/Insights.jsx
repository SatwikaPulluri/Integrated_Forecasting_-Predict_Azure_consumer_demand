import { useEffect, useState } from "react";

export default function Insights() {
  const [insights, setInsights] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("http://localhost:5000/api/insights")
      .then((res) => res.json())
      .then((json) => {
        console.log("✅ Insights data:", json); // debug
        setInsights(json);
        setStatus("success");
      })
      .catch((err) => {
        console.error("❌ Fetch error (insights):", err);
        setStatus("error");
      });
  }, []);

  if (status === "loading") return <p style={{ color: "white" }}>Loading insights...</p>;
  if (status === "error") return <p style={{ color: "red" }}>Failed to load insights</p>;

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
      <h2 style={cardTitleStyle}>Summary Insights</h2>
      {insights ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ marginBottom: "10px" }}>
            <b>Peak Usage Date:</b> {insights.peak_usage_date}
          </li>
          <li style={{ marginBottom: "10px" }}>
            <b>Average CPU Utilization:</b> {insights.avg_cpu_utilization}
          </li>
          <li style={{ marginBottom: "10px" }}>
            <b>Max CPU:</b> {insights.max_cpu}
          </li>
          <li>
            <b>Min CPU:</b> {insights.min_cpu}
          </li>
        </ul>
      ) : (
        <p>No insights available</p>
      )}
    </div>
  );
}