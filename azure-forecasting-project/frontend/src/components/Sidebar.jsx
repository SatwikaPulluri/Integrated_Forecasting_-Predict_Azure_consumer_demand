import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/usagetrends", label: "Usage Trends" },
    { to: "/storage", label: "Storage" },
    { to: "/forecast", label: "Forecast" },
    { to: "/features", label: "Features" },
    { to: "/insights", label: "Insights" },
    { to: "/reports", label: "Reports" },
    { to: "/comparison", label: "Model Comparison" },
    { to: "/edavisuals", label: "EDA Visuals" },

  ];

  return (
    <aside
      style={{
        width: "250px", // A bit wider for better spacing
        background: "#161b22", // A darker solid color
        color: "white",
        padding: "20px 15px",
        boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
      }}
    >
      <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", padding: "10px 0", borderBottom: "1px solid #333", marginBottom: "15px" }}>
        Azure Analytics
      </h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {links.map(({ to, label }) => (
          <li key={to} style={{ marginBottom: "8px" }}>
            <NavLink
              to={to}
              style={({ isActive }) => ({
                display: "block",
                padding: "10px 15px",
                textDecoration: "none",
                color: isActive ? "#93c5fd" : "#a1a1aa", // Lighter blue for active, light gray for inactive
                background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                borderRadius: "8px",
                fontWeight: isActive ? "bold" : "normal",
                transition: "background 0.2s, color 0.2s",
                "&:hover": {
                  background: "rgba(255,255,255,0.05)",
                  color: "#e4e4e7"
                },
              })}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}