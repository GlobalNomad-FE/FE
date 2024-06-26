import React, { useEffect, useState, useCallback } from 'react';
import useGetActivities, { Activity } from '@/apis/activities/useGetActivities';
import Image from 'next/image';
import HotActivitiesPagination from './HotActivitiesPagination';
import HotActivitiesItems from './HotActivitiesItems';
import useMediaQuery from '@/hooks/useMediaQuery';
import useDragScroll from '@/hooks/useDragScroll';

const HotActivities = () => {
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [dataArray, setDataArray] = useState<Activity[]>([]);
  const [scrollPoint, setScrollPoint] = useState(0);
  const useDrag = useMediaQuery('(max-width: 1247px)');
  const { scrollContainerRef, onDragStart, onDragMove, onDragEnd } =
    useDragScroll();

  const { data, isLoading, isError } = useGetActivities({
    method: 'cursor',
    cursorId: cursorId,
    size: 12,
    sort: 'most_reviewed',
  });

  useEffect(() => {
    if (scrollContainerRef.current && !useDrag) {
      const alignedPoint = Math.round(scrollPoint / 408) * 408;
      scrollContainerRef.current.scroll({
        left: alignedPoint,
        behavior: 'smooth',
      });
      setScrollPoint(alignedPoint);
    }
  }, [useDrag]);

  useEffect(() => {
    if (data && dataArray.length < data.totalCount) {
      setDataArray((prevDataArray) => [...prevDataArray, ...data.activities]);
    }
  }, [data]);

  const checkScrollPosition = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    if (scrollLeft >= 0.8 * (scrollWidth - clientWidth) && data && !isLoading) {
      setCursorId(data.cursorId);
    }
  }, [data, isLoading, scrollContainerRef]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => checkScrollPosition();

    scrollContainer.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [checkScrollPosition, scrollContainerRef]);

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
    scrollContainerRef.current.scroll({
      left: NextPoint,
      behavior: 'smooth',
    });
    setScrollPoint(NextPoint);
  };

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (useDrag) onDragStart(e);
  };

  const handleDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (useDrag) {
      onDragMove(e);
      if (scrollContainerRef.current) {
        setScrollPoint(scrollContainerRef.current.scrollLeft); // Update scrollPoint during drag
      }
    }
  };

  const handleDragEnd = (e: React.MouseEvent<HTMLDivElement>) => {
    if (useDrag && scrollContainerRef.current) {
      onDragEnd(e);
    }
  };

  return (
    <div className="relative flex flex-col text-black200 gap-[33px] w-full mainPcSize:w-auto">
      <div className="flex justify-between w-auto mainPcSize:w-[1200px]">
        <h1 className="text-4xl font-bold">🔥 인기 체험</h1>
        <HotActivitiesPagination
          totalCount={data ? data.totalCount : 0}
          scrollPoint={scrollPoint}
          clickPrev={handleGetPrevData}
          clickNext={handleGetNextData}
        />
      </div>
      {isError && (
        <div className="w-[1200px] h-[400px] text-base flex justify-center items-center">
          데이터를 불러오는데 실패하였습니다.
          <br />
          다시 시도해주세요.
        </div>
      )}
      <div
        ref={scrollContainerRef}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        className="flex gap-[24px] overflow-x-scroll scrollbar-hide mainPcSize:w-[1200px] mainPcSize:overflow-x-hidden"
      >
        {dataArray.map((item) => (
          <HotActivitiesItems
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            bannerImageUrl={item.bannerImageUrl}
            rating={item.rating}
            reviewCount={item.reviewCount}
          />
        ))}
        {isLoading && (
          <div className="w-full h-[384px] flex justify-center items-center">
            <Image
              src="/icons/spinner.svg"
              width={150}
              height={150}
              alt="loading icon"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HotActivities;
