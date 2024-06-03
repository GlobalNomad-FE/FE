import React from 'react';
import Image from 'next/image';
import ReviewForm from './ReviewForm';

interface Props {
  title: string;
  bannerImageUrl: string;
  date: string;
  startTime: string;
  endTime: string;
  headCount: number;
  totalPrice: number;
  reservationId: number;
}
/**
 * @param {string} title - 체험 이름.
 * @param {string} bannerImageUrl - 체험 사진 경로.
 * @param {string} date - 체험 날짜. ex) 2023. 2. 14 형식.
 * @param {string} startTime 체험시작 시간
 * @param {string} endTime 체험종료 시간
 * @param {number} headCount - 체험 인원.
 * @param {number} totalPrice - 체험 가격.
 * @param {number} reservationId - 리뷰할 체험 고유 번호.
 */
const ReviewContent = ({
  title,
  bannerImageUrl,
  date,
  startTime,
  endTime,
  headCount,
  totalPrice,
  reservationId,
}: Props) => {
  return (
    <div className="flex w-full flex-col mobile:gap-[12px] gap-[24px]">
      <div className="flex w-full justify-between items-center">
        <div className="relative rounded-[12px] overflow-hidden mobile:w-[100px] mobile:h-[100px] w-[126px] h-[126px]">
          <Image
            src={bannerImageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col text-nomad-black mobile:gap-[7px] gap-[13px]">
          <h2 className="mobile:text-body1-bold text-h3-bold">{title}</h2>
          <div className="mobile:text-body2-regular text-h4-regular">
            <span>{date}</span>
            <span className="mobile:mx-[2px] mx-[10px]">·</span>
            <span>
              {startTime} - {endTime}
            </span>
            <span className="mobile:mx-[2px] mx-[10px]">·</span>
            <span>{headCount} 명</span>
          </div>
          <div className="w-full border-t border-opacity-10 border-green200" />
          <span className="mobile:text-h3-bold text-title">
            ₩{Intl.NumberFormat().format(totalPrice)}
          </span>
        </div>
      </div>
      <ReviewForm reservationId={reservationId} />
    </div>
  );
};

export default ReviewContent;
