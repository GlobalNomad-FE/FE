'use client';
import React, { Suspense, useState } from 'react';
import SearchBar from '@/components/commons/SearchBar';
import MonthBest from './MonthBest';
import useGetActivities from '@/apis/activities/useGetActivities';
import HotActivities from './HotActivities';

const MainBody = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // const page = 1;
  // const size = 2;

  // const { data } = useGetActivities({
  //   method: 'offset',
  //   page: page,
  //   size: size,
  // });

  // console.log(data);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div className="relative">
      <MonthBest />
      <div className="absolute w-full flex justify-center top-[550px] z-30 text-black200 px-[24px] mobile:px-[16px] mobile:top-[250px]">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="w-full pt-[158px] mb-[120px] flex justify-center">
        <Suspense fallback={<div>Loading...</div>}>
          <HotActivities />
        </Suspense>
      </div>
    </div>
  );
};

export default MainBody;
