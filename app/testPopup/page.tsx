import CancelReservation from '@/components/CancelReservation';
import SignedUpTest from '@/components/commons/SignedUpTest';
import React from 'react';

export default function Page() {
  return (
    <main className="p-[5rem] text-white flex justify-center gap-20">
      <SignedUpTest />
      <CancelReservation>예약을 취소하시겠어요?</CancelReservation>
    </main>
  );
}
