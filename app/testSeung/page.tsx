'use client'; // app라우터에서는 맨위에 이거 써야 훅 쓸수 있는것 같습니다

import CardResource from '@/components/commons/CardResource';

//임시 데이터

const activity = {
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
};

export default function page() {
  return (
    <div>
      <CardResource activitiesData={activity} banner={false} />
    </div>
  );
}
