'use client'
import Image from 'next/image';
import { useState } from 'react';

interface FilterDropdownType {
  type: string;
}

const mainPageFilter = ['가격이 낮은 순', '가격이 높은 순'];
const bookingPageFilter = [
  '예약 신청',
  '예약 취소',
  '예약 승인',
  '예약 거절',
  '체험 완료',
];

/**
 *
 * @description Filter Dropdown 컴포넌트
 * @param type main페이지는 'mainPage'로, 예약 내역 페이지는 'bookingPage'로 prop 넘겨주시면 됩니다.
 */
const FilterDropdown = ({ type }: FilterDropdownType) => {
  const [isOpen, setIsOpen] = useState(false);

  // dropdown 클릭 시 리스트 나왔다 사라졌다 이벤트
  const onDropDownOpen = () => {
    return setIsOpen(!isOpen);
  };

  // filter 리스트 클릭 시 list 닫히는 이벤트
  const onClickItemSelected = (index: number) => {
    setIsOpen(false);
  };

  // type prop 값에 따라 list에 들어갈 내용 배열이 달라짐
  const listItem = type === 'mainPage' ? mainPageFilter : bookingPageFilter;

  return (
    <div>
      <div
        className={`flex ${type === 'mainPage' ? 'w-[12.7rem]' : 'w-[16rem]'} 
        h-[5.3rem] px-[2rem] py-[1.6rem] rounded-[15px] border border-solid border-green200 bg-white justify-between items-center font-family text-[1.8rem] font-medium cursor-pointer tablet:w-[12rem] mobile:w-[9rem] mobile:h-[4.1rem] mobile:text-[1.4rem] mobile:py-[1rem]`}
        onClick={onDropDownOpen}
      >
        <span>{type === 'mainPage' ? '가격' : '필터'}</span>
        <Image
          src="/icons/dropdown_arrow.svg"
          alt="드롭다운 화살표"
          width={22}
          height={22}
        />
      </div>
      {isOpen && (
        <ul
          className={`absolute z-2 ${
            type === 'mainPage' ? 'w-[12.7rem]' : 'w-[16rem]'
          } 
          mt-[0.8rem] border border-solid border-gray200 rounded-md bg-white cursor-pointer tablet:w-[12rem] mobile:w-[9rem]`}
        >
          {listItem.map((item, index) => (
            <li
              key={index}
              className={`flex h-[5.8rem] ${
                index !== listItem.length - 1
                  ? 'border-b border-solid border-gray200'
                  : ''
              } justify-center items-center font-family text-[1.8rem] font-medium hover:bg-gray100 mobile:h-[4.1rem] mobile:text-[1.4rem]`}
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
