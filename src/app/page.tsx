"use client";
import { useThemeStore } from "@/store/useThemeStore";
import RandomQuote from "@/components/randomQuote/randomQuote";
import ShaderBackground from "@/components/ShaderBackground/ShaderBackground";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function Home() {
  const theme = useThemeStore((state) => state.theme);
  const router = useRouter();
  return (
    <div data-theme={theme} className="app-container">
      <ShaderBackground>
        <Toaster />
        <RandomQuote />
      </ShaderBackground>
    </div>
  );
}
