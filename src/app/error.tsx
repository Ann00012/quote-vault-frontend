"use client";

import { useThemeStore } from "@/store/useThemeStore";
import css from "./error.module.css";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const theme = useThemeStore((state) => state.theme);

  console.error(error);

  return (
    <div className={`${css.container} ${css[theme]}`}>
      <div className={css.glow}></div>

      <div className={css.card}>
        <div className={css.icon}>!</div>

        <span className={css.label}>QUOTE VAULT</span>

        <h2>Oops! Something went wrong</h2>

        <p>We couldn't load this page right now. Please try again.</p>

        <button type="button" onClick={reset} className={css.button}>
          Try again
        </button>
      </div>
    </div>
  );
}
