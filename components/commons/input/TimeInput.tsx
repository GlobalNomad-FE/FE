import DatePickerInput from '../DatePickerInput';
import { useState } from 'react';
import Selectbox from '../Selectbox';
import Image from 'next/image';
import { formatDate } from '@/utils/dateFormatter';

export type DateType = Date | null;
type StringNullType = string | null;

interface InputProps {
  error?: string;
  name: string;
  control: any;
  placeholder: string;
  labelName: string;
}

interface DateTimeRange {
  date: DateType;
  startTime: StringNullType;
  endTime: StringNullType;
}

export default function TimeInput({ labelName }: InputProps) {
  const [date, setDate] = useState<DateType>(new Date());
  const [startTime, setStartTime] = useState<StringNullType>(null);
  const [endTime, setEndTime] = useState<StringNullType>(null);
  const [dateTimeRanges, setDateTimeRanges] = useState<DateTimeRange[]>([]);

  const handleDate = (date: DateType) => {
    setDate(date);
  };
  const handleStartTime = (value: StringNullType) => {
    setStartTime(value);
  };
  const handleEndTime = (value: StringNullType) => {
    setEndTime(value);
  };
  // 시간 배열 생성 (0:00 ~ 24:00)
  const selectList = Array.from({ length: 25 }, (_, i) => ({
    value: `${i}:00`,
    label: `${i}:00`,
  }));

  const handleAddRange = () => {
    if (startTime === null || endTime === null) {
      console.error('시작 시간 또는 종료 시간이 잘못되었습니다.');
      return;
    }
    // 새로운 스케줄이 겹치지 않는지 확인
    const isOverlap = dateTimeRanges.some((range) => {
      if (range.startTime === null || range.endTime === null) {
        return false;
      }
      return (
        range.date === date &&
        ((startTime >= range.startTime && startTime < range.endTime) ||
          (endTime > range.startTime && endTime <= range.endTime))
      );
    });

    // 겹치지 않는 경우에만 스케줄을 추가
    if (!isOverlap) {
      setDateTimeRanges([...dateTimeRanges, { date, startTime, endTime }]);
    } else {
      alert('이 시간대에는 이미 스케줄이 있습니다.');
    }
  };
  const handleRemoveRange = (index: number) => {
    setDateTimeRanges(dateTimeRanges.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="text-h2 text-black200 mb-6">{labelName}</div>
      <div className="flex gap-[10px] flex-col items-center">
        <div className="text-h3-regular text-gray600 mb-[8px] flex  w-full gap-5">
          <div className="w-[379px]">날짜</div>
          <div className="w-[140px]">시작 시간</div>
          <div className="w-[140px] ml-4">종료 시간</div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-5 items-center">
            <DatePickerInput onSelectedDateChange={handleDate} />
            <div className="flex gap-3">
              <div className="w-[140px]">
                <Selectbox
                  width="140px"
                  placeholder="0:00"
                  onSelect={handleStartTime}
                  options={selectList}
                />
              </div>
              <Image
                src="/icons/물결.svg"
                width={14}
                height={26}
                alt="~아이콘"
              />
              <div className="w-[140px]">
                <Selectbox
                  width="140px"
                  placeholder="0:00"
                  onSelect={handleEndTime}
                  options={selectList}
                />
              </div>
            </div>
            <button onClick={handleAddRange}>
              <Image
                src="/icons/time_plus.svg"
                width={56}
                height={56}
                alt="시간추가아이콘"
              />
            </button>
          </div>
          <div aria-hidden="true" className="border-t border-gray200 w-full" />
          {dateTimeRanges.map((item, index) => (
            <div
              key={index}
              className="flex gap-5 items-center h-[56px] text-black200 text-body1-regular  "
            >
              <div className="w-[379px] h-full bg-white border border-black100 rounded px-4 flex items-center">
                {formatDate(item.date?.toString() ?? '2024/05/22')}
              </div>
              <div className="flex gap-3 h-full">
                <div className="w-[140px] h-full bg-white border border-black100 rounded px-4 flex items-center">
                  {item.startTime}
                </div>
                <Image
                  src="/icons/물결.svg"
                  width={14}
                  height={26}
                  alt="~아이콘"
                />
                <div className="w-[140px] h-full bg-white border border-black100 rounded px-4 flex items-center">
                  {item.endTime}
                </div>
              </div>
              <button onClick={() => handleRemoveRange(index)}>
                <Image
                  src="/icons/time_minus.svg"
                  width={56}
                  height={56}
                  alt="시간빼기아이콘"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
