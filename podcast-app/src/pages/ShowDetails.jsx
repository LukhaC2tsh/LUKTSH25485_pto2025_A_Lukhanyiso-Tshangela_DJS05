import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import Season from "../components/Season";

const GENRES = {
  1: "Personal Growth",
  2: "Investigative Journalism",
  3: "History",
  4: "Comedy",
  5: "Entertainment",
  6: "Business",
  7: "Fiction",
  8: "News",
  9: "Kids and Family",
};

export default function ShowDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchShow() {
      try {
        setLoading(true);

        const res = await fetch(
          `https://podcast-api.netlify.app/id/${id}`
        );

        if (!res.ok) throw new Error("Failed to load show");

        const data = await res.json();
        setShow(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchShow();
  }, [id]);

  // Loading state
  if (loading)
    return (
      <div style={{ padding: "2rem" }}>
        <p>Loading show details...</p>
      </div>
    );

  // Error state
  if (error)
    return (
      <div style={{ padding: "2rem", color: "red" }}>
        <p>Something went wrong: {error}</p>
      </div>
    );

  // Empty state
  if (!show)
    return (
      <div style={{ padding: "2rem" }}>
        <p>Show not found.</p>
      </div>
    );

  return (
    <div style={{ padding: "1rem" }}>
      {/* Back button */}
      <button onClick={() => navigate("/")}>← Back</button>

      {/* Title */}
      <h1>{show.title}</h1>

      {/* Image */}
      <img
        src={show.image}
        alt={show.title}
        style={{ width: "100%", maxWidth: "400px" }}
      />

      {/* Description */}
      <p>{show.description}</p>

      {/* Last updated */}
      <p>
        Last updated: {formatDate(show.updated)}
      </p>

      {/* Genres */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {show.genres.map((g) => (
          <span
            key={g}
            style={{
              background: "#eee",
              padding: "0.3rem 0.6rem",
              borderRadius: "6px",
              fontSize: "0.8rem",
            }}
          >
            {GENRES[g] || "Unknown"}
          </span>
        ))}
      </div>

      {/* Seasons */}
      <h2 style={{ marginTop: "2rem" }}>Seasons</h2>

      {show.seasons?.map((season) => (
        <Season key={season.id} season={season} />
      ))}
    </div>
  );
}