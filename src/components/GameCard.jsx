import { useState } from "react";
import FavoriteButton from "./FavoriteButton.jsx";
import { Link } from "react-router";

export default function GameCard({ title, description, detailsTo, gameId }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDescription() {
    setIsOpen((previous) => !previous);
  }

  return (
    <article className="game-card">
      <h3>{title}</h3>
      <button
        type="button"
        onClick={toggleDescription}
        aria-expanded={isOpen}
      >
        {isOpen ? "Приховати опис" : "Показати опис"}
      </button>
      {isOpen && <p className="game-description">{description}</p>}
      {gameId != null && (
        <FavoriteButton gameId={gameId} title={title} />
      )}
      {detailsTo && (
        <p className="game-card__details">
          <Link to={detailsTo} aria-label={`Сторінка гри ${title}`}>
            Сторінка гри
          </Link>
        </p>
      )}
    </article>
  );
}