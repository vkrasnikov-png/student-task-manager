import { useState } from "react";
import GameCard from "./GameCard.jsx";
import GameForm from "./GameForm.jsx";

export default function Catalog({ games, onAddGame }) {
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();
  const visibleGames = games.filter((game) =>
    game.title.toLowerCase().includes(normalizedQuery),
  );

  return (
    <section aria-labelledby="catalog-title">
      <h2 id="catalog-title">Каталог ігор</h2>
      <GameForm onAddGame={onAddGame} />
      <p>
        <label htmlFor="game-search">Пошук за назвою</label>{" "}
        <input
          id="game-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </p>
      {visibleGames.length === 0 ? (
        <p>За цим запитом ігор не знайдено.</p>
      ) : (
        <div className="game-grid">
          {visibleGames.map((game) => (
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