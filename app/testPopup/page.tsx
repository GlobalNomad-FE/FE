import CancelReservation from '@/components/commons/Popups/CancelReservation';
import ReservationCompleted from '@/components/commons/Popups/ReservationCompleted';
import React from 'react';

export default function Page() {
  return (
    <main className="p-[5rem] text-white flex justify-center gap-20">
      <ReservationCompleted />
      <CancelReservation>예약을 취소하시겠어요?</CancelReservation>
    </main>
  );
}
