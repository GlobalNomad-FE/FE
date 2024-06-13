'use client';

import React from 'react';
import ReviewModal from '@/components/commons/Popups/ReviewModal/ReviewModal';

export default function Page() {
  return (
    <main>
      <ReviewModal
        title="토끼"
        bannerImageUrl="https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/4-13_346_1717748201180.avif"
        date="2024-06-14"
        startTime="02:10"
        endTime="02:20"
        headCount={1}
        totalPrice={10000}
        reservationId={1632}
      />
    </main>
  );
}
