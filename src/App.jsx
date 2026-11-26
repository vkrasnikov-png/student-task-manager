import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import SiteLayout from "./components/SiteLayout.jsx";
import Catalog from "./components/Catalog.jsx";
import Recommendations from "./components/Recommendations.jsx";
import { loadGames, saveGames } from "./data/gameStorage.js";
import {
  HomePage,
  GameDetailsPage,
  FavoritesPage,
  NotFoundPage,
} from "./pages/Pages.jsx";

export default function App() {
  const [games, setGames] = useState(loadGames);

  useEffect(() => {
    saveGames(games);
  }, [games]);

  function handleAddGame(fields) {
    const newGame = { ...fields, id: crypto.randomUUID() };
    setGames((previous) => [...previous, newGame]);
  }

  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="catalog"
          element={<Catalog games={games} onAddGame={handleAddGame} />}
        />
        <Route
          path="catalog/:gameId"
          element={<GameDetailsPage games={games} />}
        />
        <Route
          path="favorites"
          element={<FavoritesPage games={games} />}
        />
        <Route path="recommendations" element={<Recommendations />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}