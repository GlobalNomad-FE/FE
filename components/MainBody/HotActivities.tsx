import React, { useEffect, useState, useRef } from 'react';
import useGetActivities, { Activity } from '@/apis/activities/useGetActivities';
import HotActivitiesPagination from './HotActivitiesPagination';
import HotActivitiesItems from './HotActivitesItems';

const HotActivities = () => {
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [dataArray, setDataArray] = useState<Activity[]>([]);
  const [scrollPoint, setScrollPoint] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, isError } = useGetActivities({
    method: 'cursor',
    cursorId: cursorId,
    size: 12,
    sort: 'most_reviewed',
  });

  useEffect(() => {
    if (data) {
      setDataArray([...dataArray, ...data.activities]);
    }
  }, [data]);

  const handleGetPrevData = () => {
    const NextPoint = scrollPoint - 408;
    scrollContainerRef.current?.scroll({
      left: NextPoint,
      behavior: 'smooth',
    });
    setScrollPoint(NextPoint);
  };

  const handleGetNextData = () => {
    const NextPoint = scrollPoint + 408;
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    if (scrollLeft >= 0.8 * (scrollWidth - clientWidth) && data && !isLoading) {
      setCursorId(data.cursorId);
    }
    scrollContainerRef.current.scroll({
      left: NextPoint,
      behavior: 'smooth',
    });
    setScrollPoint(NextPoint);
  };

  return (
    <div className="relative flex flex-col text-black200 gap-[33px] w-full minPc:w-auto">
      <div className="flex justify-between px-[24px] w-auto minPC:w-[1248px]">
        <h1 className="text-4xl font-bold">🔥 인기 체험</h1>
        <HotActivitiesPagination
          totalCount={data ? data.totalCount : 0}
          scrollPoint={scrollPoint}
          clickPrev={handleGetPrevData}
          clickNext={handleGetNextData}
        />
      </div>
      {isError && (
        <div className="w-[1248px] h-[400px] text-2xl">
          데이터를 불러오는 것에 실패했습니다
        </div>
      )}
      <div
        ref={scrollContainerRef}
        className="flex gap-[24px] px-[24px] w-[1248px] overflow-x-scroll minPc:overflow-x-hidden"
      >
        {dataArray.map((item) => (
          <HotActivitiesItems
            key={item.id}
            title={item.title}
            price={item.price}
            bannerImageUrl={item.bannerImageUrl}
            rating={item.rating}
            reviewCount={item.reviewCount}
          />
        ))}
        {isLoading && (
          <div className="w-[384px] h-[384px] rounded-3xl text-2x">
            데이터 로딩 중...
          </div>
        )}
      </div>
    </div>
  );
};

export default HotActivities;
