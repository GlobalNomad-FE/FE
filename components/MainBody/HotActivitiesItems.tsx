import React from 'react';
import Image from 'next/image';

interface Props {
  title: string;
  price: number;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
}

const HotActivitiesItems = ({
  title,
  price,
  bannerImageUrl,
  rating,
  reviewCount,
}: Props) => {
  return (
    <div className="relative min-w-[384px] min-h-[384px] rounded-3xl overflow-hidden">
      <div className="absolute bg-custom-gradient w-[384px] h-[384px] z-10" />
      <Image src={bannerImageUrl} alt={title} fill objectFit="cover" />
      <div className="text-white text-body2-bold absolute top-[170px] z-20 py-[30px] px-[20px] flex flex-col gap-[20px]">
        <div className="flex gap-[5px]">
          <Image
            src="/icons/star-on.svg"
            width={20}
            height={20}
            alt="star icon"
          />
          {rating} ({reviewCount})
        </div>
        <div className="text-3xl font-bold w-[230px] truncate">{title}</div>
        <div className="text-h3-bold">
          ₩ {price.toLocaleString('ko-KR')}{' '}
          <span className="text-gray400 text-body2-regular">/ 인</span>
        </div>
      </div>
    </div>
  );
};

export default HotActivitiesItems;
