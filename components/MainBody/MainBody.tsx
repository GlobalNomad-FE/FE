'use client';
import React, { useState } from 'react';
import SearchBar from '@/components/commons/SearchBar';
import MonthBest from './MonthBest';
import HotActivities from './HotActivities';
import AllActivities from './AllActivities';
import useMediaQuery from '@/hooks/useMediaQuery';

const MainBody = () => {
  const isPC = useMediaQuery('(min-width: 1248px)');
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  let itemsSize;

  if (isPC) {
    itemsSize = searchTerm ? 16 : 8;
  } else if (isMobile) {
    itemsSize = searchTerm ? 8 : 4;
  } else {
    itemsSize = 9;
  }

  return (
    <div className="relative">
      <MonthBest />
      <div className="absolute w-full flex justify-center top-[550px] z-30 text-black200 px-[24px] mobile:px-[16px] mobile:top-[250px]">
        <SearchBar onSearch={handleSearch} />
      </div>
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
  );
};

export default MainBody;
