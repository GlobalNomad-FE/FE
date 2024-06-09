import React, { useState } from 'react';
import Categories from './Categories';

interface CategoryListsProps {
  selectedCategory: string;
  onCategoryClick: (categoryName: string) => void;
}

const CategoryLists = ({
  selectedCategory,
  onCategoryClick,
}: CategoryListsProps) => {
  const categories = [
    '전체',
    '문화 · 예술',
    '식음료',
    '스포츠',
    '투어',
    '관광',
    '웰빙',
  ];

  return (
    <div className="flex gap-[15px] w-[860px] overflow-x-scroll">
      {categories.map((category) => (
        <Categories
          key={category}
          onClick={onCategoryClick}
          isSelected={selectedCategory === category}
        >
          {category}
        </Categories>
      ))}
    </div>
  );
};

export default CategoryLists;
