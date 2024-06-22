'use client';
import Image from 'next/image';
import Menu from '@/components/activity/Menu';
import { useRouter } from 'next/navigation';
import { ActivitiesExperienceType } from './ExperienceType';

/**
 * 내 체험 내역 관리 페이지의 카드 컴포넌트 입니다.
 * @param id 체험id
 * @param bannerImageUrl 체험 이미지
 * @param rating 별점
 * @param reviewCount 리뷰 수
 * @param title 체험 제목
 * @param totalPrice 금액
 * @param activityId 예약 ID
 */
const ActivitiesExperience = ({
  id,
  bannerImageUrl,
  rating,
  reviewCount,
  title,
  totalPrice,
  activityId = 0,
}: ActivitiesExperienceType) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`activities/${activityId}`)}
      className="max-w-[792px] h-[204px] tablet:h-[156px] mobile:h-[128px] rounded-[24px] flex text-black200 text-[16px] bg-white"
      style={{ boxShadow: '0px 4px 16px 0px rgba(17, 34, 17, 0.05)' }}
    >
      <div className="min-w-[204px] h-[204px] tablet:min-w-[156px] tablet:h-[156px] mobile:min-w-[128px] mobile:h-[128px] relative">
        <Image
          src={bannerImageUrl}
          alt="체험 이미지"
          fill
          object-fit="cover"
          className="rounded-l-[24px]"
        />
      </div>
      <div className="flex flex-col justify-between w-full h-full p-6 text-left tablet:p-[12px] mobile:p-[9px]">
        <div>
          <div className="flex gap-[6px]">
            <Image
              src="/icons/star-on.svg"
              alt="별점아이콘"
              width={19}
              height={19}
            />
            <span>
              {rating} ({reviewCount})
            </span>
          </div>
          <p className="text-[20px] tablet:text-[18px] mobile:text-[14px] font-bold mt-2 tablet:m-0 mobile:mt-[5px]">
            {title}
          </p>
        </div>
        <div className="h-10 mobile:h-[32px] flex justify-between mt-4 tablet:mt-[12px] mobile:mt-[5px] items-center mobile:mr-[3px]">
          <p className="text-[24px] tablet:text-[20px] mobile:text-[16px] font-medium">
            ₩{totalPrice.toLocaleString('ko-KR')} /인
          </p>
          <div className="">
            <Menu id={id} />
          </div>
        </div>
      </div>
    </button>
  );
};

export default ActivitiesExperience;
