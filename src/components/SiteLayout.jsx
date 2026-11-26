import { NavLink, Outlet } from "react-router";
import Header from "./Header.jsx";
import { useFavorites } from "../context/FavoritesContext.js";

function linkClass({ isActive }) {
  return isActive ? "site-nav__active" : undefined;
}

export default function SiteLayout() {
  const { favoriteIds } = useFavorites();

  return (
    <>
      <Header />
      <nav className="site-nav" aria-label="Основне меню">
        <NavLink to="/" end className={linkClass}>
          Головна
        </NavLink>
        <NavLink to="/catalog" className={linkClass}>
          Каталог
        </NavLink>
        <NavLink to="/favorites" className={linkClass}>
          Обране ({favoriteIds.length})
        </NavLink>
        <NavLink to="/recommendations" end className={linkClass}>
          Рекомендації
        </NavLink>
      </nav>
      <main className="page-content">
        <Outlet />
      </main>
    </>
  );
}