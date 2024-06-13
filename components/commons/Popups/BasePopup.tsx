import Portal from '@/utils/Portal';
import React, { useRef } from 'react';
import Button from '@/components/commons/Button';
import useMediaQuery from '@/hooks/useMediaQuery';

interface Props {
  isOpen: boolean;
  closePopup: () => void;
  children: React.ReactNode;
}

const BasePopup = ({ isOpen, closePopup, children }: Props) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const overlay = useRef(null);

  const handleClickOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlay.current) {
      closePopup();
    }
  };

  //팝업 끄기
  const handleClickPopupClose = () => {
    closePopup();
  };

  return (
    <Portal>
      {isOpen && (
        <div
          className="fixed z-50 left-0 top-0 w-full h-full bg-black200 bg-opacity-45 flex items-center justify-center"
          onClick={handleClickOverlay}
          ref={overlay}
        >
          <div className="bg-white rounded-[8px] flex flex-col items-center mobile:w-[327px] mobile:h-[220px] w-[540px] p-[28px] mobile:p-0">
            <div className="text-black200 text-h4-regular mt-[80px]">
              {children}
            </div>
            <div className="flex w-full mt-[45px] mobile:justify-center justify-end">
              <Button
                width={isMobile ? 138 : 120}
                height={isMobile ? 42 : 48}
                fontSize={16}
                btnColor={'nomadBlack'}
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
