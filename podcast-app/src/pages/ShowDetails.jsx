import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Season from "../components/Season";
import { formatDate } from "../utils/formatDate";
import styles from "./ShowDetails.module.css";

/**
 * ShowDetails page
 * Fetches and displays full podcast show details using route ID.
 */
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

        if (!res.ok) throw new Error("Failed to fetch show");

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

  if (loading) {
    return <p className={styles.container}>Loading show...</p>;
  }

  if (error) {
    return <p className={styles.container}>Error: {error}</p>;
  }

  if (!show) {
    return <p className={styles.container}>No show found</p>;
  }

  const genres = show.genres || [];

  return (
    <div className={styles.container}>
      <button
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h1 className={styles.title}>{show.title}</h1>

      <img
        className={styles.image}
        src={show.image}
        alt={show.title}
      />

      <p className={styles.description}>
        {show.description}
      </p>

      <p className={styles.updated}>
        <strong>Updated:</strong> {formatDate(show.updated)}
      </p>

      <div className={styles.genreTags}>
        {genres.map((g) => (
          <span key={g} className={styles.genre}>
            Genre {g}
          </span>
        ))}
      </div>

      <h2 className={styles.sectionTitle}>
        Seasons
      </h2>

      {show.seasons?.map((season) => (
        <Season key={season.id} season={season} />
      ))}
    </div>
  );
}