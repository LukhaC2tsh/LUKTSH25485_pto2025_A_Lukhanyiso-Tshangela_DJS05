import SearchBar from "../components/SearchBar";
import SortSelect from "../components/SortSelect";
import GenreFilter from "../components/GenreFilter";
import PodcastGrid from "../components/PodcastGrid";
import Pagination from "../components/Pagination";

// Centralized genres (NO duplication)
const GENRES = [
  { id: 1, title: "Personal Growth" },
  { id: 2, title: "Investigative Journalism" },
  { id: 3, title: "History" },
  { id: 4, title: "Comedy" },
  { id: 5, title: "Entertainment" },
  { id: 6, title: "Business" },
  { id: 7, title: "Fiction" },
  { id: 8, title: "News" },
  { id: 9, title: "Kids and Family" },
];

export default function Home() {
  return (
    <div style={{ padding: "1rem" }}>
      {/* Filters */}
      <SearchBar />
      <SortSelect />

      <GenreFilter genres={GENRES} />

      {/* Podcast grid */}
      <PodcastGrid genres={GENRES} />

      {/* Pagination */}
      <Pagination />
    </div>
  );
}