import Portal from '@/utils/Portal';
import React, { useState } from 'react';
import Button from '@/components/commons/Button';
import Image from 'next/image';
import ReviewContent from './ReviewContent';
import useMediaQuery from '@/hooks/useMediaQuery';

const ReviewModal = () => {
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
        width={150}
        height={50}
        fontSize={15}
        btnColor={'green'}
        textColor={'white'}
        hover={true}
        onClick={handleOpenModal}
      >
        후기작성
      </Button>
      {/* 모달 여기부터 아래 끝까지 처럼 사용하면 됨  */}
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
                <h1 className="text-h1">후기 작성</h1>
                <Image
                  src="/icons/btn-X-big.svg"
                  alt="닫기 버튼"
                  width={40}
                  height={40}
                  onClick={handleCloseModal}
                  className="cursor-pointer"
                />
              </div>
              <ReviewContent />
            </div>
          </div>
        )}
      </Portal>
    </>
  );
};

export default ReviewModal;
