import React from 'react';
import { useCalendar } from '../lib/Calendar.provider';

/**
 *
 * @param schedules: api 데이터로 받아오는 스케쥴 리스트 (프로바이더 schedule과 다른것)
 */
const TimeSelector = ({ schedules }: { schedules: any[] }) => {
  const { onChangeSchedule, selectSchedule, formatedDate } = useCalendar();

  return (
    <div className="mt-4  flex flex-col gap-3.5 mobile:mt-7">
      <p className="text-h3-bold text-black200 mobile:text-h2">
        예약 가능한 시간
      </p>
      <div>
        {schedules.map((data) => {
          const isSelected = selectSchedule?.id === data.id;
          const isDate = formatedDate === data.date;
          return (
            isDate && (
              <button
                className={`border rounded-lg border-nomad-black active:bg-nomad-black active:text-white text-base font-medium py-[1rem] px-[1.2rem] text-nomad-black mr-[1.2rem] mb-[1.2rem] ${
                  isSelected
                    ? 'bg-nomad-black text-white'
                    : 'bg-white text-nomad-black'
                }`}
                key={data.id}
                onClick={() => onChangeSchedule(data)}
              >
                {data.startTime}~{data.endTime}
              </button>
            )
          );
        })}
      </div>
    </div>
  );
};

export default TimeSelector;
