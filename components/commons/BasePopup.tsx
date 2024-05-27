import Portal from '@/utils/Portal';
import React from 'react';
import Button from '@/components/commons/Button';

interface Props {
  isOpen: boolean;
  closePopup: () => void;
  children: React.ReactNode;
}

const BasePopup = ({
  isOpen,
  closePopup,
  children,
}: Props) => {
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
          className="fixed z-1 left-0 top-0 w-full h-full bg-black200 bg-opacity-45 flex items-center justify-center"
          onClick={handleClickPopupClose}
        >
          <div
            onClick={handleStopBubbling}
            className="w-[34rem] p-[2rem] bg-white rounded-lg pt-28 flex flex-col items-center justify-center"
          >
            <div className="text-h4-regular">{children}</div>
            <div className={'flex w-full mt-12 justify-end'}>
              <Button
                width={120}
                height={48}
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
