'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useRef } from 'react';
import CancelReservation from '../commons/Popups/CancelReservation';
import { useRouter, usePathname } from 'next/navigation';
import { useOutsideClick } from '@/hooks/useOutsideClick';

export default function Menu() {
  const [isKebabOpen, setIsKebabOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  // 메뉴 열고 닫기
  const handleKebabToggle = () => {
    setIsKebabOpen(!isKebabOpen);
  };

  // 외부 클릭을 감지하여 케밥 메뉴를 닫습니다.
  useOutsideClick(ref, isKebabOpen, handleKebabToggle);

  const handleDeletePopupOpen = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="relative">
      <button onClick={handleKebabToggle}>
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
          ref={ref}
        >
          <div
            className="px-[46px] py-[18px] cursor-pointer text-h4-regular text-gray600 hover:bg-green400 hover:text-green200"
            onClick={() => {
              router.push(
                '/',
                //   {
                //   pathname: '/',
                //   query: { pid: data.activityId } =>나중에 수정페이지로 activityId 넘겨줘야함
                // }
              );
            }}
          >
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
      {/* {isPopupOpen && (
        <CancelReservation>정말 삭제하시겠습니까?</CancelReservation>
      )} */}
    </div>
  );
}