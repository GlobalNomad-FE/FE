'use client';

import Portal from '@/utils/Portal';
import React, { useState } from 'react';
import Button from '@/components/commons/Button';
import Image from 'next/image';

const CancelReservation = ({ children }: { children: React.ReactNode }) => {
  const [openPopup, setOpenPopup] = useState(false);

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
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
        onClick={handleOpenPopup}
      >
        예약취소
      </Button>
      <Portal>
        {openPopup && (
          <div
            className="fixed z-20 left-0 top-0 w-full h-full bg-black200 bg-opacity-45 flex items-center justify-center"
            onClick={handleClosePopup}
          >
            <div
              onClick={handleStopBubbling}
              className="w-[298px] p-[24px] bg-white rounded-[12px] flex flex-col items-center justify-center"
            >
              <Image
                src="/icons/cancel-reservation.svg"
                alt="체크 버튼"
                width={24}
                height={24}
              />
              <div className="text-h4-regular mt-4">{children}</div>
              <div className={'flex w-full mt-8 justify-center gap-2'}>
                <Button
                  width={80}
                  height={38}
                  fontSize={14}
                  textBold={true}
                  btnColor={'white'}
                  textColor={'green'}
                  border={true}
                  borderColor={'green'}
                  hover={true}
                  onClick={handleClosePopup}
                >
                  아니오
                </Button>
                <Button
                  width={80}
                  height={38}
                  fontSize={14}
                  textBold={true}
                  btnColor={'green'}
                  textColor={'white'}
                  hover={true}
                >
                  취소하기
                </Button>
              </div>
            </div>
          </div>
        )}
      </Portal>
    </>
  );
};

export default CancelReservation;
