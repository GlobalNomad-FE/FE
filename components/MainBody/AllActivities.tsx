import React, { useState } from 'react';
import useGetActivities from '@/apis/activities/useGetActivities';
import Pagination from '@/components/commons/Pagination';
import HotActivitiesItems from './HotActivitesItems';
import Image from 'next/image';

const AllActivities = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSort, setCurrentSort] = useState<
    'latest' | 'most_reviewed' | 'price_asc' | 'price_desc'
  >('latest');

  const { data, isLoading, isError } = useGetActivities({
    method: 'offset',
    page: currentPage,
    size: 8,
    sort: currentSort,
  });

  const handlePageChange = (currentPage: number) => {
    setCurrentPage(currentPage);
  };
  return (
    <main className="p-10 bg-white">
      <div className="grid grid-cols-4">
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
      {data && (
        <Pagination
          totalCount={data.totalCount}
          itemsInPage={8}
          visiblePages={5}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}
    </main>
  );
};

export default AllActivities;
