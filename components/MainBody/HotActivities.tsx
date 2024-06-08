import React, { useState } from 'react';
import useGetActivities from '@/apis/activities/useGetActivities';
import HotActivitiesPagination from './HotActivitiesPagination';
import HotActivitiesItems from './HotActivitesItems';

const HotActivities = () => {
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);

  const { data, isLoading, isError } = useGetActivities({
    method: 'cursor',
    cursorId: cursorId,
    size: 3,
    sort: 'most_reviewed',
  });

  const handleGetPrevData = () => {
    history.pop();
    setHistory(history);
    setCursorId(history[history.length - 1]);
  };

  const handleGetNextData = () => {
    if (data && data.activities.length > 0) {
      const nextId = data.activities[0].id;
      setHistory([...history, nextId]);
      setCursorId(nextId);
    }
  };

  return (
    <div className="relative flex flex-col text-black200 gap-[33px] w-full xl:w-auto">
      <div className="flex justify-between px-[24px]">
        <h1 className="text-4xl font-bold">🔥 인기 체험</h1>
        {data && (
          <HotActivitiesPagination
            totalCount={data.totalCount}
            history={history}
            clickPrev={handleGetPrevData}
            clickNext={handleGetNextData}
          />
        )}
      </div>
      {isLoading && (
        <div className="w-[1248px] h-[400px] text-2xl flex justify-center items-center">
          데이터 로딩 중..
        </div>
      )}
      {isError && (
        <div className="w-[1248px] h-[400px] text-2xl">
          불러오는 것에 실패했습니다
        </div>
      )}
      <div className="flex gap-[24px] px-[24px] overflow-x-scroll">
        {data?.activities.map((item) => (
          <HotActivitiesItems
            key={item.id}
            title={item.title}
            price={item.price}
            bannerImageUrl={item.bannerImageUrl}
            rating={item.rating}
            reviewCount={item.reviewCount}
          />
        ))}
      </div>
    </div>
  );
};

export default HotActivities;
