import useModalStore from '@/libs/modalStore';
import Image from 'next/image';
import React from 'react';
import TestModal from '../Modals/TestModal';
import TestModal2 from '../Modals/TestModal2';

interface ModalName {
  [key: string]: [React.ReactNode, string];
}

const ModalBox = () => {
  //zustand로 전역상태관리 변수를 사용하기위해 정의함
  const { openModal, setOpenModal } = useModalStore();

  //전역변수로 받은 모달의 이름을 오픈할 모달의 컴포넌트와 1:1 일치시킴
  const modalName: ModalName = {
    openTestModal: [<TestModal />, '테스트'],
    openTest2Modal: [<TestModal2 />, '테스트2'],
  };

  //모달 안쪽 클릭시 모달이 꺼지는 현상을 없애기위해 버블링 막음
  const handleStopBubbling = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  //모달 바깥쪽 클릭시 모달이 꺼지는 기능
  const handleClickModalClose = () => {
    setOpenModal('');
  };

  return (
    //전체화면을 덮을 오버레이 div
    <div
      className="fixed z-1 left-0 top-0 w-full h-full bg-black200 bg-opacity-45 flex items-center justify-center"
      onClick={handleClickModalClose}
    >
      {/* 들어온 변수에 맞는 모달 컴포넌트를 띄움 */}
      <div
        onClick={handleStopBubbling}
        className="p-[3.5rem] bg-white rounded-[24px]"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-black200 text-h1">{modalName[openModal][1]}</h1>
          <Image
            src="/icons/btn-X-big.svg"
            alt="닫기 버튼"
            width={40}
            height={40}
            onClick={handleClickModalClose}
            className="cursor-pointer"
          />
        </div>
        {modalName[openModal][0]}
      </div>
    </div>
  );
};

export default ModalBox;
