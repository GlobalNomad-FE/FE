import React from 'react';
import Image from 'next/image';

export default function Review({ data }) {
  return (
    <div className="border-t border-gray200 py-[40px]">
      <p className="text-h3-bold text-nomad-black">후기</p>
      <div className="flex gap-4 items-center">
        <p className="text-[50px] text-nomad-black font-semibold leading-normal ">
          {data.rating}
        </p>
        <div className="flex flex-col gap-[8px]">
          <p>매우 만족</p>
          <div className="flex gap-[6px] items-center">
            <Image
              src="/icons/Star.svg"
              alt="별점아이콘"
              width={18}
              height={18}
            />
            <p className="text-body2-regular text-nomad-black">
              {data.reviewCount}개 후기
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
