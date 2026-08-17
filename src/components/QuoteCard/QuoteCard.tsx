"use client";

import { Quote } from "@/types/quotes";
import { useThemeStore } from "@/store/useThemeStore";
import { useAuthStore } from "@/store/useAuthStore";
import css from "./QuoteCard.module.css";
import Link from "next/link";
interface QuoteCardProps {
  quote: Quote;
  onEdit?: (quote: Quote) => void;
  onDelete?: (quoteId: string) => void;
}

export default function QuoteCard({ quote, onEdit, onDelete }: QuoteCardProps) {
  const theme = useThemeStore((state) => state.theme);
  const user = useAuthStore((state) => state.user);

  const isOwner = Boolean(user && quote.userId && user._id === quote.userId);
  console.log("USER:", user);
  console.log("USER ID:", user?._id);
  console.log("QUOTE USER ID:", quote.userId);
  console.log("IS OWNER:", user?._id === quote.userId);
  return (
    <li className={`${css.item} ${css[theme]}`}>
      <Link href={`/quotes/${quote._id}`} className={css.cardLink}>
        <p className={css.quoteText}>{quote.text}</p>

        <p className={css.author}> {quote.author}</p>

        <div className={css.meta}>
          <span className={css.category}>{quote.category}</span>

          <span className={css.likes}>❤️ {quote.likesCount}</span>

          <span className={css.date}>
            {new Date(quote.createdAt).toLocaleDateString("uk-UA")}
          </span>
        </div>
      </Link>
      {isOwner && (
        <div className={css.actions}>
          <button
            type="button"
            className={css.editBtn}
            onClick={() => onEdit?.(quote)}
          >
            Edit
          </button>

          <button
            type="button"
            className={css.deleteBtn}
            onClick={() => onDelete?.(quote._id)}
          >
            Delete
          </button>
        </div>
      )}
    </li>
  );
}
