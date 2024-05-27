import React from 'react';
import ReservationButton from '@common/ReservationButton';
import TabletCalender from '../Calendar/TabletCalendar';
import data from '../mock.json';
import { useCalendar } from '../lib/Calendar.provider';
import { formatWage } from '@/utils/wageFormatter';

export default function MobileReservationWidgetContainer() {
  //TODO - API
  const { price } = data;
  //TODO - 임시 (팝업모달 나오게 해야함.)
  const handleReservation = () => {
    alert('예약이 완료되었습니다.');
  };

  const { selectSchedule, members } = useCalendar();
  const id = selectSchedule?.id;

  return (
    <div className="w-full fixed border-t border-[#A1A1A1] p-4 bg-white flex justify-between">
      <div className=" flex flex-col">
        <div className="flex gap-[6px] items-center">
          <p className="text-h3-bold text-nomad-black">
            {formatWage(price * members)} /
          </p>
          <p className="text-h4-regular text-green200 underline">
            {` 총 ${members}인`}
          </p>
        </div>
        <div>
          <TabletCalender />
        </div>
      </div>
      <div className="w-[120px]">
        <ReservationButton
          text="예약하기"
          value={!!id}
          handleButtonClick={handleReservation}
        />
      </div>
    </div>
  );
}
