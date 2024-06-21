import DatePickerInput from '../commons/DatePickerInput';
import { useEffect, useState } from 'react';
import Selectbox from '../commons/Selectbox';
import Image from 'next/image';
import formatDateToYYYYMMDD, { formatDate } from '@/utils/dateFormatter';
import { KeyActivitiesData } from '@/app/activities/register/page';
import useMediaQuery from '@/hooks/useMediaQuery';

export type DateType = Date | null;
type StringNullType = string | null;

interface InputProps {
  error?: string;
  name: string;
  control: any;
  placeholder: string;
  labelName: string;
  handlevalue: (id: KeyActivitiesData, value: any) => void;
  value?: DateTimeRange[];
}

interface DateTimeRange {
  id: number;
  date: StringNullType;
  startTime: StringNullType;
  endTime: StringNullType;
}

export default function TimeInput({
  labelName,
  handlevalue,
  value,
}: InputProps) {
  const [date, setDate] = useState<DateType>(new Date());
  const [startTime, setStartTime] = useState<StringNullType>(null);
  const [endTime, setEndTime] = useState<StringNullType>(null);

  const [dateTimeRanges, setDateTimeRanges] = useState<DateTimeRange[]>([]);

  const [removeRanges, setRemvoeRanges] = useState<number[]>([]);
  const isMobile = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    if (value) {
      setDateTimeRanges([...value]);
    }
  }, [value]);

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
      alert('시작 시간 또는 종료 시간이 잘못되었습니다.');
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
          id: dateTimeRanges.length + 1,
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
  const handleRemoveRange = (id: number) => {
    const removeRange = dateTimeRanges.filter((_, i) => _.id !== id);
    setDateTimeRanges([...removeRange]);
    const removeList = [...removeRanges, id];
    setRemvoeRanges([...removeList]);
    handlevalue('schedules', removeRange);
    handlevalue('scheduleIdsToRemove', removeList);
  };

  return (
    <div className="w-full">
      <div className="text-h2 text-black200 mb-6">{labelName}</div>
      <div className="flex gap-[10px] flex-col items-center w-full">
        <div className="flex flex-col gap-5 w-full">
          <div className="flex gap-5 tablet:gap-2 mobile:gap-1.5 w-full items-end justify-between mobile:flex-col mobile:items-start">
            <div className="flex w-full tablet:grow-[2] mobile:grow-[2] flex-col gap-4 tablet:gap-[10px] mobile:gap-2">
              <div className="text-h3-regular text-gray600 mobile:text-body1-regular">
                날짜
              </div>
              <DatePickerInput onSelectedDateChange={handleDate} />
            </div>
            <div className="flex gap-3 tablet:gap-2 mobile:gap-1.5 grow items-end mobile:mt-3">
              <div className="mobile:max-w-[104px] w-[140px] flex flex-col gap-4 tablet:gap-[10px] mobile:gap-2 mobile:w-[90px] font-[20px]">
                <div className="text-h3-regular text-gray600 mobile:text-body1-regular">
                  시작 시간
                </div>
                <Selectbox
                  placeholder="0:00"
                  onSelect={handleStartTime}
                  options={selectList}
                />
              </div>
              <div className="pb-6 mobile:pb-4">
                <Image
                  src="/icons/물결.svg"
                  width={isMobile ? 7 : 14}
                  height={isMobile ? 13 : 26}
                  alt="~아이콘"
                />
              </div>

              <div className="mobile:max-w-[104px] w-[140px] flex flex-col gap-4 tablet:gap-[10px] mobile:gap-2 mobile:w-[90px]">
                <div className="text-h3-regular text-gray600 mobile:text-body1-regular">
                  종료 시간
                </div>
                <Selectbox
                  placeholder="0:00"
                  onSelect={handleEndTime}
                  options={selectList}
                />
              </div>
              <Image
                src="/icons/time_plus.svg"
                width={isMobile ? 40 : 56}
                height={isMobile ? 40 : 56}
                alt="시간추가아이콘"
                onClick={handleAddRange}
                style={{ cursor: 'pointer' }}
              />
            </div>
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
              className="flex gap-5 tablet:gap-2 mobile:gap-1.5 w-full h-[56px] mobile:h-[40px] text-black200 text-body1-regular"
            >
              <div className="flex w-full tablet:grow-[2] mobile:grow-[2] h-full bg-white border border-gray500 rounded px-4 items-center">
                {formatDate(item.date || '')}
              </div>
              <div className="flex gap-3 tablet:gap-2 mobile:gap-1.5 h-full grow items-end">
                <div className="mobile:max-w-[104px] w-[140px] h-full bg-white border border-gray500 rounded px-4 flex items-center">
                  {item.startTime}
                </div>
                <div className="pb-6 mobile:pb-4">
                  <Image
                    src="/icons/물결.svg"
                    width={isMobile ? 7 : 14}
                    height={isMobile ? 13 : 26}
                    alt="~아이콘"
                  />
                </div>
                <div className="mobile:max-w-[104px] w-[140px] h-full bg-white border border-gray500 rounded px-4 flex items-center">
                  {item.endTime}
                </div>
                <Image
                  src="/icons/time_minus.svg"
                  width={isMobile ? 40 : 56}
                  height={isMobile ? 40 : 56}
                  alt="시간빼기아이콘"
                  onClick={() => handleRemoveRange(item.id)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
