'use client';
import ReservationButton from '@common/ReservationButton';
import TabletCalender from '../Calendar/TabletCalendar';
import { useCalendar } from '../lib/Calendar.provider';
import { formatWage } from '@/utils/wageFormatter';
import { usePostActivityReservation } from '@/apis/activities/mutaion/usePostActivityReservation';
import BasePopup from '@/components/commons/Popups/BasePopup';
import { useState } from 'react';

export default function MobileReservationWidgetContainer() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { mutate } = usePostActivityReservation();
  const { selectSchedule, members, data } = useCalendar();
  const id = selectSchedule?.id;
  const { price, id: activityId } = data;
  const reservationData = {
    scheduleId: id,
    headCount: members,
  };

  const handleReservation = () => {
    mutate(
      { activityId, reservationData },
      {
        onSuccess: () => {
          setIsPopupOpen(true);
        },
        onError: (error) => {
          setIsPopupOpen(true);
          switch (error.response?.status) {
            case 401:
              setErrorMessage('로그인을 해주세요.');
              break;
            case 404:
              setErrorMessage('존재하지 않는 체험입니다');
              break;
            case 409:
              setErrorMessage('확정 예약이 있는 일정은 예약할 수 없습니다.');
              break;
            default:
              setErrorMessage('scheduleId는 숫자로 입력해주세요.');
              break;
          }
        },
      },
    );
  };

  return (
    <div className="w-full fixed border-t border-[#A1A1A1] p-4 bg-white flex justify-between left-0 bottom-0 z-10">
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
      {isPopupOpen && (
        <BasePopup
          isOpen={isPopupOpen}
          closePopup={() => {
            setIsPopupOpen(false);
          }}
        >
          {errorMessage ? errorMessage : '예약이 완료되었습니다.'}
        </BasePopup>
      )}
    </div>
  );
}
