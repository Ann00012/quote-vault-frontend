"use client";

import css from "./Header.module.css";
import Link from "next/link";
import { useThemeStore } from "@/store/useThemeStore";
import { useAuthStore } from "@/store/useAuthStore";

export default function Header() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const { user, isLoggedIn, clearAuth } = useAuthStore();

  return (
    <header className={`${css.header} ${css[theme]}`}>
      <div className={css.navLinks}>
        <Link href="/" className={css.logo}>
          QuoteVault
        </Link>

        <Link href="/quotes" className={css.navLink}>
          All quotes
        </Link>

        <button
          onClick={toggleTheme}
          className={`${css.themeToggle} ${css[theme]}`}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        >
          <span className={css.themeIcon}>{theme === "light" ? "☀" : "☾"}</span>

          <span className={css.themeText}>
            {theme === "light" ? "Light" : "Dark"}
          </span>
        </button>
      </div>

      {isLoggedIn && user ? (
        <div className={css.userMenu}>
          <Link
            href="/profile"
            className={css.profileLink}
            title="Go to Profile"
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.username || "User avatar"}
                className={css.avatarImg}
              />
            ) : (
              <div className={css.avatarFallback}>
                {user.email?.[0].toUpperCase()}
              </div>
            )}

            <span className={css.userName}>{user.username || user.email}</span>
          </Link>

          <button
            onClick={clearAuth}
            className={css.logoutBtn}
            aria-label="Logout"
            title="Logout"
          >
            <span className={css.logoutIcon}>↪</span>
            <span className={css.logoutText}>Logout</span>
          </button>
        </div>
      ) : (
        <div className={css.authLinks}>
          <Link href="/signup">SignUp</Link>
          <Link href="/login">LogIn</Link>
        </div>
      )}
    </header>
  );
}
