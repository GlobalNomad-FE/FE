import React from 'react';
import Image from 'next/image';

interface Props {
  title: string;
  price: number;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
}

const AllActivitiesItems = ({
  title,
  price,
  bannerImageUrl,
  rating,
  reviewCount,
}: Props) => {
  return (
    <>
      <div>
        <div className="relative rounded-3xl overflow-hidden text-black200 w-[224px] h-[224px] minPc:w-[283px] minPc:h-[283px] mobile:w-[168px] mobile:h-[168px]">
          <div className="absolute bg-custom-gradient2 w-[224px] h-[224px] minPc:w-[283px] minPc:h-[283px] mobile:w-[168px] mobile:h-[168px] z-10" />
          <Image src={bannerImageUrl} alt={title} fill objectFit="cover" />
        </div>
        <div className="flex gap-[5px] text-base mt-[16px]">
          <Image
            src="/icons/star-on.svg"
            width={20}
            height={20}
            alt="star icon"
          />
          {rating} <span className="gray400">({reviewCount})</span>
        </div>
        <div className="text-2xl font-bold mt-[10px] mobile:text-lg">
          {title}
        </div>
        <div className="text-3xl mt-[15px] mobile:text-xl">
          ₩ {price.toLocaleString('ko-KR')}{' '}
          <span className="text-gray400 text-xl mobile:text-base">/ 인</span>
        </div>
      </div>
    </>
  );
};

export default AllActivitiesItems;
