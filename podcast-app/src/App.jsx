import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ShowDetails from "./pages/ShowDetails";

/**
 * Main application routes
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/show/:id" element={<ShowDetails />} />
    </Routes>
  );
}