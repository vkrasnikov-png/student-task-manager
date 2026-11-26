import { initialGames } from "./initialGames.js";

export const STORAGE_KEY = "gamezone-games";

function isGame(game) {
  return (
    game !== null &&
    typeof game === "object" &&
    (typeof game.id === "number" || typeof game.id === "string") &&
    typeof game.title === "string" &&
    typeof game.description === "string"
  );
}

export function loadGames() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return initialGames;
    const saved = JSON.parse(raw);
    if (Array.isArray(saved) && saved.every(isGame)) {
      const ids = new Set(saved.map((game) => String(game.id)));
      if (ids.size === saved.length) return saved;
    }
  } catch {
    // Початкові дані доступні навіть за проблем зі сховищем.
  }
  return initialGames;
}

export function saveGames(games) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
  } catch (error) {
    console.warn("GameZone: не вдалося зберегти каталог.", error);
  }
}