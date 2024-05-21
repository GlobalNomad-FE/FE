import { useState } from 'react';

const usePagination = (totalPages) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToNextSet = () => {
    const nextPage = currentPage + 5;
    if (nextPage <= totalPages) {
      setCurrentPage(nextPage);
    } else {
      setCurrentPage(totalPages);
    }
  };

  const goToPreviousSet = () => {
    const previousPage = currentPage - 5;
    if (previousPage >= 1) {
      setCurrentPage(previousPage);
    } else {
      setCurrentPage(1);
    }
  };

  return {
    currentPage,
    goToPage,
    nextPage,
    previousPage,
    goToNextSet,
    goToPreviousSet,
  };
};

export default usePagination;