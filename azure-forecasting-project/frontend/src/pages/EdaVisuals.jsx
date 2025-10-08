import React from "react";

export default function EdaVisuals() {
  const plots = [
    { name: "Feature Correlation Heatmap", file: "heatmap_correlation.png" },
    { name: "CPU Usage Trend", file: "cpu_usage_trend.png" },
    { name: "CPU Usage by Day of Week", file: "boxplot_dayofweek.png" },
    { name: "30-Day Rolling Average", file: "rolling_avg.png" },
    { name: "CPU Usage Distribution", file: "cpu_usage_histogram.png" },
  ];

  const cardStyle = {
    background: "rgba(255,255,255,0.05)",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255,255,255,0.1)",
    marginBottom: "20px",
    textAlign: "center",
  };

  const titleStyle = {
    fontSize: "1.25rem",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const imageStyle = {
    width: "100%",
    maxWidth: "800px",
    borderRadius: "10px",
    marginBottom: "10px",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "20px" }}>
        📊 EDA Visual Insights
      </h2>

      {plots.map((plot, i) => (
        <div key={i} style={cardStyle}>
          <h3 style={titleStyle}>{plot.name}</h3>
          <img
            src={`http://localhost:5000/api/plots/${plot.file}`}
            alt={plot.name}
            style={imageStyle}
          />
        </div>
      ))}
    </div>
  );
}
