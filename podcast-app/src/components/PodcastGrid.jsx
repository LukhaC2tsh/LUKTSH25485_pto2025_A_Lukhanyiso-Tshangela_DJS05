import { useContext } from "react";
import { PodcastContext } from "../context/PodcastContext";
import PodcastCard from "./PodcastCard";
import styles from "./PodcastGrid.module.css";

/**
 * Displays podcast cards in a responsive grid layout.
 *
 * @param {Object} props
 * @param {{id:number,name?:string,title?:string}[]} props.genres
 */
export default function PodcastGrid({ genres }) {
  const { podcasts } = useContext(PodcastContext);

  if (!podcasts.length) {
    return (
      <p className={styles.noResults}>
        No podcasts match your search or filters.
      </p>
    );
  }

  return (
    <div className={styles.grid}>
      {podcasts.map((podcast) => (
        <PodcastCard
          key={podcast.id}
          podcast={podcast}
          genres={genres}
        />
      ))}
    </div>
  );
}