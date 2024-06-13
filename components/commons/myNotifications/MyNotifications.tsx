'use client';
import Image from 'next/image';
import { useState, useRef } from 'react';
import Notifications from './Notifications';

const MyNotifications = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationIconRef = useRef<HTMLImageElement | null>(null);

  const handleNotificationsOpen = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const handleNotificationClose = () => {
    setIsNotificationsOpen(false);
  };

  return (
    <>
      <Image
        src="/icons/notification.svg"
        alt="알림"
        width={20}
        height={20}
        className="mb-[37px] cursor-pointer"
        onClick={handleNotificationsOpen}
        ref={notificationIconRef}
      />
      {isNotificationsOpen && (
        <Notifications
          onClose={handleNotificationClose}
          notificationIconRef={notificationIconRef}
        />
      )}
    </>
  );
};

export default MyNotifications;
