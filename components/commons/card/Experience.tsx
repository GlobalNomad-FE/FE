'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Reservation {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  headCount: number;
  experienceStatus: string;
  totalPrice: number;
  bannerImageUrl: string;
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
}: Reservation) => {
  const [status, setStatus] = useState(experienceStatus);

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

  const handleWritingReviews = () => {
    //TODO : 후기 작성 모달 연결
  };

  const handleReservationCancellation = () => {
    setStatus('canceled');
    //TODO : 예약 취소 진행 api연결 필요 /4-13/my-reservations/{reservationId}
  };

  return (
    <div className="w-[792px] h-[204px] tablet:w-[429px] tablet:h-[156px] mobile:w-[344px] mobile:h-[128px] rounded-[24px] flex justify-between overflow-hidden">
      <div className="w-[204px] h-[204px] tablet:w-[156px] tablet:h-[156px] mobile:w-[128px] mobile:h-[128px]">
        <Image
          src={bannerImageUrl}
          alt="체험 이미지"
          width={204}
          height={204}
        />
      </div>
      <div className="w-[588px] tablet:w-[290px] mobile:w-[216px] bg-white p-6 tablet:p-3 mobile:p-3">
        <p className={`${textProps().color} font-bold mobile:text-[14px]`}>
          {textProps().text}
        </p>
        <p className="text-xl tablet:text-[18px] mobile:text-[14px] font-bold">
          {title}
        </p>
        <p className="text-lg tablet:text-[14px] mobile:text-[12px] mt-3 tablet:mt-0 mobile:mt-0">
          {date} · {startTime} - {endTime} · {headCount}명
        </p>
        <div className="flex justify-between mt-4 tablet:mt-1 mobile:mt-1 items-end">
          <p className="text-[24px] tablet:text-[20px] mobile:text-[16px] font-medium ">{`₩${totalPrice.toLocaleString(
            'ko-KR',
          )}`}</p>
          {status === 'pending' ? (
            <button
              className="w-[144px] tablet:w-[112px] mobile:w-[80px] h-[40px] mobile:h-[32px] mobile:text-[14px] px-3 py-2 mobile:py-1 border rounded-md font-bold"
              onClick={() => handleReservationCancellation()}
            >
              예약취소
            </button>
          ) : (
            status === 'completed' && (
              <button
                className="w-[144px] tablet:w-[112px] mobile:w-[80px] h-[40px] mobile:h-[32px] mobile:text-[14px] px-3 py-2 mobile:py-1 border rounded-md font-bold bg-black200 text-white"
                onClick={() => handleWritingReviews()}
              >
                후기작성
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Experience;
