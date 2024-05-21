import Image from 'next/image';

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
  // type prop 값에 따라 list에 들어갈 내용 배열이 달라짐
  const listItem = type === 'mainPage' ? mainPageFilter : bookingPageFilter;

  return (
    <div>
      <button className="flex w-[12.7rem] h-[5.3rem] px-[2rem] py-[1.6rem] rounded-[1.5rem] border border-solid border-green200 justify-between items-center font-family text-[1.8rem] font-medium cursor-pointer">
        <span>{type === 'mainPage' ? '가격' : '필터'}</span>
        <Image
          src="/icons/dropdown_arrow.svg"
          alt="드롭다운 화살표"
          width={22}
          height={22}
        />
      </button>
      <ul className="absolute z-2 w-[12.7rem] mt-[0.8rem] border border-solid border-gray200 rounded-[0.6rem] bg-white cursor-pointer">
        {listItem.map((item, index) => (
          <li
            key={index}
            className={`flex h-[5.8rem] ${
              index !== listItem.length - 1
                ? 'border-b border-solid border-gray200'
                : ''
            } justify-center items-center font-family text-[1.8rem] font-medium hover:bg-gray100`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterDropdown;
