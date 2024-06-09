import React, { useEffect, useState } from 'react';
import useGetActivities from '@/apis/activities/useGetActivities';
import Pagination from '@/components/commons/Pagination';
import Image from 'next/image';
import AllActivitiesItems from './AllActivitiesItems';
import useMediaQuery from '@/hooks/useMediaQuery';

interface Props {
  searchTerm: string;
}

const AllActivities = ({ searchTerm }: Props) => {
  const isPC = useMediaQuery('(min-width: 1248px)');
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSort, setCurrentSort] = useState<
    'latest' | 'most_reviewed' | 'price_asc' | 'price_desc'
  >('latest');

  let itemsSize;

  if (isPC) {
    itemsSize = searchTerm ? 16 : 8;
  } else if (isMobile) {
    itemsSize = searchTerm ? 8 : 4;
  } else {
    itemsSize = 9;
  }

  const { data, isLoading, isError } = useGetActivities({
    method: 'offset',
    page: currentPage,
    size: itemsSize,
    sort: currentSort,
    keyword: searchTerm !== '' ? searchTerm : undefined,
  });

  const handlePageChange = (currentPage: number) => {
    setCurrentPage(currentPage);
  };
  return (
    <div className="bg-white flex flex-col text-black200 gap-[33px] w-[1248px] p-[24px]">
      <h1 className="text-4xl font-bold mobile:text-lg">🛼 모든 체험</h1>
      <div className="grid grid-cols-3 gap-y-8 minPc:grid-cols-4 minPc:gap-y-12 mobile:grid-cols-2 mobile:gap-y-6">
        {data?.activities.map((item) => (
          <AllActivitiesItems
            key={item.id}
            title={item.title}
            price={item.price}
            bannerImageUrl={item.bannerImageUrl}
            rating={item.rating}
            reviewCount={item.reviewCount}
          />
        ))}
      </div>
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
      <div className="mt-[40px]">
        {data && (
          <Pagination
            totalCount={data.totalCount}
            itemsInPage={itemsSize}
            visiblePages={5}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        )}
      </div>
    </div>
  );
};

export default AllActivities;
