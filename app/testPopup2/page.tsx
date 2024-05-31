'use client';

import BasePopupTwoBtns from '@/components/commons/Popups/BasePopupTwoBtns';
import React, { useState } from 'react';
import Button from '@/components/commons/Button';

export default function Page() {
  const [openPopup, setOpenPopup] = useState(false);

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const showAlert = () => {
    alert('테스트');
  };

  return (
    <main>
      <Button
        width={150}
        height={50}
        fontSize={15}
        btnColor={'green'}
        textColor={'white'}
        hover={true}
        onClick={handleOpenPopup}
      >
        예약취소
      </Button>
      <BasePopupTwoBtns
        buttonText="취소하기"
        isOpen={openPopup}
        closePopup={handleClosePopup}
        clickEvent={showAlert}
      >
        예약을 취소하시겠어요?
      </BasePopupTwoBtns>
    </main>
  );
}
