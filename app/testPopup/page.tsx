'use client'; // app라우터에서는 맨위에 이거 써야 훅 쓸수 있는것 같습니다

import React from 'react';
import usePopupStore from '@/libs/popupStore';
import PopupBox from '@/components/commons/PopupBox';

export default function Page() {
  const { openModalIfTextExists, setOpenModalIfTextExists } = usePopupStore();

  const handleOpenPopup = (message: string) => {
    setOpenModalIfTextExists(message);
  };

  const buttons = [
    { text: '가입완료', onClick: () => handleOpenPopup('가입이 완료되었습니다!') },
    { text: '예약취소', onClick: () => handleOpenPopup('예약을 취소하시겠어요?') },
    { text: '비밀번호 불일치', onClick: () => handleOpenPopup('비밀번호가 일치하지 않습니다.') },
    { text: '사용중인이메일', onClick: () => handleOpenPopup('이미 사용중인 이메일입니다.') },
    { text: '예약완료', onClick: () => handleOpenPopup('예약이 완료되었습니다.') },
    { text: '체험등록완료', onClick: () => handleOpenPopup('체험 등록이 완료되었습니다') },
  ];

  return (
    <main className="p-[5rem]">
      <div className="grid grid-cols-8 gap-6">
        {buttons.map((button, index) => (
          <button
            key={index}
            className="text-body1-regular p-1 rounded-[8px] bg-green200"
            onClick={button.onClick}
          >
            {button.text}
          </button>
        ))}
      </div>
      {openModalIfTextExists && <PopupBox />}
    </main>
  );
}
