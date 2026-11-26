import { useEffect, useState } from "react";
import GameCard from "./GameCard.jsx";
import { getRecommendations } from "../data/recommendations.js";

export default function Recommendations() {
  const [result, setResult] = useState({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const games = await getRecommendations(controller.signal);
        if (!controller.signal.aborted) {
          setResult({ status: "ready", games });
        }
      } catch (error) {
        if (controller.signal.aborted) return;
        console.warn("GameZone: рекомендації.", error);
        setResult({ status: "error" });
      }
    }

    load();
    return () => controller.abort();
  }, [attempt]);

  function retry() {
    setResult({ status: "loading" });
    setAttempt((previous) => previous + 1);
  }

  return (
    <section aria-labelledby="recommendations-title">
      <h2 id="recommendations-title">Рекомендації</h2>
      <div role="status">
        {result.status === "loading" && "Завантажуємо рекомендації…"}
        {result.status === "ready" &&
          result.games.length === 0 &&
          "Рекомендацій поки немає."}
      </div>
      {result.status === "error" && (
        <div>
          <p role="alert">Не вдалося завантажити рекомендації.</p>
          <button type="button" onClick={retry}>
            Спробувати ще раз
          </button>
        </div>
      )}
      {result.status === "ready" && result.games.length > 0 && (
        <div className="game-grid">
          {result.games.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              description={game.description}
            />
          ))}
        </div>
      )}
    </section>
  );
}