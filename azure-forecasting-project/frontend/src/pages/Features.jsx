import { useEffect, useState } from "react";

export default function Features() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("http://localhost:5000/api/features")
      .then(res => res.json())
      .then(json => {
        console.log("✅ Features data:", json);
        setData(json);
        setStatus("success");
      })
      .catch(err => {
        console.error("❌ Fetch error (features):", err);
        setStatus("error");
      });
  }, []);

  if (status === "loading") return <p>Loading features...</p>;
  if (status === "error") return <p style={{ color: "red" }}>Failed to load features</p>;

  return (
    <div>
      <h2>Feature Engineered Data</h2>
      {data.length > 0 ? (
        <table border="1" cellPadding="6">
          <thead>
            <tr>
              {Object.keys(data[0]).map((col, idx) => (
                <th key={idx}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                {Object.values(row).map((val, i) => (
                  <td key={i}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data found</p>
      )}
    </div>
  );
}
