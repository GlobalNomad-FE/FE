import { useState, useMemo } from 'react';

interface UsePaginationReturn {
  currentPage: number;
  pageNumbers: number[];
  goToPage: (page: number) => void;
  goToNextSet: () => void;
  goToPreviousSet: () => void;
}

const usePagination = (
  totalPages: number,
  visiblePages: number,
  onPageChange: (value: number) => void,
  initialPage: number = 1,
): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  // 페이지 번호 변경
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange(page); // 페이지 변경 시 호출
    }
  };

  // 다음 페이지 세트로 이동
  const goToNextSet = () => {
    const nextPage = Math.ceil(currentPage / visiblePages) * visiblePages + 1;
    if (nextPage <= totalPages) {
      goToPage(nextPage);
    } else {
      goToPage(totalPages);
    }
  };

  // 이전 페이지 세트로 이동
  const goToPreviousSet = () => {
    const previousPage =
      Math.floor((currentPage - 1) / visiblePages) * visiblePages;
    if (previousPage >= 1) {
      goToPage(previousPage);
    } else {
      goToPage(1);
    }
  };

  // 현재 세트의 시작 페이지 번호 계산
  const startPage = useMemo(
    () => Math.floor((currentPage - 1) / visiblePages) * visiblePages + 1,
    [currentPage, visiblePages],
  );

  // 현재 세트의 끝 페이지 번호 계산
  const endPage = useMemo(
    () => Math.min(startPage + visiblePages - 1, totalPages),
    [startPage, visiblePages, totalPages],
  );

  // 페이지 번호 배열 계산
  const pageNumbers = useMemo(() => {
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }, [startPage, endPage]);

  return {
    currentPage,
    pageNumbers,
    goToPage,
    goToNextSet,
    goToPreviousSet,
  };
};

export default usePagination;
