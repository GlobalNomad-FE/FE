'use client';
import SearchBar from '@/components/commons/SearchBar';
import data from '@/components/commons/mock.json';
import { useState } from 'react';

const SearchBarTest = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const mockData = data.activities;

  const filteredData = mockData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSearch = () => {
    setSearchTerm(inputValue);
  };

  return (
    <div>
      <SearchBar
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSearch={handleSearch}
      />
      <div className="flex flex-wrap mt-20">
        {filteredData.map((item) => (
          <div key={item.id} className="m-20 p-10 bg-white">
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBarTest;
