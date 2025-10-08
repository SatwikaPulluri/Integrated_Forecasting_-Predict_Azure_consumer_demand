import { useEffect, useState } from "react";

export default function ModelComparison() {
  const [models, setModels] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("http://localhost:5000/api/model-comparison")
      .then((res) => res.json())
      .then((json) => {
        setModels(json);
        setStatus("success");
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
      });
  }, []);

  if (status === "loading") return <p style={{ color: "white" }}>Loading...</p>;
  if (status === "error")
    return <p style={{ color: "red" }}>Failed to load metrics</p>;

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
      <h2 style={cardTitleStyle}>📊 Model Comparison</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <thead>
          <tr style={{ background: "rgba(255,255,255,0.1)" }}>
            <th style={{ padding: "12px", textAlign: "left" }}>Model</th>
            <th style={{ padding: "12px", textAlign: "left" }}>MAE</th>
            <th style={{ padding: "12px", textAlign: "left" }}>RMSE</th>
            <th style={{ padding: "12px", textAlign: "left" }}>MAPE</th>
          </tr>
        </thead>
        <tbody>
          {models.map((m, idx) => (
            <tr
              key={idx}
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              <td style={{ padding: "12px" }}>{m.model}</td>
              <td style={{ padding: "12px" }}>
                {m.MAE ? m.MAE.toFixed(2) : "-"}
              </td>
              <td style={{ padding: "12px" }}>
                {m.RMSE ? m.RMSE.toFixed(2) : "-"}
              </td>
              <td style={{ padding: "12px" }}>
                {m.MAPE ? m.MAPE.toFixed(2) + "%" : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}