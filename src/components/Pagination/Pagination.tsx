"use client";

import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";
import { useThemeStore } from "@/store/useThemeStore";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (nextPage: number) => void;
}

export default function Paginations({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const theme = useThemeStore((state) => state.theme);
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={`${css.pagination} ${css[theme]}`}
      pageClassName={css.page}
      pageLinkClassName={css.pageLink}
      activeClassName={css.active}
      previousClassName={css.previous}
      nextClassName={css.next}
      disabledClassName={css.disabled}
      previousLinkClassName={css.arrow}
      nextLinkClassName={css.arrow}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
