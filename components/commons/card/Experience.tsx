'use client';

import Image from 'next/image';
import { useState } from 'react';
import ReviewModal from '../Popups/ReviewModal/ReviewModal';

interface Reservation {
  id: number;
  title: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  headCount?: number;
  experienceStatus?: string;
  totalPrice: number;
  bannerImageUrl: string;
  rating?: number;
  reviewCount?: number;
  type: 'activities' | 'reservations';
}

/**
 * 이미지와 함께 체험정보와 예약상태를 볼 수 있는 카드 컴포넌트 입니다.
 * @param id 체험id
 * @param title 체험 제목
 * @param date 체험일
 * @param startTime 체험시작 시간
 * @param endTime 체험종료 시간
 * @param headCount 인원
 * @param experienceStatus 체험 상태. pending(보류), confirmed(확정), declined(거절) canceled(취소), completed(완료)
 * @param totalPrice 금액
 * @param bannerImageUrl 체험 이미지
 * @param rating 별점
 * @param reviewCount 리뷰 수
 * @param type 내 체험 관리 : 'activities' | 예약 내역 : 'reservations'
 */

const Experience = ({
  id,
  title,
  date,
  startTime,
  endTime,
  headCount,
  totalPrice,
  experienceStatus,
  bannerImageUrl,
  type,
  rating,
  reviewCount,
}: Reservation) => {
  const [status, setStatus] = useState(experienceStatus);
  const [isKebobOpen, setIsKebobOpen] = useState(false);

  const textProps = () => {
    const textPropsObj = { color: '', text: '-' };

    switch (status) {
      case 'pending':
        textPropsObj.color = 'text-blue200';
        textPropsObj.text = '예약 완료';
        break;
      case 'confirmed':
        textPropsObj.color = 'text-[#FF7C1D]';
        textPropsObj.text = '예약 승인';
        break;
      case 'declined':
        textPropsObj.color = 'text-red100';
        textPropsObj.text = '예약 거절';
        break;
      case 'canceled':
        textPropsObj.color = 'text-gray500';
        textPropsObj.text = '예약 취소';
        break;
      case 'completed':
        textPropsObj.color = 'text-gray500';
        textPropsObj.text = '체험 완료';
        break;
    }

    return textPropsObj;
  };

  // const handleWritingReviews = () => {
  //   //TODO : 후기 작성 모달 연결
  //   setModalOpen(true);
  // };

  const handleReservationCancellation = () => {
    setStatus('canceled');
    //TODO : 예약 취소 진행 api연결 필요 /4-13/my-reservations/{reservationId}
  };

  const handleKebobOpen = () => {
    setIsKebobOpen(!isKebobOpen);
  };

  return (
    <div className="max-w-[792px] h-[204px] tablet:h-[156px] mobile:h-[128px] rounded-[24px] flex text-black200 text-[16px] bg-white">
      <div className="min-w-[204px] h-[204px] tablet:min-w-[156px] tablet:h-[156px] mobile:min-w-[128px] mobile:h-[128px] relative">
        <Image
          src={bannerImageUrl}
          alt="체험 이미지"
          fill
          objectFit="cover"
          className="rounded-l-[24px]"
        />
      </div>
      <div className="flex flex-col justify-between w-[100%] p-6 tablet:p-[12px] mobile:p-[9px]">
        <div>
          {type === 'reservations' ? (
            <p className={`${textProps().color} font-bold mobile:text-[14px]`}>
              {textProps().text}
            </p>
          ) : (
            <div className="flex gap-[6px]">
              <Image
                src="/icons/Star.svg"
                alt="케밥 아이콘"
                width={19}
                height={19}
              />
              <span>
                {rating} ({reviewCount})
              </span>
            </div>
          )}
          <p className="text-[20px] tablet:text-[18px] mobile:text-[14px] font-bold mt-2 tablet:m-0 mobile:mt-[5px]">
            {title}
          </p>
          {type === 'reservations' && (
            <p className="text-[18px] tablet:text-[14px] mobile:text-[12px] mt-3 tablet:mt-[5px] mobile:mt-[5px]">
              {date} · {startTime} - {endTime} · {headCount}명
            </p>
          )}
        </div>
        <div className="h-10 mobile:h-[32px] flex justify-between mt-4 tablet:mt-[12px] mobile:mt-[5px] items-center mobile:mr-[3px]">
          <p className="text-[24px] tablet:text-[20px] mobile:text-[16px] font-mediu">{`₩${totalPrice.toLocaleString(
            'ko-KR',
          )}`}</p>
          <div className="">
            {status === 'pending' && (
              <button
                className="w-[144px] tablet:w-[112px] mobile:w-[80px] h-10 mobile:h-8 text-[16px] mobile:text-[14px] px-3 py-2 mobile:py-1 border rounded-md font-bold border-black200"
                onClick={() => handleReservationCancellation()}
              >
                예약 취소
              </button>
            )}
            {status === 'completed' && (
              <button
                className="w-[144px] tablet:w-[112px] mobile:w-[80px] h-10 mobile:h-8 text-[16px] mobile:text-[14px] px-3 py-2 mobile:py-1 border rounded-md font-bold bg-black200 text-white"
                onClick={() => handleReservationCancellation()}
              >
                후기 작성
              </button>
            )}
            {type === 'activities' && (
              <div className="relative">
                <Image
                  src="/icons/meatball.svg"
                  width={40}
                  height={40}
                  alt="케밥 아이콘"
                  className="cursor-pointer"
                  onClick={handleKebobOpen}
                />
                {isKebobOpen && (
                  <div className="absolute top-[48px] right-0 w-[180px] rounded-md bg-white shadow-search-bar-custom border z-10 cursor-pointer">
                    <p className="flex flex-col justify-center items-center h-[58px] border-b text-[18px] font-medium hover:bg-gray100">
                      수정하기
                    </p>
                    <p className="flex flex-col justify-center items-center h-[58px] border-b text-[18px] font-medium hover:bg-gray100">
                      삭제하기
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
