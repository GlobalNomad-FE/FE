'use client';

import BasePopup from '@/components/commons/Popups/BasePopup';
import React, { useState } from 'react';
import Button from '@/components/commons/Button';

const ReservationCompleted = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [popupText, setPopupText] = useState('');

  const handleOpenPopup = () => {
    
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  return (
    <div>
      <Button
        width={150}
        height={50}
        fontSize={15}
        btnColor={'green'}
        textColor={'white'}
        hover={true}
        onClick={handleOpenPopup}
      >
        회원가입 하기
      </Button>
      <BasePopup isOpen={openPopup} closePopup={handleClosePopup}>
        이미 사용중인 이메일입니다.
      </BasePopup>
    </div>
  );
};

export default ReservationCompleted;
