'use client'; // app라우터에서는 맨위에 이거 써야 훅 쓸수 있는것 같습니다

import React, { useState } from 'react';
import PopupBox from '@/components/commons/PopupBox';

export default function Page() {
  const [openPopup, setOpenPopup] = useState(false);
  const [popupText, setPopupText] = useState('');
  const [buttonNum, setButtonNum] = useState(1);

  const signupFinishedPopup = () => {
    setOpenPopup(true);
    setPopupText('가입이 완료되었습니다!');
    setButtonNum(1);
  };

  const cancelReservationPopup = () => {
    setOpenPopup(true);
    setPopupText('예약을 취소하시겠어요?');
    setButtonNum(2);
  };

  const closePopup = () => {
    setOpenPopup(false);
  };

  return (
    <main className="p-[5rem] text-white flex justify-center gap-20">
      <button
        className="text-body1-regular p-1 rounded-[8px] bg-green200 w-64 h-16"
        onClick={signupFinishedPopup}
      >
        가입완료
      </button>
      <button
        className="text-body1-regular p-1 rounded-[8px] bg-green200 w-64 h-16"
        onClick={cancelReservationPopup}
      >
        예약취소
      </button>
      {openPopup && <PopupBox text={popupText} numOfButtons={buttonNum} closePopup={closePopup}/>}
    </main>
  );
}
