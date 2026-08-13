"use client";
import Link from "next/link";
import { Quote } from "@/types/quotes";
import css from "./QuoteCard.module.css";
import { useThemeStore } from "@/store/useThemeStore";

interface QuoteCardProps {
  quotes: Quote[] | undefined;
}

export default function QuoteCard({ quotes }: QuoteCardProps) {
  const theme = useThemeStore((state) => state.theme);


  return (
    <ul className={`${css.list} ${css[theme]}`}>
      {quotes?.map((quote: Quote) => (
        <li key={quote._id} className={css.item}>
          <p className={css.quoteText}>{quote.text}</p>
          <p>{quote.author}</p>
          <p>{quote.category}</p>
          <p>{quote.likesCount}</p>
          <p>{quote.createdAt}</p>
        </li>
      ))}
    </ul>
  );
}
