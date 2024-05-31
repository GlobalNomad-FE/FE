'use client';

import EmailExist from '@/components/tests/EmailExist';
import React from 'react';
import ReviewModal from '@/components/commons/Popups/ReviewModal/ReviewModal';
import ReservationCompleted from '@/components/tests/ReservationCompleted';

export default function Page() {
  return (
    <main className="p-[5rem] text-white flex justify-center gap-20">
      <EmailExist />
      <ReservationCompleted />
      <ReviewModal
        title="함께배우면 즐거운 스트릿 댄스"
        url="/images/스트릿댄스.png"
        date="2023. 2. 14"
        time="11:00 - 12:30"
        count={10}
        price={10000}
        reservationId={12341234}
      />
    </main>
  );
}
