import Portal from '@/utils/Portal';
import React from 'react';
import Button from '@/components/commons/Button';

/**
 * @param {string} text - 팝업에 띄울 메세지
 * @param {number} numOfButtons - 팝업에 있는 버튼 갯수, 미입력시 기본값 1
 * @param {() => void} closePopup - 팝업을 닫는 함수
 */

interface Props {
  text: string;
  numOfButtons?: number;
  closePopup: () => void;
}

const BasePopup = ({ text, numOfButtons = 1 , closePopup}: Props) => {
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
      <div
        className="fixed z-1 left-0 top-0 w-full h-full bg-black200 bg-opacity-45 flex items-center justify-center"
        onClick={handleClickPopupClose}
      >
        <div
          onClick={handleStopBubbling}
          className="w-[34rem] p-[2rem] bg-white rounded-lg pt-28 flex flex-col items-center justify-center"
        >
          <div className="text-h4-regular">{text}</div>
          {numOfButtons === 2 ? (
            <div
              className={'flex w-full mt-12 justify-center gap-4'}
            >
              <Button text={"아니오"} width={120} height={48} fontSize={16} bgColor={"white"} textColor={"green"} border={true} borderColor={"green"} hover={true} onClick={handleClickPopupClose}/>
              <Button text={"취소하기"} width={120} height={48} fontSize={16} bgColor={"green"} textColor={"white"} hover={true} />
            </div>
          ) : (
            <div className={'flex w-full mt-12 justify-end'}>
              <Button text={"확인"} width={120} height={48} fontSize={16} bgColor={"green"} textColor={"white"} hover={true}  onClick={handleClickPopupClose}/>
            </div>
          )}
        </div>
      </div>
    </Portal>
  );
};

export default BasePopup;
