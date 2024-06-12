'use client';
import { useDeleteNotification } from '@/apis/my-notifications/useDeleteMyNotification';
import useGetMyNotifications from '@/apis/my-notifications/useGetMyNotifications';
import Image from 'next/image';
import { useRef, useEffect } from 'react';

interface MyNotificationsProps {
  onClose: () => void;
}

const MyNotifications = ({ onClose }: MyNotificationsProps) => {
  const { data, error, isLoading } = useGetMyNotifications();
  const { mutate } = useDeleteNotification();
  const notificationsRef = useRef<HTMLDivElement | null>(null);

  const handleDeleteNotification = (notificationId: number) => {
    mutate({ notificationId });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationsRef.current &&
      !notificationsRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderContent = (content: string) => {
    if (!content) return null;

    // '승인'과 '거절'을 기준으로 문자열을 분리
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

  const formatDateDiff = (dateString: string) => {
    const now = new Date();
    const updatedAt = new Date(dateString);
    const diffInMilliseconds = now.getTime() - updatedAt.getTime();
    const diffInMinutes = Math.round(diffInMilliseconds / (1000 * 60));

    if (diffInMinutes < 1) {
      return '방금 전';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    } else if (diffInMinutes < 1440) {
      const diffInHours = Math.round(diffInMinutes / 60);
      return `${diffInHours}시간 전`;
    } else {
      const diffInDays = Math.round(diffInMinutes / 1440);
      return `${diffInDays}일 전`;
    }
  };

  return (
    <div
      ref={notificationsRef}
      className="w-[368px] px-5 py-6 rounded-[10px] border border-[#CBC9CF] bg-green400 text-black200 z-50 mobile:w-full mobile:h-full mobile:fixed mobile:top-0 mobile:right-0 mobile:py-10 mobile:rounded-none mobile:overflow-scroll"
      style={{ boxShadow: '0px 2px 8px 0px rgba(120, 116, 134, 0.25)' }}
    >
      <div className="flex justify-between items-center mb-4">
        <p className="text-h3-bold">알림 {data?.totalCount}개</p>
        <Image
          src="/icons/notifications-close.svg"
          className="cursor-pointer"
          alt="알림창 닫기 버튼"
          width={24}
          height={24}
          onClick={onClose}
        />
      </div>
      <div className="flex flex-col gap-2">
        {data && data.notifications.length > 0 ? (
          data.notifications.map((item) => (
            <div
              key={item.id}
              className="px-3 py-4 rounded-[5px] border border-[#CBC9CF] bg-white"
            >
              <div className="flex justify-between items-start">
                <div
                  className={`${
                    item.content.includes('승인') ? 'bg-blue300' : 'bg-red100'
                  } w-[5px] h-[5px] mt-1 rounded-full bg-blue300`}
                />
                <Image
                  src="/icons/btn-X-medium.svg"
                  className="cursor-pointer"
                  alt="알림 삭제 버튼"
                  width={24}
                  height={24}
                  onClick={() => handleDeleteNotification(item.id)}
                />
              </div>
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
          ))
        ) : (
          <p className="mb-1 text-body2-regular">새로운 알림이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default MyNotifications;
