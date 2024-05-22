import usePopupStore from '@/libs/popupStore';
import React from 'react';

const PopupBox = () => {
  //zustand로 전역상태관리 변수를 사용하기위해 정의함
  const { openPopup, setOpenPopup } = usePopupStore();

  //모달 안쪽 클릭시 모달이 꺼지는 현상을 없애기위해 버블링 막음
  const handleStopBubbling = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  //모달 바깥쪽 클릭시 모달이 꺼지는 기능
  const handleClickPopupClose = () => {
    setOpenPopup('');
  };

  return (
    //전체화면을 덮을 오버레이 div
    <div
      className="fixed z-1 left-0 top-0 w-full h-full bg-black200 bg-opacity-45 flex items-center justify-center"
      onClick={handleClickPopupClose}
    >
      <div
        onClick={handleStopBubbling}
        className="w-[54rem] p-[2.8rem] bg-white rounded-[8px] pt-[10em] flex flex-col items-center justify-center"
      >
        <div className="text-black200 text-[1.8rem]">{openPopup}</div>
        {openPopup === '예약을 취소하시겠어요?' ? (
          <div className={'flex w-full mt-[4.5rem] justify-center gap-[1rem]'}>
            <button
              onClick={handleClickPopupClose}
              className="text-[1.6rem] w-[12.8rem] h-[4.8rem] rounded-[8px] bg-white text-green200 cursor-pointer flex items-center justify-center border border-green200 duration-500 hover:text-[1.9rem] hover:w-[12.2rem] hover:h-[4.6rem] hover:mx-[0.3rem] hover:my-[0.1rem]"
            >
              아니오
            </button>
            <button
              // Todo: onClick={취소하는함수}
              className="text-[1.6rem] w-[12.8rem] h-[4.8rem] rounded-[8px] bg-green200 text-white cursor-pointer flex items-center justify-center duration-500 hover:text-[1.9rem] hover:w-[12.2rem] hover:h-[4.6rem] hover:mx-[0.3rem] hover:my-[0.1rem]"
            >
              취소하기
            </button>
          </div>
        ) : (
          <div className={'flex w-full mt-[4.5rem] justify-end'}>
            {/* 반응형 할때 justify-end를 center로 바꾸기 */}
            <button
              onClick={handleClickPopupClose}
              className="text-[1.6rem] w-[12.8rem] h-[4.8rem] rounded-[8px] bg-green200 text-white cursor-pointer flex items-center justify-center duration-500 hover:text-[1.9rem] hover:w-[12.2rem] hover:h-[4.6rem] hover:mx-[0.3rem] hover:my-[0.1rem]"
            >
              확인
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupBox;
