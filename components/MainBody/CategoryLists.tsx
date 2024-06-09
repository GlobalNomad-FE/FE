import React, { useState } from 'react';
import Categories from './Categories';

interface CategoryListsProps {
  selectedCategory: string; // 선택된 카테고리 상태를 상위 컴포넌트에서 받아옴
  onCategoryClick: (categoryName: string) => void;
}

const CategoryLists = ({
  selectedCategory,
  onCategoryClick,
}: CategoryListsProps) => {
  const categories = [
    '문화 · 예술',
    '식음료',
    '스포츠',
    '투어',
    '관광',
    '웰빙',
  ];

  return (
    <div
      // ref={scrollContainerRef}
      className="flex gap-[24px] w-[882px] overflow-x-scroll"
    >
      {categories.map((category, index) => (
        <Categories
          key={index}
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
