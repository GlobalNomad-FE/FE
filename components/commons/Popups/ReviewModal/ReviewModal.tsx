import Portal from '@/utils/Portal';
import React, { useState } from 'react';
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

  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isMobile = useMediaQuery('(max-width: 767px)');

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  //모달 안쪽 클릭시 모달이 꺼지는 현상을 없애기위해 버블링 막음
  const handleStopBubbling = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      {isDesktop && (
        <Button
          width={144}
          height={40}
          fontSize={16}
          btnColor={'nomadBlack'}
          textColor={'white'}
          hover={true}
          onClick={handleOpenModal}
        >
          후기 작성
        </Button>
      )}
      {isTablet && (
        <Button
          width={112}
          height={40}
          fontSize={16}
          btnColor={'nomadBlack'}
          textColor={'white'}
          hover={true}
          onClick={handleOpenModal}
        >
          후기 작성
        </Button>
      )}
      {isMobile && (
        <Button
          width={80}
          height={32}
          fontSize={14}
          btnColor={'nomadBlack'}
          textColor={'white'}
          hover={true}
          onClick={handleOpenModal}
        >
          후기 작성
        </Button>
      )}
      <Portal>
        {openModal && (
          <div
            className="fixed z-20 left-0 top-0 w-full h-full bg-black200 bg-opacity-45 flex items-center justify-center"
            onClick={handleCloseModal}
          >
            <div
              onClick={handleStopBubbling}
              className={`px-[24px] pt-[35px] bg-white flex flex-col items-center justify-center ${
                isMobile
                  ? 'w-full h-full'
                  : 'w-[480px] pb-[46px] rounded-[24px]'
              }`}
            >
              <div
                className={`flex w-full justify-between items-center ${
                  isMobile ? 'mb-[24px]' : 'mb-[41px]'
                }`}
              >
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
