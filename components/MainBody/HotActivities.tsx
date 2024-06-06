import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import useGetActivities from '@/apis/activities/useGetActivities';
import Button from '@/components/commons/Button';

const HotActivities = () => {
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);

  const { data } = useGetActivities({
    method: 'cursor',
    cursorId: cursorId,
    size: 3,
    sort: 'most_reviewed',
  });

  const handleGetPrevData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    history.pop();
    setHistory(history);
    setCursorId(history[history.length - 1]);
  };

  const handleGetNextData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const nextId = data.activities[0].id;
    setHistory([...history, nextId]);
    setCursorId(nextId);
  };

  return (
    <div className="relative flex flex-col text-black200 gap-[33px] underPc:w-full">
      <div className="flex justify-between px-[24px]">
        <h1 className="text-4xl font-bold">🔥 인기 체험</h1>
        <div className="flex">
          <Button
            width={44}
            height={44}
            fontSize={18}
            btnColor={'white'}
            textColor={history.length > 0 ? 'nomadBlack' : 'gray'}
            border={true}
            borderColor={history.length > 0 ? 'nomadBlack' : 'gray'}
            onClick={history.length > 0 ? handleGetPrevData : undefined}
            disabled={history.length === 0}
            rounded={15}
          >
            {'<'}
          </Button>
          <Button
            width={44}
            height={44}
            fontSize={18}
            btnColor={'white'}
            textColor={
              history.length + 3 < data.totalCount ? 'nomadBlack' : 'gray'
            }
            border={true}
            borderColor={
              history.length + 3 < data.totalCount ? 'nomadBlack' : 'gray'
            }
            onClick={
              history.length + 3 < data.totalCount
                ? handleGetNextData
                : undefined
            }
            disabled={history.length + 3 > data.totalCount}
            rounded={15}
          >
            {'>'}
          </Button>
        </div>
      </div>
      <div className="flex gap-[24px] px-[24px] overflow-x-scroll">
        {data.activities.map((item) => (
          <div
            key={item.id}
            className="relative min-w-[384px] min-h-[384px] rounded-3xl overflow-hidden"
          >
            <div className="absolute bg-custom-gradient w-[384px] h-[384px] z-10" />
            <Image
              src={`/images/스트릿댄스.png`}
              alt={item.bannerImageUrl}
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
              <div className="text-h3-bold">{item.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotActivities;
