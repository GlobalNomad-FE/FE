'use client';

import CancelReservation from '@/components/commons/Popups/CancelReservation';
import ReservationCompleted from '@/components/commons/Popups/ReservationCompleted';
import EmailExist from '@/components/commons/Popups/EmailExist';
import React from 'react';
import ReviewModal from '@/components/commons/Popups/ReviewModal/ReviewModal';

export default function Page() {
  return (
    <main className="p-[5rem] text-white flex justify-center gap-20">
      <EmailExist />
      <ReservationCompleted />
      <CancelReservation>예약을 취소하시겠어요?</CancelReservation>
      <ReviewModal />
      
    </main>
  );
}
