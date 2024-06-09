import Image from 'next/image';
import { useState } from 'react';

type FilterType = 'latest' | 'most_reviewed' | 'price_asc' | 'price_desc';

const AllActivitiesFilter = ({
  onSelect,
}: {
  onSelect: (filterType: FilterType) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const filterOptions: { label: string; value: FilterType }[] = [
    { label: '가격이 낮은 순', value: 'price_asc' },
    { label: '가격이 높은 순', value: 'price_desc' },
    { label: '최신 순', value: 'latest' },
    { label: '리뷰 많은 순', value: 'most_reviewed' },
  ];

  // dropdown 클릭 시 리스트 나왔다 사라졌다 이벤트
  const onDropDownOpen = () => {
    setIsOpen(!isOpen);
  };

  // filter 리스트 클릭 시 list 닫히는 이벤트, index 전달
  const onClickItemSelected = (index: number) => {
    setIsOpen(false);
    onSelect(filterOptions[index].value);
  };

  // type prop 값에 따라 list에 들어갈 내용 배열이 달라짐
  return (
    <div>
      <div
        className="w-[127px] mainTabletSize:w-[120px] mobile:w-[90px] flex h-[53px] mobile:h-[41px] px-[30px] mobile:px-[20px] rounded-[15px] border border-green200 bg-white justify-between items-center cursor-pointer"
        onClick={onDropDownOpen}
      >
        <span className="text-lg mobile:text-sm">필터</span>
        <Image
          src="/icons/filter-dropdown-arrow.svg"
          alt="드롭다운 화살표"
          width={22}
          height={22}
        />
      </div>
      {isOpen && (
        <ul className="absolute w-[127px] mainTabletSize:w-[120px] mobile:w-[90px] z-20 mt-2 border border-gray200 rounded-md bg-white cursor-pointer">
          {filterOptions.map((item, index) => (
            <li
              key={item.label}
              className={`${
                index !== filterOptions.length - 1
                  ? 'border-b border-solid border-gray200'
                  : ''
              } flex h-[53px] mobile:h-[41px] justify-center items-center text-lg mobile:text-sm hover:bg-gray100 `}
              onClick={() => onClickItemSelected(index)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllActivitiesFilter;
