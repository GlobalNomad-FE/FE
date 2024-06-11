import Portal from '@/utils/Portal';
import React, { useRef, useState } from 'react';
import Button from '@/components/commons/Button';
import Image from 'next/image';
import ReviewContent from './ReviewContent';
import useMediaQuery from '@/hooks/useMediaQuery';

interface Props {
  title: string;
  bannerImageUrl: string;
  date: string;
  startTime: string;
  endTime: string;
  headCount: number;
  totalPrice: number;
  reservationId: number;
}
/**
 * @param {string} title - 체험 이름.
 * @param {string} bannerImageUrl - 체험 사진 경로.
 * @param {string} date - 체험 날짜. ex) 2023. 2. 14 형식.
 * @param {string} startTime 체험시작 시간
 * @param {string} endTime 체험종료 시간
 * @param {number} headCount - 체험 인원.
 * @param {number} totalPrice - 체험 가격.
 * @param {number} reservationId - 리뷰할 체험 고유 번호.
 */
const ReviewModal = ({
  title,
  bannerImageUrl,
  date,
  startTime,
  endTime,
  headCount,
  totalPrice,
  reservationId,
}: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isMobile = useMediaQuery('(max-width: 767px)');
  const overlay = useRef(null);

  const handleClickOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlay.current) {
      setOpenModal(false);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Button
        width={isMobile ? 80 : isTablet ? 112 : 140}
        height={isMobile ? 32 : 40}
        fontSize={isMobile ? 14 : 16}
        btnColor={'nomadBlack'}
        textColor={'white'}
        hover={true}
        onClick={handleOpenModal}
      >
        후기 작성
      </Button>
      <Portal>
        {openModal && (
          <div
            className="fixed z-20 left-0 top-0 w-full h-full bg-black200 bg-opacity-45 flex items-center justify-center"
            onClick={handleClickOverlay}
            ref={overlay}
          >
            <div className="px-[24px] pt-[35px] bg-white flex flex-col items-center justify-center mobile:w-full mobile:h-full mobile:pb-0 w-[480px] pb-[46px] rounded-[24px] mobile:rounded-none">
              <div className="flex w-full justify-between items-center mobile:mb-[24px] mb-[41px]">
                <h1 className="text-h1 text-black200">후기 작성</h1>
                <Image
                  src="/icons/btn-X-big.svg"
                  alt="닫기 버튼"
                  width={40}
                  height={40}
                  onClick={handleCloseModal}
                  className="cursor-pointer"
                />
              </div>
              <ReviewContent
                title={title}
                bannerImageUrl={bannerImageUrl}
                date={date}
                startTime={startTime}
                endTime={endTime}
                headCount={headCount}
                totalPrice={totalPrice}
                reservationId={reservationId}
              />
            </div>
          </div>
        )}
      </Portal>
    </>
  );
};

export default ReviewModal;
