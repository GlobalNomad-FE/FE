'use client';

import BaseModal from '@/components/commons/Modals/BaseModal';
import React, { useState } from 'react';
import Button from '@/components/commons/Button';

const TestModal2 = () => {
  const [openModal, setOpenModal] = useState(true);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
        onClick={handleOpenModal}
      >
        모달 테스트
      </Button>
      <BaseModal
        title="모달 제목"
        isOpen={openModal}
        closeModal={handleCloseModal}
      >
        가입이 완료되었습니다!
      </BaseModal>
    </div>
  );
};

export default TestModal2;
