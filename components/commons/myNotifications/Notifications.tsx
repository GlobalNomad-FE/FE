'use client';
import useGetMyNotifications from '@/apis/my-notifications/useGetMyNotifications';
import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';
import NotificationItem from './NotificationsItem';

interface MyNotificationsProps {
  onClose: () => void;
  notificationIconRef: React.RefObject<HTMLImageElement>;
}

const Notifications = ({
  onClose,
  notificationIconRef,
}: MyNotificationsProps) => {
  const { data, error, isLoading } = useGetMyNotifications();
    const notificationsRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node) &&
        notificationIconRef.current &&
        !notificationIconRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose, notificationIconRef],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div
      ref={notificationsRef}
      className="absolute left-[-212px] top-[61px] w-[368px] px-5 py-6 rounded-[10px] border border-[#CBC9CF] bg-green400 text-black200 z-50 mobile:top-0 mobile:left-0 mobile:w-full mobile:min-h-screen"
      style={{ boxShadow: '0px 2px 8px 0px rgba(120, 116, 134, 0.25)' }}
    >
      <div className="flex justify-between items-center">
        <p className="text-h3-bold">
          {data?.totalCount === 0
            ? '알림이 없습니다.'
            : `알림 ${data?.totalCount}개`}
        </p>
        <Image
          src="/icons/notifications-close.svg"
          alt="알림창 닫기 버튼"
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={onClose}
        />
      </div>
      {data && data.notifications.length > 0 && (
        <div className="flex flex-col gap-2 mt-4 h-[632px] overflow-scroll scrollbar-hide mobile:h-full">
          {data.notifications.map((item) => (
            <NotificationItem
              key={item.id}
              id={item.id}
              content={item.content}
              updatedAt={item.updatedAt}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
