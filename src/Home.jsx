import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={styles.page}>
      <div style={styles.title}>Deutsch Trainer</div>

      <div style={styles.grid}>
        <Link to="/sprachbausteine" style={styles.link}>
          <div style={styles.tile}>
            Sprachbausteine
          </div>
        </Link>

        <Link to="/nomen-verb" style={styles.link}>
          <div style={styles.tile}>
            Nomen-Verb-Verbindungen
          </div>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f6f7fb",
    padding: "20px",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 30
  },

  title: {
    fontSize: 24,
    fontWeight: 900
  },

  grid: {
    width: "100%",
    maxWidth: 500,
    display: "grid",
    gap: 16
  },

  link: {
    textDecoration: "none",
    color: "inherit"
  },

  tile: {
    background: "white",
    borderRadius: 16,
    padding: 28,
    textAlign: "center",
    fontSize: 18,
    fontWeight: 800,
    border: "1px solid #e5e7eb",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
    cursor: "pointer"
  }
};