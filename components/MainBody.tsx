'use client';
import React, { useState } from 'react';
import SearchBar from './commons/SearchBar';
import MonthBest from './MonthBest';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getActivities } from '@/apis/api';

const MainBody = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const size = 8;

  const { data } = useSuspenseQuery({
    queryKey: ['activities', page, size],
    queryFn: () => getActivities(page, size)
  });

  console.log(data);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div className="relative">
      <MonthBest />
      <div className="absolute w-full flex justify-center top-[550px] z-30 text-black200 px-[24px] mobile:px-[16px] mobile:top-[250px]">
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default MainBody;
