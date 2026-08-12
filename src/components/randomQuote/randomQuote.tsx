"use client";

import { useThemeStore } from "@/store/useThemeStore";
import { getRandomQuote } from "@/services/api";
import { GrainGradient } from "@paper-design/shaders-react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/loader";

import css from "./randomQuote.module.css";

export default function RandomQuote() {
  const theme = useThemeStore((state) => state.theme);

  const { data, isLoading, isError, refetch, isFetching, error } = useQuery({
    queryKey: ["randomQuote"],
    queryFn: getRandomQuote,
  });

  if (isError) {
    throw error;
  }

  return (
    <div className={`${css.container} ${css[theme]}`}>
      <div className={css.shader}>
        <GrainGradient
          width="100%"
          height="100%"
          colors={
            theme === "dark"
              ? ["#7300ff", "#eba8ff", "#00bfff", "#2b00ff"]
              : ["#DDE7FF", "#EADCF8", "#F8DCE8", "#FFE8D6"]
          }
          colorBack={theme === "dark" ? "#181a20" : "#f7f4ef"}
          softness={0.5}
          intensity={0.5}
          noise={0.25}
          shape="corners"
          speed={1}
        />
      </div>
      <div className={css.content}>
        <p className={css.text}>Random quote of the moment</p>
        {isFetching || isLoading ? (
          <Loader />
        ) : (
          <>
            <h1 className={css.quote}>{data?.text}</h1>

            <p className={css.author}>{data?.author}</p>

            <div className={css.cat}>
              <span className={css.category}>{data?.category}</span>

              <span className={css.likesCount}>❤️ {data?.likesCount}</span>
            </div>
            <button
              className={`${css.btn} ${css[theme]}`}
              onClick={() => refetch()}
              disabled={isFetching}
            >
              {isFetching ? "Loading..." : "Get Another"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
