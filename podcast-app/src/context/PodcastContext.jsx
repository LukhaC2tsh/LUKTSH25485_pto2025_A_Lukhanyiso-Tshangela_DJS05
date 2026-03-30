import React, { createContext, useEffect, useMemo, useState } from "react";

export const PodcastContext = createContext();

/**
 * Sort options for podcast list.
 */
export const SORT_OPTIONS = [
  { key: "date-desc", label: "Newest first" },
  { key: "date-asc", label: "Oldest first" }
];

/**
 * PodcastProvider handles:
 * - fetching podcast data
 * - search filtering
 * - genre filtering
 * - sorting
 * - pagination
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function PodcastProvider({ children }) {
  const [podcasts, setPodcasts] = useState([]);

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("date-desc");
  const [genre, setGenre] = useState("all");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const calculatePageSize = () => {
      const width = window.innerWidth;
      const columns = Math.max(1, Math.floor(width / 260));
      setPageSize(width <= 1024 ? 10 : columns * 2);
    };

    calculatePageSize();
    window.addEventListener("resize", calculatePageSize);

    return () =>
      window.removeEventListener("resize", calculatePageSize);
  }, []);

  useEffect(() => {
    async function fetchPodcasts() {
      try {
        setLoading(true);

        const res = await fetch(
          "https://podcast-api.netlify.app/shows"
        );

        if (!res.ok) throw new Error("Failed to fetch podcasts");

        const data = await res.json();
        setPodcasts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPodcasts();
  }, []);

  const filtered = useMemo(() => {
    let data = [...podcasts];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter((p) =>
        p.title?.toLowerCase().includes(q)
      );
    }

    if (genre !== "all") {
      data = data.filter((p) =>
        p.genres?.includes(Number(genre))
      );
    }

    if (sortKey === "date-desc") {
      data = [...data].sort(
        (a, b) => new Date(b.updated) - new Date(a.updated)
      );
    }

    if (sortKey === "date-asc") {
      data = [...data].sort(
        (a, b) => new Date(a.updated) - new Date(b.updated)
      );
    }

    return data;
  }, [podcasts, search, genre, sortKey]);

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / pageSize)
  );

  const currentPage = Math.min(page, totalPages);

  const paged = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [totalPages]);

  useEffect(() => {
    setPage(1);
  }, [search, sortKey, genre]);

  return (
    <PodcastContext.Provider
      value={{
        podcasts: paged,
        allPodcastsCount: filtered.length,

        search,
        setSearch,

        sortKey,
        setSortKey,

        genre,
        setGenre,

        page: currentPage,
        setPage,

        totalPages,

        loading,
        error,

        setPodcasts
      }}
    >
      {children}
    </PodcastContext.Provider>
  );
}