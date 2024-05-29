'use client';

import React from 'react';
import Image from 'next/image';

export const CardResource = () => {
  return (
    <div className="relative h-[384px] w-[384px] overflow-hidden rounded-[20px] mobile:h-[186px] mobile:w-[186px] bg-gray600 ">
      <Image
        className="absolute z-0 scale-125 rounded-[20px] "
        fill
        src="/images/Banner.png"
        alt="배너"
      />
      <div className=" absolute z-[1] h-full w-full rounded-[20px] "></div>
      <div className="absolute bottom-[30px] z-[1] flex w-[384px] flex-col gap-[6px] px-[20px] py-[12px] text-[#ffffff] mobile:bottom-0 mobile:w-[166px] mobile:gap-[6px] mobile:py-[12px] mobile:px-[20px]">
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
        <div className=" w-[300px] break-keep text-[30px] font-[700] mobile:w-[184px] mobile:text-[18px] text-[#ffffff]">
          함께 배우면 즐거운 스트릿 댄스
        </div>
        <div className="flex gap-[5px] text-[20px] font-[700] mobile:text-[18px] text-[#ffffff]">
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
      <div className="relative h-[168px] w-[168px]  overflow-hidden rounded-[20px] mobile:h-[221px] mobile:w-[221px] xl:h-[283px] xl:w-[283px]">
        <div className=" absolute z-[1] flex w-[282px] flex-col gap-[10px] text-black200 mobile:w-[282px]">
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
          <div className=" text-[24px] font-[600] mobile:text-[24px] text-black200">
            피오르 체험
          </div>
          <div className="flex gap-[5px] text-[28px] font-[700] mobile:text-[28px] text-black200">
            <span className="text-black200">₩ 42,800</span>
            <span className="self-center text-[20px] font-[400] text-gray600 mobile:text-[20px]">
              / 인
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
