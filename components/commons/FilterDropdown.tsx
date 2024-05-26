import Image from 'next/image';
import { useState } from 'react';

type FilterDropdownType = 'mainPage' | 'bookingPage';

const filter = {
  mainPage: ['가격이 낮은 순', '가격이 높은 순'],
  bookingPage: [
    '예약 신청',
    '예약 취소',
    '예약 승인',
    '예약 거절',
    '체험 완료',
  ],
};

/**
 *
 * @description Filter Dropdown 컴포넌트
 * @param {string} type main페이지는 'mainPage'로, 예약 내역 페이지는 'bookingPage'로 prop 넘겨주시면 됩니다.
 * @param {function} onSelect 선택된 index를 하위 컴포넌트에서 상위로 전달
 */
const FilterDropdown = ({
  type,
  onSelect,
}: {
  type: FilterDropdownType;
  onSelect: (index: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // dropdown 클릭 시 리스트 나왔다 사라졌다 이벤트
  const onDropDownOpen = () => {
    setIsOpen(!isOpen);
  };

  // filter 리스트 클릭 시 list 닫히는 이벤트, index 전달
  const onClickItemSelected = (index: number) => {
    setIsOpen(false);
    onSelect(index);
  };

  // type prop 값에 따라 list에 들어갈 내용 배열이 달라짐
  const listItem = filter[type];

  return (
    <div
      className={`${type === 'bookingPage' && 'tablet:hidden mobile:hidden'}`}
    >
      <div
        className={`${
          type === 'mainPage' ? 'w-[7.9375rem] tablet:w-[7.5rem]' : 'w-40'
        } flex h-[3.3125rem] px-5 py-4 rounded-[15px] border border-green200 bg-white justify-between items-center cursor-pointer tablet:w-[7.5rem] mobile:w-[5.625rem] mobile:h-[2.5625rem] mobile:py-2.5`}
        onClick={onDropDownOpen}
      >
        <span className="font-family text-[1.125rem] font-medium mobile:text-[0.875rem] ">
          {type === 'mainPage' ? '가격' : '필터'}
        </span>
        <Image
          src="/icons/filter-dropdown-arrow.svg"
          alt="드롭다운 화살표"
          width={22}
          height={22}
        />
      </div>
      {isOpen && (
        <ul
          className={`${
            type === 'mainPage' ? 'w-[7.9375rem]' : 'w-[10rem]'
          } absolute z-2 mt-2 border border-gray200 rounded-md bg-white cursor-pointer tablet:w-[7.5rem] mobile:w-[7.5rem]`}
        >
          {listItem.map((item, index) => (
            <li
              key={index}
              className={`${
                index !== listItem.length - 1
                  ? 'border-b border-solid border-gray200'
                  : ''
              } flex h-[3.625rem] justify-center items-center font-family text-lg font-medium hover:bg-gray100 mobile:h-[4.1rem] mobile:text-sm`}
              onClick={() => onClickItemSelected(index)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterDropdown;
