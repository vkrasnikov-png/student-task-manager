import { createContext, useContext } from "react";

export const FavoritesContext = createContext(null);

export function useFavorites() {
  const value = useContext(FavoritesContext);
  if (value === null) {
    throw new Error("useFavorites потребує FavoritesProvider.");
  }
  return value;
}