import Portal from '@/utils/Portal';
import React, { useState } from 'react';
import Button from '@/components/commons/Button';
import Image from 'next/image';
import ReviewContent from './ReviewContent';
import useMediaQuery from '@/hooks/useMediaQuery';

interface Props {
  title: string;
  url: string;
  date: string;
  time: string;
  count: number;
  price: number;
  reservationId: number;
}
/**
 * @param {string} title - 체험 이름.
 * @param {string} url - 체험 사진 경로.
 * @param {string} date - 체험 날짜. ex) 2023. 2. 14 형식.
 * @param {string} time - 체험 시간. ex) 11:00 - 12:30 형식.
 * @param {number} count - 체험 인원.
 * @param {number} price - 체험 가격.
 * @param {number} reservationId - 리뷰할 체험 고유 번호.
 */
const ReviewModal = ({
  title,
  url,
  date,
  time,
  count,
  price,
  reservationId,
}: Props) => {
  const [openModal, setOpenModal] = useState(false);
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
                  ? 'w-[375px] pb-[39px]'
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
                url={url}
                date={date}
                time={time}
                count={count}
                price={price}
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
