import { useThemeStore } from "@/store/useThemeStore";
import { getRandomQuote } from "@/services/api";
import css from "./randomQuote.module.css";
import { useQuery } from "@tanstack/react-query";
export default function RandomQuote() {
  const theme = useThemeStore((state) => state.theme);
  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: ["randomQuery"],
    queryFn: () => getRandomQuote(),
  });
  return (
    <div className={`${css.container} ${css[theme]}`}>
      <p className={css.text}>Random Quote of the Moment</p>
      {data && (
        <>
          <p className={css.text}>{data.text}</p>
          <p className={css.author}>{data.author}</p>
          <div className={css.cat}>
            <p className={css.category}>{data.category}</p>
            <p className={css.likesCount}>❤️ {data.likesCount}</p>
          </div>
        </>
      )}
      <button onClick={() => refetch()} className={`${css.btn} ${css[theme]}`}>
        Get Another
      </button>
     
    </div>
  );
}
