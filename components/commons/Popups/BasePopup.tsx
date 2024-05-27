import Portal from '@/utils/Portal';
import React from 'react';
import Button from '@/components/commons/Button';
import useMediaQuery from '@/hooks/useMediaQuery';

interface Props {
  isOpen: boolean;
  closePopup: () => void;
  children: React.ReactNode;
}

const BasePopup = ({ isOpen, closePopup, children }: Props) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  //모달 끄기
  const handleClickPopupClose = () => {
    closePopup();
  };
  //모달 안쪽 클릭시 모달이 꺼지는 현상을 없애기위해 버블링 막음
  const handleStopBubbling = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <Portal>
      {isOpen && (
        <div
          className="fixed z-20 left-0 top-0 w-full h-full bg-black200 bg-opacity-45 flex items-center justify-center"
          onClick={handleClickPopupClose}
        >
          <div
            onClick={handleStopBubbling}
            className={`bg-white rounded-[8px] flex flex-col items-center ${
              isMobile ? 'w-[327px] h-[220px]' : 'w-[540px] p-[28px]'
            }`}
          >
            <div className="text-h4-regular mt-[80px]">{children}</div>
            <div
              className={`flex w-full mt-[45px] ${
                isMobile ? 'justify-center' : 'justify-end'
              }`}
            >
              <Button
                width={isMobile ? 138 : 120}
                height={isMobile ? 42 : 48}
                fontSize={16}
                btnColor={'green'}
                textColor={'white'}
                hover={true}
                onClick={handleClickPopupClose}
              >
                확인
              </Button>
            </div>
          </div>
        </div>
      )}
    </Portal>
  );
};

export default BasePopup;
