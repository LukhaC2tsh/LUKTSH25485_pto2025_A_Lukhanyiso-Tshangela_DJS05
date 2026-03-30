import { useEffect, useState, useContext } from "react";
import { PodcastContext } from "../context/PodcastContext";
import styles from "./SearchBar.module.css";

/**
 * Debounced search input for filtering podcasts.
 */
export default function SearchBar() {
  const { search, setSearch } = useContext(PodcastContext);
  const [value, setValue] = useState(search);

  useEffect(() => {
    setValue(search);
  }, [search]);

  useEffect(() => {
    const id = setTimeout(() => setSearch(value), 300);
    return () => clearTimeout(id);
  }, [value, setSearch]);

  return (
    <input
      type="search"
      placeholder="Search podcasts…"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={styles.searchInput}
    />
  );
}