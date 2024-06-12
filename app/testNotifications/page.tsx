'use client';
import MyNotifications from '@/components/commons/MyNotifications';
import Image from 'next/image';
import { useState } from 'react';

const TestNotifications = () => {
  const [isnNotificationsOpen, setIsnNotificationsOpen] = useState(false);

  const handleNotificationOpen = () => {
    setIsnNotificationsOpen(!isnNotificationsOpen);
  };

  const handleNotificationClose = () => {
    setIsnNotificationsOpen(false);
  };

  return (
    <div className="m-6">
      <Image
        src="/icons/notification.svg"
        alt="알림"
        width={20}
        height={20}
        className="mb-6 cursor-pointer"
        onClick={handleNotificationOpen}
      />
      {isnNotificationsOpen && (
        <MyNotifications onClose={() => handleNotificationClose()} />
      )}
    </div>
  );
};

export default TestNotifications;
