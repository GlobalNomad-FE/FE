'use client';
import Image from 'next/image';
import { useState, useRef } from 'react';
import Notifications from './Notifications';
import useGetMyNotifications from '@/apis/my-notifications/useGetMyNotifications';

const MyNotifications = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationIconRef = useRef<HTMLImageElement | null>(null);

  const { data } = useGetMyNotifications();

  const handleNotificationsOpen = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const handleNotificationClose = () => {
    setIsNotificationsOpen(false);
  };

  const hasNotifications = data && data.totalCount > 0;

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
      {hasNotifications && (
        <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red100"></div>
      )}
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
