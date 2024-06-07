import React, { useState } from 'react';
import Image from 'next/image';
import useGetActivities from '@/apis/activities/useGetActivities';
import useMediaQuery from '@/hooks/useMediaQuery';
import HotActivitiesPagination from './HotActivitiesPagination';

//TODO: 스크린 창 크기 훅으로 쓰지말고 보여졌다 안보여졌다하는걸 하위컴포넌트 안에서 조절 display-none으로
//맵 쓰는 부분 컴포넌트 하나로~

const HotActivities = () => {
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const isSmallPCScreen = useMediaQuery('(max-width: 1248px)');

  const { data } = useGetActivities({
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
    const nextId = data.activities[0].id;
    setHistory([...history, nextId]);
    setCursorId(nextId);
  };

  return (
    <div
      className={`relative flex flex-col text-black200 gap-[33px] ${
        isSmallPCScreen ? 'w-full' : ''
      }`}
    >
      <div className="flex justify-between px-[24px]">
        <h1 className="text-4xl font-bold">🔥 인기 체험</h1>
        {!isSmallPCScreen && (
          <HotActivitiesPagination
            totalCount={data.totalCount}
            history={history}
            clickPrev={handleGetPrevData}
            clickNext={handleGetNextData}
          />
        )}
      </div>
      <div className="flex gap-[24px] px-[24px] overflow-x-scroll">
        {data.activities.map((item) => (
          <div
            key={item.id}
            className="relative min-w-[384px] min-h-[384px] rounded-3xl overflow-hidden"
          >
            <div className="absolute bg-custom-gradient w-[384px] h-[384px] z-10" />
            <Image
              src={item.bannerImageUrl}
              alt={item.title}
              fill
              objectFit="cover"
            />
            <div className="text-white text-body2-bold absolute top-[170px] z-20 py-[30px] px-[20px] flex flex-col gap-[20px]">
              <div className="flex gap-[5px]">
                <Image
                  src="/icons/star-on.svg"
                  width={20}
                  height={20}
                  alt="star icon"
                />
                {item.rating} ({item.reviewCount})
              </div>
              <div className="text-3xl font-bold w-[230px]">{item.title}</div>
              <div className="text-h3-bold">
                ₩ {item.price.toLocaleString('ko-KR')}{' '}
                <span className="text-gray400 text-body2-regular">/ 인</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotActivities;
