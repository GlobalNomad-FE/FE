import usePagination from '@/hooks/usePagenation';
import React, { useEffect } from 'react';

// Props로 totalCount, size를 받는데 totalCount는 API에서 받아오는 값으로 데이터의 총 갯수이고
// size는 API를 호출할 때 보내는 값으로 한 페이지에 보여줄 데이터의 갯수입니다.
// totalCount와 size를 받아서 totalPages를 계산합니다.
interface Props {
  totalCount: number;
  size: number;
  onPageChange: (value: number) => void;
}

const Pagination = ({ totalCount, size, onPageChange }: Props) => {
  const totalPages = Math.ceil(totalCount / size);
  const { currentPage, goToPage, goToNextSet, goToPreviousSet } =
    usePagination(totalPages);

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPages);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center py-4 text-black200">
      <nav aria-label="Page navigation">
        <ul className="inline-flex -space-x-px">
          <li>
            <button
              onClick={goToPreviousSet}
              className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              disabled={currentPage <= 5}
            >
              Previous
            </button>
          </li>
          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber}>
              <button
                onClick={() => goToPage(pageNumber)}
                className={`py-2 px-3 leading-tight border ${
                  currentPage === pageNumber
                    ? 'text-yellow200 bg-red200'
                    : 'text-gray500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                }`}
              >
                {pageNumber}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={goToNextSet}
              className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              disabled={
                Math.ceil(currentPage / 5) === Math.ceil(totalPages / 5)
              }
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
