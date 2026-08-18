"use client";

import { useQuery } from "@tanstack/react-query";
import { getQuotes } from "@/services/api";
import QuoteCard from "@/components/QuoteCard/QuoteCard";
import { useThemeStore } from "@/store/useThemeStore";
import css from "./page.module.css";
import { Quote } from "@/types/quotes";
import Loader from "@/components/Loader/loader";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import Paginations from "@/components/Pagination/Pagination";
import Link from "next/link";
export default function Quotes() {
  const theme = useThemeStore((state) => state.theme);
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
  const [debounced] = useDebounce(text, 300);
  const {
    data: quotes,
    isLoading,
    isError,
    error,
    isPending,
  } = useQuery({
    queryKey: ["quotes", debounced, page],
    queryFn: () => getQuotes(page, debounced),
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    const savedText = localStorage.getItem("search");
    if (savedText) {
      setText(savedText);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("search", text);
  }, [text]);

  const handleChange = (newText: string) => {
    setText(newText);
    setPage(1);
  };

  const totalPages = quotes ? quotes?.totalPages : 0;
  if (isLoading && !quotes) {
    return <Loader />;
  }

  if (isError) {
    throw error;
  }

  return (
    <main className={`${css.container} ${css[theme]}`}>
          <h1 className={css.title}>All Quotes</h1>
          <Link href="/quotes/create">Add quote</Link>
      <div className={css.toolbar}>
        <SearchBar text={text} onChange={handleChange} />
      </div>
      <ul className={css.list}>
        {quotes?.quotes.map((quote: Quote) => (
          <QuoteCard key={quote._id} quote={quote} />
        ))}
      </ul>
      {quotes?.quotes?.length === 0 && (
        <p className={css.noMatches}>There are no matches.</p>
      )}
      {quotes && quotes.totalItems > 0 && totalPages > 1 && (
        <Paginations
          totalPages={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </main>
  );
}
