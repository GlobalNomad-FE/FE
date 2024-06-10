import Button from '@/components/commons/Button';
import SideNavigationMenu from '@/components/commons/SideNavigationMenu';
import data from '@/app/activities/mock.json';
import Gnb from '@/components/commons/gnb/gnb';
import Link from 'next/link';
import Experience from '@/components/commons/card/Experience';
import Footer from '@/components/commons/Footer';
import Image from 'next/image';

//TODO - 체험리스트 데이터 연동후 무한스크롤 구현해야함
export default function page() {
  const { activities } = data;
  return (
    <div>
      <Gnb />
      <main className="flex justify-center min-h-[100vh] max-h-[100%] px-6 bg-gray50 pt-[142px] pb-[72px] tablet:pt-[94px] mobile:pt-[94px]">
        <div className="flex gap-6 w-[1200px]">
          <SideNavigationMenu />
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between">
              <p className="text-title text-black">내 체험 관리</p>
              <Link href={'/activities/registration'}>
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
            {data.totalCount === 0 ? (
              <div className="flex flex-col flex-grow gap-5 items-center mt-[90px] tablet:mt-[64px] mobile:mt-[64px]">
                <div className="w-[130px] h-[177px] my-[31px] mx-[55px]tablet:w-[110px] tablet:h-[149px] mobile:w-[110px] mobile:h-[149px] relative">
                  <Image src="/icons/empty.svg" fill alt="빈 예약 내역" />
                </div>
                <p className="text-[1.5rem] font-medium text-gray500">
                  아직 등록한 체험이 없어요
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6 mt-[16px]">
                {activities.map((data) => (
                  <Experience
                    type="activities"
                    id={data.id}
                    key={data.id}
                    bannerImageUrl={data.bannerImageUrl}
                    rating={data.rating}
                    reviewCount={data.reviewCount}
                    title={data.title}
                    totalPrice={data.price}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
