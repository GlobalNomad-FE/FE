'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import BasePopupTwoBtns from '../commons/Popups/BasePopupTwoBtns';
import { useDeleteActivites } from '@/apis/activities/mutaion/useDeleteActivites';
import { AxiosError } from 'axios';
import BasePopup from '../commons/Popups/BasePopup';

export default function Menu({ id: activityId }: { id: number }) {
  const [isKebabOpen, setIsKebabOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [errorMessage, setErroeMessage] = useState('');
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const { mutate: deleteMutation } = useDeleteActivites(activityId);

  // 메뉴 열고 닫기
  const handleKebabToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsKebabOpen(!isKebabOpen);
  };

  // 외부 클릭을 감지하여 케밥 메뉴를 닫습니다.
  useOutsideClick(ref, isKebabOpen, () => handleKebabToggle);

  const handleDeletePopupOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPopupOpen(!isPopupOpen);
  };

  const handleDeleteData = () => {
    deleteMutation(
      { activityId },
      {
        onError: (error: AxiosError) => {
          setIsErrorPopupOpen(true);
          switch (error.response?.status) {
            case 400:
              setErroeMessage('신청 예약이 있는 체험은 삭제할 수 없습니다.');
              break;
            case 401:
              setErroeMessage('로그인을 해주세요.');
              break;
            case 403:
              setErroeMessage('본인의 체험만 삭제할 수 있습니다.');
              break;
            case 404:
              setErroeMessage('존재하지 않는 체험입니다.');
              break;
            default:
              setErroeMessage('다시 시도해주세요.');
              break;
          }
        },
      },
    );
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
      {isErrorPopupOpen && (
        <BasePopup
          isOpen={isErrorPopupOpen}
          closePopup={() => {
            setIsErrorPopupOpen(false);
          }}
        >
          {errorMessage}
        </BasePopup>
      )}
    </div>
  );
}
