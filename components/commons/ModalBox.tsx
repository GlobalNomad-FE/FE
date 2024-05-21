import useModalStore from '@/libs/modalStore';
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
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  //모달 바깥쪽 클릭시 모달이 꺼지는 기능
  const handleClickModalOutside = () => {
    setOpenModal('');
  };

  return (
    //전체화면을 덮을 오버레이 div
    <div
      className="fixed z-1 left-0 top-0 w-full h-full bg-black200 bg-opacity-40 flex items-center justify-center"
      onClick={handleClickModalOutside}
    >
      {/* 들어온 변수에 맞는 모달 컴포넌트를 띄움 */}
      <div
        onClick={handleModalClick}
        className="p-6 bg-white rounded-lg shadow-lg"
      >
        <h1 className="text-black200 text-2xl font-bold">{modalName[openModal][1]}</h1>
        {modalName[openModal][0]}
      </div>
    </div>
  );
};

export default ModalBox;
