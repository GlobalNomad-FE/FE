'use client';
import React, { useState } from 'react';
import SearchBar from './commons/SearchBar';
import MonthBest from './MonthBest';

const MainBody = () => {
  const [searchTerm, setSearchTerm] = useState('');

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
