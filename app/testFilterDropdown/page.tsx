'use client';
// import Category from '@/components/commons/Category';
import FilterDropdown from '@/components/commons/FilterDropdown';
import { useState } from 'react';

const TestFilterDropdown = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="flex gap-20 mt-20 ml-20">
      <FilterDropdown type="mainPage" onSelect={handleSelect} />
      <FilterDropdown type="bookingPage" onSelect={handleSelect} />
    </div>
  );
};

export default TestFilterDropdown;
