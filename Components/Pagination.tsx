import React, { useCallback } from "react";
import styles from "../styles/_buttons.module.scss";
import { IPerson } from "../types/Person";
import { useRouter } from "next/router";

type IProps = {
  total: string;
  next: string | null;
  prev: string | null;
  setPeopleList: (people: IPerson[]) => void;
  setIsLoading: (b: boolean) => void;
  isLoading: boolean;
  setPageLinks: ({ next, prev }) => void
};

export const Pagination = ({
  total,
  next,
  prev,
  setPeopleList,
  setIsLoading,
  setPageLinks }: IProps
) => {
  const router = useRouter()
  let currentPage = +router.query.page ?? 1

  const fetchData = useCallback(
    async (link: string | null) => {
      if (link) {
        try {
          setIsLoading(true);
          const response = await fetch(link);
          const data = await response.json();
          setPeopleList(data.results);
          setPageLinks({ next: data.next, prev: data.previous });
        } catch (error) {
          throw new Error(error);
        } finally {
          setIsLoading(false);
        }
      }
    },
    [setIsLoading, setPeopleList]
  );

  const totalPages = Math.ceil(+total / 10)
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage) return;
    currentPage = newPage;
    router.push(`?page=${currentPage}`);
    fetchData(`https://swapi.dev/api/people/?page=${newPage}`)
  };

  const renderPageButtons = () => (
    <>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || !prev}
        className={[styles.button, !prev && styles.button_disabled].join(" ")}
      >
        {"<"}
      </button>

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={[
            styles.button,
            currentPage === pageNumber && styles.button_disabled,
          ].join(" ")}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!next}
        className={[styles.button, !next && styles.button_disabled].join(" ")}
      >
        {">"}
      </button>
    </>
  );

  return (
    <div className={styles.button__container}>
      {+total >= 10 && renderPageButtons()}
    </div>
  );
};
