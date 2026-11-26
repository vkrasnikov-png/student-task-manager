import { useFavorites } from "../context/FavoritesContext.js";

export default function FavoriteButton({ gameId, title }) {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const selected = favoriteIds.includes(String(gameId));

  return (
    <button
      type="button"
      className="favorite-button"
      aria-label={`Обране: ${title}`}
      aria-pressed={selected}
      onClick={() => toggleFavorite(gameId)}
    >
      {selected ? "В обраному" : "Обране"}
    </button>
  );
}