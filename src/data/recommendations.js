const url = import.meta.env.BASE_URL + "recommendations.json";

function isRecommendation(game) {
  return Boolean(
    game &&
      typeof game.id === "string" &&
      game.id.trim() &&
      typeof game.title === "string" &&
      game.title.trim() &&
      typeof game.description === "string" &&
      game.description.trim()
  );
}

export async function getRecommendations(signal) {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const games = await response.json();
  if (!Array.isArray(games) || !games.every(isRecommendation)) {
    throw new Error("Некоректна структура рекомендацій.");
  }
  const ids = new Set(games.map((game) => game.id));
  if (ids.size !== games.length) {
    throw new Error("У рекомендаціях повторюються id.");
  }
  return games;
}