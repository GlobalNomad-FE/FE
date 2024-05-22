'use client'; // app라우터에서는 맨위에 이거 써야 훅 쓸수 있는것 같습니다

import React from 'react';
import ModalBox from '@/components/commons/ModalBox';
import PopupBox from '@/components/commons/PopupBox';
import useModalStore from '@/libs/modalStore';
import usePopupStore from '@/libs/popupStore';

export default function Page() {
  const { openModal, setOpenModal } = useModalStore();
  const { openPopup, setOpenPopup } = usePopupStore();

  const handleOpenTestModal = () => {
    setOpenModal('openTestModal');
  };

  const handleOpenTest2Modal = () => {
    setOpenModal('openTest2Modal');
  };

  const handleOpenTestPopup = () => {
    setOpenPopup('가입이 완료되었습니다!');
  };

  const handleOpenTestPopup2 = () => {
    setOpenPopup('예약을 취소하시겠어요?');
  };

  const handleOpenTestPopup3 = () => {
    setOpenPopup('비밀번호가 일치하지 않습니다.');
  };

  const handleOpenTestPopup4 = () => {
    setOpenPopup('이미 사용중인 이메일입니다.');
  };

  const handleOpenTestPopup5 = () => {
    setOpenPopup('예약이 완료되었습니다.');
  };

  const handleOpenTestPopup6 = () => {
    setOpenPopup('체험 등록이 완료되었습니다');
  };

  const buttons = [
    { text: '테스트모달', onClick: handleOpenTestModal },
    { text: '테스트모달2', onClick: handleOpenTest2Modal },
    { text: '가입완료', onClick: handleOpenTestPopup },
    { text: '예약취소', onClick: handleOpenTestPopup2 },
    { text: '비밀번호 불일치', onClick: handleOpenTestPopup3 },
    { text: '사용중인이메일', onClick: handleOpenTestPopup4 },
    { text: '예약완료', onClick: handleOpenTestPopup5 },
    { text: '체험등록완료', onClick: handleOpenTestPopup6 },
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
      {openModal && <ModalBox />}
      {openPopup && <PopupBox />}
    </main>
  );
}
