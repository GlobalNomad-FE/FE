import Button from '@/components/commons/Button';
import SideNavigationMenu from '@/components/commons/SideNavigationMenu';
import ExperienceManagement from '@/components/commons/card/ExperienceManagement';
import data from '@/app/activities/mock.json';
import Gnb from '@/components/commons/gnb/gnb';
import Link from 'next/link';

export default function page() {
  const { activities } = data;
  return (
    <div>
      <Gnb />
      <div className="mt-[142px] flex gap-6 mx-6 justify-center mobile:justify-start  ">
        <SideNavigationMenu />
        <div className="flex flex-col gap-6">
          <div className="flex justify-between max-w-[800px] ">
            <p className="text-title text-black">내 체험 관리</p>
            <Link href={'/'}>
              <Button
                width={120}
                height={45}
                fontSize={16}
                textBold={true}
                btnColor={'nomadBlack'}
                textColor={'white'}
                rounded={4}
                style={{ cursor: 'pointer' }}
              >
                체험 등록하기
              </Button>
            </Link>
          </div>
          <div className="relative">
            {activities.map((data) => (
              <ExperienceManagement
                key={data.id}
                bannerImageUrl={data.bannerImageUrl}
                rating={data.rating}
                reviewCount={data.reviewCount}
                title={data.title}
                price={data.price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
