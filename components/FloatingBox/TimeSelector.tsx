import React from 'react';
import formatDateToYYYYMMDD from '@/utils/dateFormatter';

const TimeSelector = ({
  schedules,
  selectedDate,
  value,
  handleTimeSelect,
}: {
  schedules: any[];
  selectedDate: string;
  value: number | null;
  handleTimeSelect: (id: number) => void;
}) => (
  <div className="mt-4  flex flex-col gap-3.5">
    <p className="text-h4-bold text-green400">예약 가능한 시간</p>
    <div>
      {schedules.map((data) => {
        const isSelected = value === data.id;
        const isDate = selectedDate === data.date;
        return (
          isDate && (
            <button
              className={`border rounded-lg border-nomad-black active:bg-nomad-black active:text-white text-body1-regular font-medium-w py-[1rem] px-[1.2rem] text-nomad-black mr-[1.2rem] mb-[1.2rem] ${
                isSelected
                  ? 'bg-nomad-black text-white'
                  : 'bg-white text-nomad-black'
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
);

export default TimeSelector;
