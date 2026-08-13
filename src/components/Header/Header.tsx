"use client"
import css from "./Header.module.css";
import Link from "next/link";
import { useThemeStore } from "@/store/useThemeStore";
import { useAuthStore } from "@/store/useAuthStore";

export default function Header() {
  const theme = useThemeStore((state) => state.theme); 
  const { isLoggedIn, clearAuth } = useAuthStore();

  return (
    <header className={`${css.header} ${css[theme]}`}>
      <Link href="/" className={css.logo}>
        QuoteVault
          </Link>
          <Link href="/quotes">All quotes</Link>

      {isLoggedIn ? (
        <button onClick={clearAuth} className={css.logoutBtn}>
          LogOut
        </button>
      ) : (
        <div className={css.authLinks}>
          <Link href="/signup">SignUp</Link>
          <Link href="/login">LogIn</Link>
        </div>
      )}
    </header>
  );
}
