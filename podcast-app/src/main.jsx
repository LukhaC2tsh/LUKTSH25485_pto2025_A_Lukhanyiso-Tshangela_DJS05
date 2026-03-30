import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { PodcastProvider } from "./context/PodcastContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <PodcastProvider initialPodcasts={[]}>
        <App />
      </PodcastProvider>
    </BrowserRouter>
  </React.StrictMode>
);