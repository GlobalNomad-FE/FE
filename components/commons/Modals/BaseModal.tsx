import Portal from '@/utils/Portal';
import React from 'react';
import Image from 'next/image';

interface Props {
  title: string;
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const BaseModal = ({ title, isOpen, closeModal, children }: Props) => {
  //모달 끄기
  const handleClickModalClose = () => {
    closeModal();
  };
  //모달 안쪽 클릭시 모달이 꺼지는 현상을 없애기위해 버블링 막음
  const handleStopBubbling = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <Portal>
      {isOpen && (
        <div
          className="fixed z-20 left-0 top-0 w-full h-full bg-black200 bg-opacity-45 flex items-center justify-center"
          onClick={handleClickModalClose}
        >
          <div
            onClick={handleStopBubbling}
            className="px-[24px] bg-white rounded-lg pt-28 flex flex-col items-center justify-center"
          >
            <div className="flex justify-between items-center">
              <h1 className="text-black200 text-h1">{title}</h1>
              <Image
                src="/icons/btn-X-big.svg"
                alt="닫기 버튼"
                width={40}
                height={40}
                onClick={handleClickModalClose}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </Portal>
  );
};

export default BaseModal;
