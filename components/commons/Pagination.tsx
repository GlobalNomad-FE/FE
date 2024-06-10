import React from 'react';
import usePagination from '@/hooks/usePagination';
import Button from '@/components/commons/Button';
import useMediaQuery from '@/hooks/useMediaQuery';

interface Props {
  totalCount: number;
  itemsInPage: number;
  visiblePages?: number;
  onPageChange: (value: number) => void;
  currentPage: number;
}

/**
 * @param {number} totalCount - 총 데이터의 갯수.
 * @param {number} itemsInPage - 페이지당 보여지는 아이템의 갯수.
 * @param {number} [visiblePages] - 보여질 페이지네이션 버튼의 갯수. 기본값은 5입니다.
 * @param {function} onPageChange - 현재 페이지 값을 상위 컴포넌트로 보내는 콜백 함수.
 * @param {number} currentPage - 현재 페이지 값.
 */
const Pagination = ({
  totalCount,
  itemsInPage,
  visiblePages = 5,
  onPageChange,
  currentPage,
}: Props) => {
  const totalPages = Math.ceil(totalCount / itemsInPage);
  const isMobile = useMediaQuery('(max-width: 767px)');

  const { pageNumbers, goToPage, goToNextSet, goToPreviousSet } = usePagination(
    totalPages,
    visiblePages,
    onPageChange,
    currentPage,
  );

  return (
    <div className="flex items-center justify-center py-4 text-black200 text-h4-bold gap-2.5">
      <Button
        width={isMobile ? 40 : 55}
        height={isMobile ? 40 : 55}
        fontSize={18}
        btnColor={'white'}
        textColor={currentPage > visiblePages ? 'green' : 'gray'}
        border={true}
        borderColor={currentPage > visiblePages ? 'green' : 'gray'}
        hover={currentPage > visiblePages}
        onClick={currentPage > visiblePages ? goToPreviousSet : undefined}
        disabled={!(currentPage > visiblePages)}
        rounded={15}
      >
        {'<'}
      </Button>
      {pageNumbers.map((pageNumber) => (
        <Button
          key={pageNumber}
          width={isMobile ? 40 : 55}
          height={isMobile ? 40 : 55}
          fontSize={18}
          btnColor={currentPage === pageNumber ? 'green' : 'white'}
          textColor={currentPage === pageNumber ? 'white' : 'green'}
          border={currentPage === pageNumber ? undefined : true}
          borderColor={currentPage === pageNumber ? undefined : 'green'}
          hover={true}
          onClick={() => goToPage(pageNumber)}
          rounded={15}
        >
          {pageNumber}
        </Button>
      ))}
      <Button
        width={isMobile ? 40 : 55}
        height={isMobile ? 40 : 55}
        fontSize={18}
        btnColor={'white'}
        textColor={
          Math.ceil(currentPage / visiblePages) !==
          Math.ceil(totalPages / visiblePages)
            ? 'green'
            : 'gray'
        }
        border={true}
        borderColor={
          Math.ceil(currentPage / visiblePages) !==
          Math.ceil(totalPages / visiblePages)
            ? 'green'
            : 'gray'
        }
        hover={
          Math.ceil(currentPage / visiblePages) !==
          Math.ceil(totalPages / visiblePages)
        }
        onClick={
          Math.ceil(currentPage / visiblePages) !==
          Math.ceil(totalPages / visiblePages)
            ? goToNextSet
            : undefined
        }
        disabled={
          !(
            Math.ceil(currentPage / visiblePages) !==
            Math.ceil(totalPages / visiblePages)
          )
        }
        rounded={15}
      >
        {'>'}
      </Button>
    </div>
  );
};

export default Pagination;
