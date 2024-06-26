'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import BasePopupTwoBtns from '../commons/Popups/BasePopupTwoBtns';
import { useDeleteActivity } from '@/apis/activities/mutation/useDeleteActivity';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export default function Menu({ id: activityId }: { id: number }) {
  const [isKebabOpen, setIsKebabOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const { mutate: deleteMutation } = useDeleteActivity(activityId);

  // 메뉴 열고 닫기
  const handleKebabToggle = () => {
    setIsKebabOpen(!isKebabOpen);
  };

  // 외부 클릭을 감지하여 케밥 메뉴를 닫습니다.
  useOutsideClick(ref, isKebabOpen, handleKebabToggle);

  const handleDeletePopupOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPopupOpen(!isPopupOpen);
  };

  const handleDeleteData = () => {
    deleteMutation(
      { activityId },
      {
        onError: (error: AxiosError<{ message: string }>) => {
          if (error.response?.status === 401) {
            toast.error('로그인 후 이용 해주세요.');
            return;
          }
          toast.error(error.response?.data.message);
        },
      },
    );
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className="relative">
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
            onClick={(e) => {
              e.preventDefault();
              router.push(`/activities/register/${activityId}`);
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
      {isPopupOpen && (
        <BasePopupTwoBtns
          buttonText={'삭제하기'}
          isOpen={isPopupOpen}
          closePopup={() => {
            setIsPopupOpen(false);
          }}
          clickEvent={handleDeleteData}
        >
          정말 삭제 하시겠습니까?
        </BasePopupTwoBtns>
      )}
    </div>
  );
}
