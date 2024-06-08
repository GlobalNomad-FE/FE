import DatePickerInput from '../commons/DatePickerInput';
import { useState } from 'react';
import Selectbox from '../commons/Selectbox';
import Image from 'next/image';
import formatDateToYYYYMMDD from '@/utils/dateFormatter';
import { KeyActivitiesData } from '@/app/activities/register/page';

export type DateType = Date | null;
type StringNullType = string | null;

interface InputProps {
  error?: string;
  name: string;
  control: any;
  placeholder: string;
  labelName: string;
  handlevalue: (id: KeyActivitiesData, value: any) => void;
}

interface DateTimeRange {
  date: StringNullType;
  startTime: StringNullType;
  endTime: StringNullType;
}

export default function TimeInput({ labelName, handlevalue }: InputProps) {
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
      const addTimeRageConvert = [
        ...dateTimeRanges,
        {
          date: formatDateToYYYYMMDD(date as Date),
          startTime,
          endTime,
        },
      ];

      setDateTimeRanges([...addTimeRageConvert]);
      handlevalue('schedules', addTimeRageConvert);
    } else {
      alert('이 시간대에는 이미 스케줄이 있습니다.');
    }
  };
  const handleRemoveRange = (index: number) => {
    setDateTimeRanges(dateTimeRanges.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      <div className="text-h2 text-black200 mb-6">{labelName}</div>
      <div className="flex gap-[10px] flex-col items-center w-full">
        <div className="flex flex-col gap-5 w-full">
          <div className="flex gap-5 tablet:gap-2 mobile:gap-1.5 w-full items-end justify-between">
            <div className="flex w-full tablet:grow-[2] mobile:grow-[2] flex-col gap-4 tablet:gap-[10px] mobile:gap-2">
              <div className="text-h3-regular text-gray600 mobile:text-body1-regular">
                날짜
              </div>
              <DatePickerInput onSelectedDateChange={handleDate} />
            </div>
            <div className="flex gap-3 tablet:gap-2 mobile:gap-1.5 grow">
              <div className="mobile:max-w-[104px] w-[140px] tablet:max-w-[104px] flex  flex-col gap-4 tablet:gap-[10px] mobile:gap-2">
                <div className="text-h3-regular text-gray600 mobile:text-body1-regular">
                  시작 시간
                </div>
                <Selectbox
                  placeholder="0:00"
                  onSelect={handleStartTime}
                  options={selectList}
                />
              </div>
              <div
                className="flex itmes-center mobile:hidden"
                style={{ bottom: '-20px', position: 'relative' }}
              >
                <Image
                  src="/icons/물결.svg"
                  width={14}
                  height={26}
                  alt="~아이콘"
                />
              </div>

              <div className="mobile:max-w-[104px] tablet:max-w-[104px] w-[140px] flex flex-col gap-4 tablet:gap-[10px] mobile:gap-2">
                <div className="text-h3-regular text-gray600 mobile:text-body1-regular">
                  종료 시간
                </div>
                <Selectbox
                  placeholder="0:00"
                  onSelect={handleEndTime}
                  options={selectList}
                />
              </div>
            </div>
            <Image
              src="/icons/time_plus.svg"
              width={56}
              height={56}
              alt="시간추가아이콘"
              onClick={handleAddRange}
              style={{ cursor: 'pointer' }}
            />
          </div>
          {dateTimeRanges.length !== 0 ? (
            <div
              aria-hidden="true"
              className="border-t border-gray200 w-full"
            />
          ) : (
            ''
          )}
          {dateTimeRanges.map((item, index) => (
            <div
              key={index}
              className="flex gap-5 tablet:gap-2 mobile:gap-1.5 items-center h-[56px] text-black200 text-body1-regular"
            >
              <div className="w-full tablet:grow-[2] mobile:grow-[2] h-full bg-white border border-gray500 rounded px-4 flex items-center">
                {item.date}
              </div>
              <div className="flex gap-3 tablet:gap-2 mobile:gap-1.5 h-full grow">
                <div className="mobile:max-w-[104px] tablet:max-w-[104px] w-[140px] h-full  bg-white border border-gray500 rounded px-4 flex items-center">
                  {item.startTime}
                </div>
                <div className="flex itmes-center mobile:hidden">
                  <Image
                    src="/icons/물결.svg"
                    width={14}
                    height={26}
                    alt="~아이콘"
                  />
                </div>
                <div className="mobile:max-w-[104px] tablet:max-w-[104px] w-[140px] h-full bg-white border border-gray500 rounded px-4 flex items-center">
                  {item.endTime}
                </div>
              </div>

              <Image
                src="/icons/time_minus.svg"
                width={56}
                height={56}
                alt="시간빼기아이콘"
                onClick={() => handleRemoveRange(index)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
