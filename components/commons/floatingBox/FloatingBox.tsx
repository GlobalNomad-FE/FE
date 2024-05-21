'use client';
import { formatWage } from '@/utils/wageFormatter';
import MinusIcon from '@/public/icons/minus-btn.svg';
import PlusIcon from '@/public/icons/plus-btn.svg';
import Calendar from '../calendar/Calendar';
import { useEffect, useState } from 'react';

//TODO - price 데이터처리 수정(임시 price 가격 사용중)
/**
 *
 * @returns
 */
export default function FloatingBox() {
  const [count, setCount] = useState(1);

  const handleCountPlus = () => {
    setCount(count + 1);
  };
  const handleCountMinus = () => {
    setCount(count - 1);
    if (count < 1) {
    }
  };
  useEffect(() => {}, [count]);
  const price = 1000;
  return (
    <div className="flex flex-col w-[38.4rem] bg-white border-solid rounded-2xl border-gray200 p-[2.4rem] shadow-[0px_4px_16px_rgba(17, 34, 17, 0.05)]">
      <div className="flex flex-row items-center gap-5">
        <p className="text-h1 text-black200">{formatWage(price)}</p>
        <p className="text-h3-regular text-gray600">/ 인</p>
      </div>
      <div className="border-t border-t-gray200 mt-[1.6rem]">
        <p className="text-h3-bold text-black200 mt-[1.6rem] mb-[1.6rem]">
          날짜
        </p>
        <Calendar />
      </div>
      <div className="mt-[1.6rem] mb-[1.6rem] flex flex-col gap-[1.4rem] ">
        <p className="text-h4-bold text-green400">예약 가능한 시간</p>
        <div className="">
          <button className="bg-white border rounded-lg border-nomad-black hover:bg-nomad-black hover:text-white text-body1-regular font-medium-w py-[1rem] px-[1.2rem] text-nomad-black">
            12:00~15:00
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-[0.8rem] border-t border-t-gray200 pt-[1.2rem]">
        <p className="text-h3-bold  text-green400">참여 인원 수</p>
        <div className="border border-gray200 rounded-md flex shadow-custom bg-white overflow-hidden w-[12rem]">
          <button
            className="p-[1rem] "
            onClick={handleCountMinus}
            disabled={count <= 1}
          >
            <MinusIcon />
          </button>
          <div className="p-[0.8rem] w-[4rem] flex justify-center items-center text-body2-regular">
            {count}
          </div>
          <button className="p-[1rem]" onClick={handleCountPlus}>
            <PlusIcon />
          </button>
        </div>
      </div>
      <button className="px-[4rem] py-[1.4rem] bg-nomad-black text-white text-body1-bold my-[2.4rem] rounded ">
        예약하기
      </button>
      <div className="border-t border-t-gray200 pt-[1.2rem] text-h3-bold flex justify-between">
        <p className="">총 합계</p>
        <div>{formatWage(price * count)}</div>
      </div>
    </div>
  );
}
