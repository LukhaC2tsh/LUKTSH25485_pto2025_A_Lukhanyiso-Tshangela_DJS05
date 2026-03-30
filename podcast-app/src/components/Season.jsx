import { useState } from "react";

/**
 * Season component
 * Displays season info and allows expand/collapse of episodes.
 */
export default function Season({ season }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "0.75rem",
          borderRadius: "10px",
          border: "1px solid #ddd",
          background: "#fff",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Season {season.number} ({season.episodes.length} episodes)
      </button>

      {open && (
        <div style={{ padding: "1rem" }}>
          {season.image && (
            <img
              src={season.image}
              alt={`Season ${season.number}`}
              style={{
                width: "120px",
                borderRadius: "10px",
                marginBottom: "1rem"
              }}
            />
          )}

          {season.episodes.map((ep, index) => (
            <div
              key={ep.id}
              style={{
                marginBottom: "1rem",
                paddingBottom: "0.5rem",
                borderBottom: "1px solid #eee"
              }}
            >
              <p style={{ margin: 0, fontWeight: "bold" }}>
                {index + 1}. {ep.title}
              </p>

              <p style={{ margin: "0.25rem 0", color: "#555" }}>
                {ep.description.slice(0, 120)}...
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}