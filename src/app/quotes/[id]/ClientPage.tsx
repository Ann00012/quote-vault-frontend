"use client";
import css from "./ClientPage.module.css";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getSingleQuote } from "@/services/api";
import Loader from "@/components/Loader/loader";
import { NeuroNoise } from "@paper-design/shaders-react";
import { useThemeStore } from "@/store/useThemeStore";

export default function ClientPage() {
  const { id } = useParams<{ id: string }>();
  const theme = useThemeStore((state) => state.theme);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["quote", id],
    queryFn: () => getSingleQuote(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
      <div className={`${css.loaderWrapper} ${css[theme]}`}>
        <Loader />
      </div>
    );
  }

  if (isError) {
    throw error;
  }

  return (
    <main className={`${css.container} ${css[theme]}`}>
      <div className={css.shader}>
        <NeuroNoise
          width={window.innerWidth}
          height={window.innerHeight}
          colorFront={theme === "dark" ? "#7300ff" : "#DDE7FF"}
          colorMid={theme === "dark" ? "#eba8ff" : "#EADCF8"}
          colorBack={theme === "dark" ? "#121316" : "#f7f4ef"}
          brightness={theme === "dark" ? 0.08 : 0.2}
          contrast={0.3}
          speed={0.8}
        />
      </div>

      <div className={css.content}>
        <div className={css.card}>
          <span className={css.badge}>✨ Daily Wisdom</span>

          {isFetching ? (
            <div className={css.inlineLoader}>
              <Loader />
            </div>
          ) : (
            <>
              <h1 className={css.quote}>“{data?.text}”</h1>
              <p className={css.author}>— {data?.author}</p>

              <div className={css.meta}>
                <span className={css.category}>{data?.category}</span>
                <span className={css.likesCount}>
                  ❤️ {data?.likesCount} Likes
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
