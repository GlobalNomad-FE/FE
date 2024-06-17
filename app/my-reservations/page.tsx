'use client';
import { useState, useEffect } from 'react';
import Gnb from '@/components/commons/gnb/gnb';
import SideNavigationMenu from '@/components/commons/SideNavigationMenu';
import FilterDropdown from '@/components/commons/FilterDropdown';
import Image from 'next/image';
import Footer from '@/components/commons/Footer';
import useGetMyReservations from '@/apis/my-reservations/useGetMyReservations';
import ReservationsExperience from '@/components/commons/card/ReservationsExperience';

interface Activity {
  bannerImageUrl: string;
  title: string;
  id: number;
}

interface Reservation {
  id: number;
  activity: Activity;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
}

// pending   - ( 예약 완료 )
// confirmed - ( 예약 승인 )
// declined  - ( 예약 거절 )
// canceled  - ( 예약 취소 )
// completed - ( 체험 완료 )
const statusArr: Array<
  'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed'
> = ['pending', 'canceled', 'confirmed', 'declined', 'completed'];

const ITEMS_PER_PAGE = 5; // 페이지당 표시할 항목 수

const MyReservations = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [page, setPage] = useState(1); // 현재 페이지 상태 추가
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const { data, error, isLoading } = useGetMyReservations(); // API 데이터 가져오기

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    setPage(1); // 필터 변경 시 페이지를 1로 초기화
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 데이터 필터링 및 페이지에 따른 데이터 슬라이싱
  useEffect(() => {
    if (!data) return;

    const filteredReservations =
      selectedIndex !== null
        ? data.reservations
            .filter((item) => item.status === statusArr[selectedIndex])
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
            )
        : data.reservations.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          );
    setReservations((prevReservations) => [
      ...(page === 1 ? [] : prevReservations), // 페이지 1이면 기존 데이터 초기화
      ...filteredReservations.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE,
      ),
    ]);
  }, [data, selectedIndex, page]);

  return (
    <div>
      <Gnb />
      <main className="flex justify-center min-h-[100vh] max-h-[100%] px-6 bg-gray50 pt-[142px] pb-[72px]">
        <div className="flex gap-6 w-[1200px]">
          <SideNavigationMenu />
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between">
              <p className="text-[2rem] font-bold text-nomad-black">예약내역</p>
              {data?.totalCount !== 0 && (
                <FilterDropdown type="bookingPage" onSelect={handleSelect} />
              )}
            </div>
            {data?.totalCount === 0 ? (
              <div className="flex flex-col flex-grow gap-5 items-center mt-[90px]">
                <Image
                  src="/icons/empty.svg"
                  className="my-[31px] mx-[55px]"
                  width={130}
                  height={177}
                  alt="빈 예약 내역"
                />
                <p className="text-[1.5rem] font-medium text-gray500">
                  아직 등록한 체험이 없어요
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6 mt-[16px]">
                {reservations.map((item) => (
                  <ReservationsExperience
                    key={item.id}
                    id={item.id}
                    title={item.activity.title}
                    date={item.date}
                    startTime={item.startTime}
                    endTime={item.endTime}
                    headCount={item.headCount}
                    totalPrice={item.totalPrice}
                    experienceStatus={item.status}
                    bannerImageUrl={item.activity.bannerImageUrl}
                    activityId={item.activity.id}
                    reviewSubmitted={item.reviewSubmitted}
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
};

export default MyReservations;
