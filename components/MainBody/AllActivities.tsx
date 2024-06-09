import React, { useState } from 'react';
import useGetActivities from '@/apis/activities/useGetActivities';
import Pagination from '@/components/commons/Pagination';
import Image from 'next/image';
import AllActivitiesItems from './AllActivitiesItems';
import CategoryLists from './CategoryLists';
import AllActivitiesFilter from './AllActivitiesFilter';

interface Props {
  searchTerm: string;
  itemSize: number;
}

const AllActivities = ({ searchTerm, itemSize }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSort, setCurrentSort] = useState<
    'latest' | 'most_reviewed' | 'price_asc' | 'price_desc'
  >('latest');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  const handleFilterSelect = (
    filterType: 'latest' | 'most_reviewed' | 'price_asc' | 'price_desc',
  ) => {
    setCurrentSort(filterType);
  };

  const checkItemSize = searchTerm && itemSize !== 9 ? itemSize * 2 : itemSize;
  const categoryValue = searchTerm
    ? undefined
    : selectedCategory !== ''
    ? selectedCategory
    : undefined;

  const { data, isLoading, isError } = useGetActivities({
    method: 'offset',
    page: currentPage,
    size: checkItemSize,
    sort: currentSort,
    keyword: searchTerm !== '' ? searchTerm : undefined,
    category: categoryValue,
  });

  const handlePageChange = (currentPage: number) => {
    setCurrentPage(currentPage);
  };
  return (
    <div className="bg-white flex flex-col text-black200 gap-[33px] p-[24px] w-full mainPcSize:w-auto">
      {searchTerm ? (
        <div>
          <div className="text-3xl mobile:text-2xl">
            <span className="font-bold">{searchTerm}</span>(으)로 검색한
            결과입니다.
          </div>
          <div className="text-base mt-[5px]">
            총 {data?.totalCount}개의 결과
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between mt-[36px]">
            <CategoryLists
              selectedCategory={selectedCategory}
              onCategoryClick={handleCategoryClick}
            />
            <AllActivitiesFilter onSelect={handleFilterSelect} />
          </div>
          <h1 className="text-4xl font-bold mobile:text-lg">
            {categoryValue ? categoryValue : '🛼 모든 체험'}
          </h1>
        </>
      )}
      <div className="mx-max-0 grid grid-cols-3 gap-y-8 mainPcSize:grid-cols-4 mainPcSize:gap-y-12 mobile:grid-cols-2 mobile:gap-y-6">
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
            itemsInPage={checkItemSize}
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
