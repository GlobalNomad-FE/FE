'use client';
import React, { useState } from 'react';
import SearchBar from '@/components/commons/SearchBar';
import MonthBest from './MonthBest';
import useMediaQuery from '@/hooks/useMediaQuery';
import AllActivities from './AllActivities/AllActivities';
import HotActivities from './HotActivities/HotActivities';

const MainBody = () => {
  const isPC = useMediaQuery('(min-width: 1248px)');
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div className="relative w-full pb-[150px] mobile:pb-[100px]">
      <MonthBest />
      <div className="absolute flex w-full justify-center top-[550px] z-30 text-black200 mobile:px-[16px] mobile:top-[250px]">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="px-[24px]">
        <div className="w-full pt-[158px] flex justify-center">
          {searchTerm === '' && <HotActivities />}
        </div>
        <div className="w-full flex justify-center">
          <AllActivities
            searchTerm={searchTerm}
            itemSize={isPC ? 8 : isMobile ? 4 : 9}
          />
        </div>
      </div>
    </div>
  );
};

export default MainBody;
