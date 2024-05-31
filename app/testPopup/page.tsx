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
      <ReviewModal />
    </main>
  );
}
