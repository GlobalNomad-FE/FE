import usePagination from '@/hooks/usePagination';
import React, { useEffect } from 'react';
import Button from '@/components/commons/Button';
import useMediaQuery from '@/hooks/useMediaQuery';

interface Props {
  totalCount: number;
  itemsInPage: number;
  visiblePages?: number;
  onPageChange: (value: number) => void;
}

/**
 * @param {number} totalCount - 총 데이터의 갯수.
 * @param {number} itemsInPage - 페이지당 보여지는 아이템의 갯수.
 * @param {number} [visiblePages] - 보여질 페이지네이션 버튼의 갯수. 기본값은 5입니다.
 * @param {function} onPageChange - 현재 페이지 값을 상위 컴포넌트로 보내는 콜백 함수.
 */
const Pagination = ({
  totalCount,
  itemsInPage,
  visiblePages = 5,
  onPageChange,
}: Props) => {
  const totalPages = Math.ceil(totalCount / itemsInPage);
  const { currentPage, goToPage, goToNextSet, goToPreviousSet } = usePagination(
    totalPages,
    visiblePages,
  );
  const isMobile = useMediaQuery('(max-width: 767px)');

  const startPage =
    Math.floor((currentPage - 1) / visiblePages) * visiblePages + 1;
  const endPage = Math.min(startPage + visiblePages - 1, totalPages);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  //CurrenPage의 변화를 감지해서 그 값을 상위컴포넌트로 전달해줍니다
  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage, onPageChange]);

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
      {pageNumbers.map((pageNumber) =>
        currentPage === pageNumber ? (
          <Button
            key={pageNumber}
            width={isMobile ? 40 : 55}
            height={isMobile ? 40 : 55}
            fontSize={18}
            btnColor={'green'}
            textColor={'white'}
            hover={true}
            onClick={() => goToPage(pageNumber)}
            rounded={15}
          >
            {pageNumber}
          </Button>
        ) : (
          <Button
            key={pageNumber}
            width={isMobile ? 40 : 55}
            height={isMobile ? 40 : 55}
            fontSize={18}
            btnColor={'white'}
            textColor={'green'}
            border={true}
            borderColor={'green'}
            hover={true}
            onClick={() => goToPage(pageNumber)}
            rounded={15}
          >
            {pageNumber}
          </Button>
        ),
      )}
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
