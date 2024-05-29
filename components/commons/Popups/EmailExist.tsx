import BasePopup from '@/components/commons/Popups/BasePopup';
import React, { useState } from 'react';
import Button from '@/components/commons/Button';

const EmailExist = () => {
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
        회원가입 하기
      </Button>
      {/* 팝업 여기부터 아래 3줄처럼 사용하면 됨  */}
      <BasePopup isOpen={openPopup} closePopup={handleClosePopup}>
        이미 사용중인 이메일입니다.
      </BasePopup>
    </div>
  );
};

export default EmailExist;
