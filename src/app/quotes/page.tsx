"use client";
import { useQuery } from "@tanstack/react-query";
import { getQuotes } from "@/services/api";
import QuoteCard from "@/components/QuoteCard/QuoteCard";

export default function Quotes() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["quotes"],
    queryFn: getQuotes,
  });
    console.log(data);
    if (isLoading) return <p>Loading quotes...</p>;
    if (isError) return <p>Error loading quotes</p>;
  return (
    <>
      <QuoteCard quotes={data?.quotes} />
    </>
  );
}
