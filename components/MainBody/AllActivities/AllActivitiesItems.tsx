import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Props {
  id: number;
  title: string;
  price: number;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
}

const AllActivitiesItems = ({
  id,
  title,
  price,
  bannerImageUrl,
  rating,
  reviewCount,
}: Props) => {
  const router = useRouter();
  return (
    <div className="text-black200 hover:-translate-y-5 tablet:hover:-translate-y-3 mobile:hover:-translate-y-2 duration-500">
      <div
        className="relative rounded-3xl overflow-hidden h-[224px] mainPcSize:w-[283px] mainPcSize:h-[283px] mobile:h-[168px] cursor-pointer"
        onClick={() => router.push(`/activities/${id}`)}
      >
        <div className="absolute bg-custom-gradient2 w-[224px] h-[224px] mainPcSize:w-[283px] mainPcSize:h-[283px] mobile:w-[168px] mobile:h-[168px] z-10" />
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
      <div
        className="text-2xl font-bold mt-[10px] mobile:text-lg hover:underline cursor-pointer w-full truncate"
        onClick={() => router.push(`/activities/${id}`)}
      >
        {title}
      </div>
      <div className="text-3xl mt-[15px] mobile:text-xl">
        ₩ {price.toLocaleString('ko-KR')}{' '}
        <span className="text-gray400 text-xl mobile:text-base">/ 인</span>
      </div>
    </div>
  );
};

export default AllActivitiesItems;
