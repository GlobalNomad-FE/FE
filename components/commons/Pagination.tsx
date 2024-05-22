import usePagination from '@/hooks/usePagenation';
import React, { useEffect } from 'react';

// totalCount는 API에서 받아오는 값으로 데이터의 총 갯수이고
// size는 API를 호출할 때 보내는 값으로 한 페이지에 보여줄 데이터의 갯수입니다.
// onPageChange는 상위컴포넌트로 currentPage의 값을 보내주는 함수입니다.
interface Props {
  totalCount: number;
  size: number;
  onPageChange: (value: number) => void;
}

const Pagination = ({ totalCount, size, onPageChange }: Props) => {
  const totalPages = Math.ceil(totalCount / size);
  const { currentPage, goToPage, goToNextSet, goToPreviousSet } =
    usePagination(totalPages);

  const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPages);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  //CurrenPage의 변화를 감지해서 그 값을 상위컴포넌트로 전달해줍니다
  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage]);

  return (
    <div className="flex items-center justify-center py-4 text-black200">
      <button
        onClick={goToPreviousSet}
        className={`text-h4-bold w-[5.5rem] h-[5.5rem] mx-[0.5rem] leading-tight border border-green200 rounded-[15px] ${
          currentPage <= 5
            ? 'border-gray200 text-gray200'
            : 'hover:bg-green200 hover:text-white'
        }`}
        disabled={currentPage <= 5}
      >
        {'<'}
      </button>
      {pageNumbers.map((pageNumber) => (
        <div key={pageNumber}>
          <button
            onClick={() => goToPage(pageNumber)}
            className={`text-h4-bold w-[5.5rem] h-[5.5rem] mx-[0.5rem] leading-tight border border-green200 rounded-[15px] ${
              currentPage === pageNumber
                ? 'text-white bg-green200'
                : 'text-green200 bg-white hover:bg-green200 hover:text-white'
            }`}
          >
            {pageNumber}
          </button>
        </div>
      ))}
      <div>
        <button
          onClick={goToNextSet}
          className={`text-h4-bold w-[5.5rem] h-[5.5rem] mx-[0.5rem] leading-tight border border-green200 rounded-[15px] ${
            Math.ceil(currentPage / 5) === Math.ceil(totalPages / 5)
              ? 'border-gray200 text-gray200'
              : 'hover:bg-green200 hover:text-white'
          }`}
          disabled={Math.ceil(currentPage / 5) === Math.ceil(totalPages / 5)}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
