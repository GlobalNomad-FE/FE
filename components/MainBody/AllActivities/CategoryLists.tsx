import React from 'react';
import Categories from './Categories';
import useDragScroll from '@/hooks/useDragScroll';

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

  const { scrollContainerRef, onDragStart, onDragMove, onDragEnd } =
    useDragScroll();

  return (
    <div
      className="flex gap-[15px] w-[860px] overflow-x-scroll scrollbar-hide"
      onMouseDown={onDragStart}
      onMouseMove={onDragMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      ref={scrollContainerRef}
    >
      {categories.map((category) => (
        <Categories
          key={category}
          onClick={() => onCategoryClick(category)}
          isSelected={selectedCategory === category}
        >
          {category}
        </Categories>
      ))}
    </div>
  );
};

export default CategoryLists;
