const STORAGE_KEY = "gamezone-favorites";

export function loadFavoriteIds() {
  try {
    const text = localStorage.getItem(STORAGE_KEY);
    if (text === null) return [];
    const saved = JSON.parse(text);
    if (!Array.isArray(saved)) return [];
    const valid = saved.filter(
      (id) => typeof id === "string" && id.trim() !== ""
    );
    return [...new Set(valid)];
  } catch {
    return [];
  }
}

export function saveFavoriteIds(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch (error) {
    console.warn("Не вдалося зберегти обране.", error);
  }
}