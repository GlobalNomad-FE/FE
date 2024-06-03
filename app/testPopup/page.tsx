'use client';

import EmailExist from '@/components/tests/EmailExist';
import React from 'react';
import ReviewModal from '@/components/commons/Popups/ReviewModal/ReviewModal';
import ReservationCompleted from '@/components/tests/ReservationCompleted';

export default function Page() {
  return (
    <main>
      <EmailExist />
      <ReservationCompleted />
      <ReviewModal
        title="함께배우면 즐거운 스트릿 댄스"
        bannerImageUrl="/images/스트릿댄스.png"
        date="2023. 2. 14"
        startTime="11:00"
        endTime="12:30"
        headCount={10}
        totalPrice={10000}
        reservationId={12341234}
      />
    </main>
  );
}
