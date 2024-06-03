import Image from 'next/image';

import { formatWage } from '@/utils/wageFormatter';
import Menu from '@/components/activitie/Menu';

interface ActivityType {
  title: string;
  price: number;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
}
const ExperienceManagement = ({
  bannerImageUrl,
  rating,
  reviewCount,
  title,
  price,
}: ActivityType) => {
  return (
    <div className="w-[800px] rounded-[24px] overflow-hidden flex border border-gray200 bg-white shadow-search-bar-custom mb-6">
      <div className="w-[204px] h-[204px] tablet:w-[156px] tablet:h-[156px] mobile:w-[128px] mobile:h-[128px] relative">
        <Image src={bannerImageUrl} alt="체험 이미지" fill objectFit="cover" />
      </div>
      <div className="flex flex-col justify-between px-6 py-[21px] w-full">
        <div>
          <div className="flex gap-[6px] text-body1-regular text-black200">
            <Image
              src="/icons/Star.svg"
              alt="별점 아이콘"
              width={19}
              height={19}
            />
            <p>
              {rating} ({reviewCount})
            </p>
          </div>
          <p className="text-h3-bold text-nomad-black">{title}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-[10px] text-gray600 text-body1-medium">
            <p className=" text-[24px] font-medium">{formatWage(price)}</p>
            <p>/인</p>
          </div>
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default ExperienceManagement;
