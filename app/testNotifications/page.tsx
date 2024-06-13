'use client';
import MyNotifications from '@/components/commons/MyNotifications';
import Image from 'next/image';
import { useState, useRef } from 'react';

const TestNotifications = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationIconRef = useRef<HTMLImageElement | null>(null);

  const handleNotificationsOpen = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const handleNotificationClose = () => {
    setIsNotificationsOpen(false);
  };

  return (
    <div className="m-6">
      <Image
        src="/icons/notification.svg"
        alt="알림"
        width={20}
        height={20}
        className="mb-6 cursor-pointer"
        onClick={handleNotificationsOpen}
        ref={notificationIconRef}
      />
      {isNotificationsOpen && (
        <MyNotifications
          onClose={handleNotificationClose}
          notificationIconRef={notificationIconRef}
        />
      )}
    </div>
  );
};

export default TestNotifications;
