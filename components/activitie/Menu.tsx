'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useRef } from 'react';
import CancelReservation from '../commons/Popups/CancelReservation';

export default function Menu() {
  const [isKebabOpen, setIsKebabOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  // 메뉴 열고 닫기
  const handleKebabToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsKebabOpen(!isKebabOpen);
  };

  // 메뉴 밖에 부분 클릭시 닫히게 만드는 이벤트함수
  const handleKebabClose = (e: React.FocusEvent<HTMLButtonElement>) => {
    /** e.relatedTarget는 EventTarget | null이기 때문에 Node인지 확인해야한다! */
    if (
      !(e.relatedTarget instanceof Node) ||
      !optionsRef.current?.contains(e.relatedTarget)
    ) {
      setIsKebabOpen(false);
    }
  };

  const handleDeletePopupOpen = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="relative">
      <button onClick={handleKebabToggle} onBlur={handleKebabClose}>
        <Image
          src="/icons/meatball.svg"
          width={40}
          height={40}
          alt="메뉴아이콘"
        />
      </button>
      {isKebabOpen && (
        <div
          className="bg-white border border-gray200 rounded-md absolute right-0 w-40 z-[1]"
          ref={optionsRef}
        >
          <div className="px-[46px] py-[18px] cursor-pointer text-h4-regular text-gray600 hover:bg-green400 hover:text-green200">
            수정하기
          </div>
          <div
            className="px-[46px] py-[18px] cursor-pointer border-t border-gray200 text-h4-regular text-gray600 hover:bg-green400 hover:text-green200"
            onClick={handleDeletePopupOpen}
          >
            삭제하기
          </div>
        </div>
      )}
      {isPopupOpen && (
        <CancelReservation>정말 삭제하시겠습니까?</CancelReservation>
      )}
    </div>
  );
}
