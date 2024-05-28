'use client';

import Image from 'next/image';
import { GetActivitiesList } from '@/types/activities';
import { useRouter } from 'next/navigation';

interface CardResourceProps {
  activitiesData: GetActivitiesList;
  banner: boolean;
}

// Mock 데이터
const mockActivitiesData: GetActivitiesList[] = [
  {
    address: '123 Main St, Anytown, USA',
    bannerImageUrl: 'https://example.com/banner1.jpg',
    category: 'Outdoor Activities',
    createdAt: '2024-05-28T12:00:00Z',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    id: 1,
    price: 10000,
    rating: 4.5,
    reviewCount: 50,
    title: 'Hiking Adventure',
    updatedAt: '2024-05-28T12:00:00Z',
    userId: 1,
  },
  // Add more mock data as needed
];

export default function CardResource({
  activitiesData,
  banner,
}: CardResourceProps) {
  const router = useRouter();

  // Find activity data by activityId
  const activityData = mockActivitiesData.find(
    (activity) => activity.id === activitiesData.id,
  );

  if (!activityData) {
    return <div>Activity not found</div>;
  }

  const handleClick = () => {
    router.push(`/activityDetail/${activitiesData.id}`);
  };

  return (
    <div onClick={handleClick}>
      <div>
        <Image src="" width={384} height={384} alt="배너 이미지" />
      </div>
      <div>
        <div>
          <Image
            src="/icons/star-on.svg"
            width={20}
            height={20}
            alt="별모양 아이콘"
          />
          {activitiesData.rating}
          &nbsp;
          <span> ({activitiesData.reviewCount})</span>
        </div>
        <div>{activitiesData.title}</div>
        <div>
          {activitiesData.price === 0 ? (
            '무료체험'
          ) : (
            <>
              ￦ {activitiesData.price.toLocaleString()} <span>/ 인</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
