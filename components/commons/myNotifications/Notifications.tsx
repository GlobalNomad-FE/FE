'use client';
import { useDeleteNotification } from '@/apis/my-notifications/useDeleteMyNotification';
import useGetMyNotifications from '@/apis/my-notifications/useGetMyNotifications';
import formatDateDiff from '@/utils/formatDateDiff';
import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';

interface MyNotificationsProps {
  onClose: () => void;
  notificationIconRef: React.RefObject<HTMLImageElement>;
}

const Notifications = ({
  onClose,
  notificationIconRef,
}: MyNotificationsProps) => {
  const { data, error, isLoading } = useGetMyNotifications();
  const { mutate } = useDeleteNotification();
  const notificationsRef = useRef<HTMLDivElement | null>(null);

  const handleDeleteNotification = (notificationId: number) => {
    mutate({ notificationId });
  };

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

  const renderContent = (content: string) => {
    if (!content) return null;

    const parts = content.split(/(승인|거절)/g);
    return parts.map((part, index) => {
      if (part === '승인') {
        return (
          <span key={index} className="text-blue300">
            승인
          </span>
        );
      }
      if (part === '거절') {
        return (
          <span key={index} className="text-red100">
            거절
          </span>
        );
      }
      return part;
    });
  };

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
          onClick={onClose}
        />
      </div>
      {data && data.notifications.length > 0 && (
        <div className="flex flex-col gap-2 mt-4 h-[632px] overflow-scroll scrollbar-hide mobile:h-full">
          {data.notifications.map((item) => (
            <div key={item.id} className="min-h-[120px] px-3 py-4 bg-white">
              <div className="flex justify-between items-start">
                <div
                  className={`${
                    item.content.includes('승인') ? 'bg-blue300' : 'bg-red100'
                  } w-[5px] h-[5px] mt-1 rounded-full bg-blue300`}
                ></div>
                <Image
                  src="/icons/btn-X-medium.svg"
                  alt="알림 삭제 버튼"
                  width={24}
                  height={24}
                  onClick={() => handleDeleteNotification(item.id)}
                />
              </div>
              <div className="flex flex-col justify-between">
                <p
                  className="mb-1 text-body2-regular"
                  style={{ wordBreak: 'keep-all', wordWrap: 'break-word' }}
                >
                  {renderContent(item.content)}
                </p>
                <p className="text-caption text-gray400">
                  {formatDateDiff(item.updatedAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
