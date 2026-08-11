"use client";
import { useThemeStore } from "@/store/useThemeStore";
import RandomQuote from "@/components/randomQuote/randomQuote";
export default function Home() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <div data-theme={theme} className="app-container">
      <RandomQuote />
    </div>
  );
}
