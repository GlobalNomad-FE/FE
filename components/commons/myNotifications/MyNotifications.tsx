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
    <div className="relative mobile:static">
      <Image
        src="/icons/notification.svg"
        alt="알림"
        width={20}
        height={20}
        className="cursor-pointer"
        onClick={handleNotificationsOpen}
        ref={notificationIconRef}
      />
      {isNotificationsOpen && (
        <Notifications
          onClose={handleNotificationClose}
          notificationIconRef={notificationIconRef}
        />
      )}
    </div>
  );
};

export default MyNotifications;
