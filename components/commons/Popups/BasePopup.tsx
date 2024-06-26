import Portal from '@/utils/Portal';
import React, { useRef } from 'react';
import Button from '@/components/commons/Button';
import useMediaQuery from '@/hooks/useMediaQuery';

interface Props {
  isOpen: boolean;
  closePopup: () => void;
  clickEvent?: () => void;
  children: React.ReactNode;
}

/**
 * BasePopup Props
 * @param {boolean} isOpen - 팝업이 열린상태인지 닫힌상태인지 알려주는 값.
 * @param {function} closePopup - 팝업을 닫기 위한 콜백함수.
 * @param {function} clickEvent - 확인 버튼을 눌렀을때 닫기 이외에 실행할 함수(선택사항)
 */
const BasePopup = ({ isOpen, closePopup, clickEvent, children }: Props) => {
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
    if (clickEvent) {
      clickEvent();
    }
  };

  return (
    <Portal>
      {isOpen && (
        <div
          className="fixed z-50 left-0 top-0 w-full h-full bg-black200 bg-opacity-45 flex items-center justify-center"
          onClick={handleClickOverlay}
          ref={overlay}
        >
          <div className="bg-white rounded-[8px] flex flex-col items-center mobile:w-[327px] mobile:h-[220px] w-[540px] p-[28px] mobile:p-0 mobile:px-5">
            <div className="text-black200 text-h4-regular mt-[80px] mobile:mt-[70px]">
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
