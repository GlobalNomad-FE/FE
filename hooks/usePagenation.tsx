import { useState } from 'react';

interface UsePaginationReturn {
  currentPage: number;
  goToPage: (page: number) => void;
  goToNextSet: () => void;
  goToPreviousSet: () => void;
}

const usePagination = (
  totalPages: number,
  visiblePages: number,
): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToNextSet = () => {
    const nextPage = Math.ceil(currentPage / visiblePages) * visiblePages + 1;
    if (nextPage <= totalPages) {
      setCurrentPage(nextPage);
    } else {
      setCurrentPage(totalPages);
    }
  };

  const goToPreviousSet = () => {
    const previousPage =
      Math.floor((currentPage - 1) / visiblePages) * visiblePages;
    if (previousPage >= 1) {
      setCurrentPage(previousPage);
    } else {
      setCurrentPage(1);
    }
  };

  return {
    currentPage,
    goToPage,
    goToNextSet,
    goToPreviousSet,
  };
};

export default usePagination;
