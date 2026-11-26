import { useEffect, useState } from "react";
import { FavoritesContext } from "./FavoritesContext.js";
import {
  loadFavoriteIds,
  saveFavoriteIds,
} from "../data/favoritesStorage.js";

export default function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState(loadFavoriteIds);

  useEffect(() => {
    saveFavoriteIds(favoriteIds);
  }, [favoriteIds]);

  function toggleFavorite(gameId) {
    const id = String(gameId);
    setFavoriteIds((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}