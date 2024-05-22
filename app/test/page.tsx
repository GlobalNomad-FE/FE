'use client'; // app라우터에서는 맨위에 이거 써야 훅 쓸수 있는것 같습니다

import ModalBox from '@/components/commons/ModalBox';
import useModalStore from '@/libs/modalStore';

export default function page() {
  const { openModal, setOpenModal } = useModalStore();
  const handleOpenTestModal = () => {
    setOpenModal('openTestModal');
  };

  const handleOpenTest2Modal = () => {
    setOpenModal('openTest2Modal');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <button
          className="mb-3 text-5xl p-5 rounded-lg bg-violet200"
          onClick={handleOpenTestModal}
        >
          테스트모달버튼
        </button>
        <button
          className="mb-3 text-5xl p-5 rounded-lg bg-violet200"
          onClick={handleOpenTest2Modal}
        >
          테스트2모달버튼
        </button>
      </div>
      {openModal && <ModalBox />}
    </main>
  );
}
