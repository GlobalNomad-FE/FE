'use client';
import { formatWage } from '@/utils/wageFormatter';
import MinusIcon from '@/public/icons/minus-btn.svg';
import PlusIcon from '@/public/icons/plus-btn.svg';
import Calendar from '../calendar/Calender';
import { useState } from 'react';
import data from './mock.json';
import useDateStore from '@/libs/calendarStore';
import formatDateToYYYYMMDD from '@/utils/dateFormatter';

//TODO -'예약하기' 버튼을 클릭하면 “예약이 완료되었습니다.” 모달창 띄우기
/**
 *
 * @returns
 */
export default function FloatingBox() {
  const [count, setCount] = useState(1);
  const [value, setValue] = useState<null | number>(null);

  const { date } = useDateStore();
  const { schedules, price } = data;
  const formatDate = formatDateToYYYYMMDD(date);

  const handleCountPlus = () => {
    setCount(count + 1);
  };
  const handleCountMinus = () => {
    setCount(count - 1);
    if (count < 1) {
    }
  };
  const handleTimeSelect = (id: number) => {
    setValue(id);
  };

  return (
    <div
      className="flex flex-col w-[384px] bg-white border rounded-2xl border-gray200 p-[2.4rem] "
      style={{ boxShadow: '0px 4px 16px rgba(17, 34, 17, 0.05)' }}
    >
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

        <div>
          {schedules.map((data) => {
            const isSelected = value === data.id;
            const isDate = formatDate === data.date;
            console.log('data.date', data.date);
            return (
              isDate && (
                <button
                  className={` border rounded-lg border-nomad-black active:bg-nomad-black active:text-white text-body1-regular font-medium-w py-[1rem] px-[1.2rem] text-nomad-black mr-[1.2rem] mb-[1.2rem] ${
                    isSelected
                      ? 'bg-nomad-black text-white'
                      : 'bg-white text-nomad-black '
                  }`}
                  key={data.id}
                  onClick={() => handleTimeSelect(data.id)}
                >
                  {data.startTime}~{data.endTime}
                </button>
              )
            );
          })}
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
      <button
        className={`px-[4rem] py-[1.4rem] bg-nomad-black text-white text-body1-bold my-[2.4rem] rounded ${
          !value ? 'opacity-50 cursor-not-allowed' : ''
        } `}
        type="submit"
        disabled={!value}
      >
        예약하기
      </button>
      <div className="border-t border-t-gray200 pt-[1.2rem] text-h3-bold flex justify-between">
        <p className="">총 합계</p>
        <div>{formatWage(price * count)}</div>
      </div>
    </div>
  );
}
