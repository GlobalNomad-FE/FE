import React from 'react';
import Image from 'next/image';
import ReviewForm from './ReviewForm';
import useMediaQuery from '@/hooks/useMediaQuery';

interface Props {
  title: string;
  url: string;
  date: string;
  time: string;
  count: number;
  price: number;
  reservationId: number;
}
/**
 * @param {string} title - 체험 이름.
 * @param {string} url - 체험 사진 경로.
 * @param {string} date - 체험 날짜. ex) 2023. 2. 14 형식.
 * @param {string} time - 체험 시간. ex) 11:00 - 12:30 형식.
 * @param {number} count - 체험 인원.
 * @param {number} price - 체험 가격.
 * @param {number} reservationId - 리뷰할 체험 고유 번호.
 */
const ReviewContent = ({
  title,
  url,
  date,
  time,
  count,
  price,
  reservationId,
}: Props) => {
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div
      className={`flex w-full flex-col ${
        isMobile ? 'gap-[12px]' : 'gap-[24px]'
      }`}
    >
      <div className="flex w-full justify-between">
        <div
          className={`relative rounded-[12px] overflow-hidden ${
            isMobile ? 'w-[100px] h-[100px]' : 'w-[126px] h-[126px]'
          }`}
        >
          <Image
            src={url}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div
          className={`flex flex-col text-nomad-black ${isMobile ? 'gap-[7px]' : 'gap-[13px]'}`}
        >
          <h2 className={isMobile ? 'text-body1-bold' : 'text-h3-bold'}>
            {title}
          </h2>
          <div className={isMobile ? 'text-body2-regular' : 'text-h4-regular'}>
            <span>{date}</span>
            <span className={isMobile ? 'mx-[2px]' : 'mx-[10px]'}>·</span>
            <span>{time}</span>
            <span className={isMobile ? 'mx-[2px]' : 'mx-[10px]'}>·</span>
            <span>{count} 명</span>
          </div>
          <div className="w-full border-t border-opacity-10 border-green200" />
          <span className={isMobile ? 'text-h3-bold' : 'text-[32px] font-bold'}>
            ₩{Intl.NumberFormat().format(price)}
          </span>
        </div>
      </div>
      <ReviewForm reservationId={reservationId} />
    </div>
  );
};

export default ReviewContent;
