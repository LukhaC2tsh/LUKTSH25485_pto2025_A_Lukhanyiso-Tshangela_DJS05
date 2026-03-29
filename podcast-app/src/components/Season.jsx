import { useState } from "react";

export default function Season({ season }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <button onClick={() => setOpen(!open)}>
        Season {season.number} ({season.episodes.length} episodes)
      </button>

      {open && (
        <div style={{ paddingLeft: "1rem" }}>
          {season.episodes.map((ep, index) => (
            <div key={ep.id}>
              <p>
                {index + 1}. {ep.title}
              </p>
              <p>{ep.description.slice(0, 120)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}