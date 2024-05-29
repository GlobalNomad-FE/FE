'use client';

import React from 'react';
import Image from 'next/image';

export const CardResource = () => {
  return (
    <div className="relative h-[384px] w-[384px] overflow-hidden rounded-[20px] md:h-[384px] md:w-[384px] bg-gray600 ">
      <Image
        className="absolute z-0 scale-125 rounded-[20px] object-cover"
        fill
        src="/images/Banner.png"
        alt="배너"
      />
      <div className="from-0.1% absolute z-[1] h-full w-full rounded-[20px] bg-gradient-to-t from-black/80"></div>
      <div className="absolute bottom-[30px] z-[1] flex w-[384px] flex-col gap-[6px] px-[20px] py-[12px] text-[#ffffff] md:bottom-0 md:w-[384px] md:gap-[20px] md:py-[30px]">
        <div className="flex gap-[5px] text-[#ffffff]">
          <Image
            src="/icons/star-on.svg"
            width={20}
            height={20}
            alt="star icon"
          />
          <span className="text-[14px] font-[600] text-[#ffffff]">
            4.9 (793)
          </span>
        </div>
        <div className="line-clamp-2 w-[300px] break-keep text-[30px] font-[700] md:w-[230px] md:text-[30px] text-[#ffffff]">
          함께 배우면 즐거운 스트릿 댄스
        </div>
        <div className="flex gap-[5px] text-[20px] font-[700] md:text-[20px] text-[#ffffff]">
          <span className="text-[#ffffff]">₩ 38,000</span>
          <span className="self-center text-[14px] font-[400] text-[#a1a1a1]">
            / 인
          </span>
        </div>
      </div>
    </div>
  );
};

export const CardResourceCategory = () => {
  return (
    <div className="flex w-min  flex-col gap-[16px] text-[#ffffff]">
      <div className="relative h-[168px] w-[168px]  overflow-hidden rounded-[20px] md:h-[221px] md:w-[221px] xl:h-[283px] xl:w-[283px]">
        <div className=" absolute z-[1] flex w-[282px] flex-col gap-[10px] text-black200 md:w-[282px]">
          <div className="flex gap-[5px] text-[#ffffff]">
            <Image
              src="/icons/star-on.svg"
              width={20}
              height={20}
              alt="별모양 아이콘"
            />
            <span className="text-[16px] font-[500] text-black200">
              3.9 <span className="text-[#a1a1a1]">(108)</span>
            </span>
          </div>
          <div className=" text-[24px] font-[600] md:text-[24px] text-black200">
            피오르 체험
          </div>
          <div className="flex gap-[5px] text-[28px] font-[700] md:text-[28px] text-black200">
            <span className="text-black200">₩ 42,800</span>
            <span className="self-center text-[20px] font-[400] text-gray600 md:text-[20px]">
              / 인
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
