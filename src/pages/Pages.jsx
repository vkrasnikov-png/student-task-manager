import { Link, useParams } from "react-router";
import { useFavorites } from "../context/FavoritesContext.js";
import GameCard from "../components/GameCard.jsx";

export function HomePage() {
  return (
    <section>
      <h2>Головна</h2>
      <p>Оберіть гру з каталогу або перегляньте рекомендації.</p>
      <Link to="/catalog">Відкрити каталог</Link>
    </section>
  );
}

export function GameDetailsPage({ games }) {
  const { gameId } = useParams();
  const game = games.find((item) => String(item.id) === gameId);

  if (!game) {
    return (
      <section>
        <h2>Гру не знайдено</h2>
        <Link to="/catalog">Перейти до каталогу</Link>
      </section>
    );
  }

  return (
    <section>
      <h2>{game.title}</h2>
      <p>{game.description}</p>
      <Link to="/catalog">Перейти до каталогу</Link>
    </section>
  );
}

export function FavoritesPage({ games }) {
  const { favoriteIds } = useFavorites();
  const favoriteGames = games.filter((game) =>
    favoriteIds.includes(String(game.id))
  );

  return (
    <section aria-labelledby="favorites-title">
      <h2 id="favorites-title">Обрані ігри</h2>
      {favoriteGames.length === 0 ? (
        <p>Список обраного порожній.</p>
      ) : (
        <div className="game-grid">
          {favoriteGames.map((game) => (
            <GameCard
              key={game.id}
              gameId={game.id}
              title={game.title}
              description={game.description}
              detailsTo={`/catalog/${encodeURIComponent(game.id)}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export function NotFoundPage() {
  return (
    <section>
      <h2>Сторінку не знайдено</h2>
      <p>Перевірте адресу або відкрийте головну сторінку.</p>
      <Link to="/">На головну</Link>
    </section>
  );
}