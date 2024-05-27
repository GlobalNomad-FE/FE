'use client'; // app라우터에서는 맨위에 이거 써야 훅 쓸수 있는것 같습니다

import React from 'react';
import ModalBox from '@/components/commons/ModalBox';
import useModalStore from '@/libs/modalStore';
import Button from '@/components/commons/Button';

export default function Page() {
  const { openModal, setOpenModal } = useModalStore();

  const handleOpenTestModal = () => {
    setOpenModal('openTestModal');
  };

  const handleOpenTest2Modal = () => {
    setOpenModal('openTest2Modal');
  };

  const buttons = [
    { text: '테스트모달', onClick: handleOpenTestModal },
    { text: '테스트모달2', onClick: handleOpenTest2Modal },
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
      <div className="flex items-center justify-center">
      <Button text={"안녕"} width={350} height={48} fontSize={16} btnColor={"green"} textColor={"white"} hover={true} onClick={() => alert('경고')}/>
      <Button text={"안녕"} width={68} height={18} fontSize={15} btnColor={"white"} textColor={"gray"} border={true} />
      <Button text={"안녕"} width={144} height={48} fontSize={20} btnColor={"gray"} textColor={"green"}/>
    </div>
      {openModal && <ModalBox />}
    </main>
  );
}
