import { formatDate } from "../utils/formatDate";
import styles from "./PodcastCard.module.css";
import { useNavigate } from "react-router-dom";

/**
 * Podcast preview card
 */
export default function PodcastCard({ podcast, genres }) {
  const navigate = useNavigate();

  const genreSpans = podcast.genres.map((id) => {
    const match = genres.find((g) => g.id === id);

    return (
      <span key={id} className={styles.tag}>
        {match ? match.title : `Unknown (${id})`}
      </span>
    );
  });

  return (
    <div
      className={styles.card}
      onClick={() => {
        if (podcast?.id) {
          navigate(`/show/${podcast.id}`);
        }
      }}
    >
      <img src={podcast.image} alt={podcast.title} />

      <h3>{podcast.title}</h3>

      <p className={styles.seasons}>
        {podcast.seasons} seasons
      </p>

      <div className={styles.tags}>{genreSpans}</div>

      <p className={styles.updatedText}>
        Updated {formatDate(podcast.updated)}
      </p>
    </div>
  );
}