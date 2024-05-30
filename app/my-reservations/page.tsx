'use client';
import { useState, useEffect } from 'react';
import Gnb from '@/components/commons/gnb/gnb';
import SideNavigationMenu from '@/components/commons/SideNavigationMenu';
import FilterDropdown from '@/components/commons/FilterDropdown';
import data from './mock.json';
import Image from 'next/image';
import useMediaQuery from '@/hooks/useMediaQuery';
import Experience from '@/components/commons/card/Experience';
import ReviewModal from '@/components/commons/Popups/ReviewModal/ReviewModal';

interface Activity {
  bannerImageUrl: string;
  title: string;
  id: number;
}

interface Reservation {
  id: number;
  activity: Activity;
  status: string;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
}

// pending   - 보류중 ( 예약 신청 ) 현재는 예약 완료
// confirmed  - 승인됨 ( 예약 승인 )
// declined  - 거부됨 ( 예약 거절 )
// canceled  - 취소된 ( 예약 취소 )
// completed - 완전한 ( 체험 완료 )
const statusArr = ['pending', 'canceled', 'confirmed', 'declined', 'completed'];

const ITEMS_PER_PAGE = 5; // 페이지당 표시할 항목 수

const MyReservations = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [page, setPage] = useState(1); // 현재 페이지 상태 추가
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const isMobile = useMediaQuery('(max-width: 767px)');

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
    const filteredReservations =
      selectedIndex !== null
        ? data.reservations
            .filter((item) => item.status === statusArr[selectedIndex])
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            )
        : data.reservations.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          );
    setReservations((prevReservations) => [
      ...(page === 1 ? [] : prevReservations), // 페이지 1이면 기존 데이터 초기화
      ...filteredReservations.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE,
      ),
    ]);
  }, [selectedIndex, page]);

  return (
    <div>
      <Gnb />
      <ReviewModal />
      <main className="flex justify-center min-h-[100vh] max-h-[100%] px-6 bg-gray50">
        <div className="flex gap-6 w-[1200px] pt-[142px]">
          {!isMobile && <SideNavigationMenu />}
          <div className="flex flex-col flex-grow">
            <div className="flex justify-between">
              <p className="text-[2rem] font-bold">예약내역</p>
              {data.totalCount !== 0 && (
                <FilterDropdown type="bookingPage" onSelect={handleSelect} />
              )}
            </div>
            {data.totalCount === 0 ? (
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
              <div className="flex flex-col gap-6 mt-[16px] mb-[72px]">
                {reservations.map((item) => (
                  <Experience
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
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyReservations;
