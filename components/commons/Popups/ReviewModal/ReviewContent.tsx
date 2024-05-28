import React from 'react';
import Image from 'next/image';
import ReviewForm from './ReviewForm';

const ReviewContent = () => {
  return (
    <div className="flex w-full flex-col gap-[24px]">
      <div className="flex w-full justify-between">
        <div className="relative w-[126px] h-[126px] rounded-[12px] overflow-hidden">
          <Image
            src="/images/스트릿댄스.png"
            alt="스트릿댄스"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col gap-[13px]">
          <h2 className="text-h3-bold">함께 배우면 즐거운 스트릿 댄스</h2>
          <div className="text-h4-regular">
            <span>2023. 2. 14</span>
            <span className="mx-[10px]">·</span>
            <span>11:00 - 12:30</span>
            <span className="mx-[10px]">·</span>
            <span>10명</span>
          </div>
          <div className="w-full border-t border-opacity-10 border-green200" />
          <span className="text-[32px] font-bold">₩10,000</span>
        </div>
      </div>
      <ReviewForm />
    </div>
  );
};

export default ReviewContent;
