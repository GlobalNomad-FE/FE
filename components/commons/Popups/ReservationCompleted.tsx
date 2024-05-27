'use client';

import BasePopup from '@/components/commons/Popups/BasePopup';
import React, { useState } from 'react';
import Button from '@/components/commons/Button';

const ReservationCompleted = () => {
  const [openPopup, setOpenPopup] = useState(false);

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
        예약 완료
      </Button>
      <BasePopup isOpen={openPopup} closePopup={handleClosePopup}>
        예약이 완료되었습니다!
      </BasePopup>
    </div>
  );
};

export default ReservationCompleted;
