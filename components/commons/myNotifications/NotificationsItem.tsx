'use client';
import { useDeleteNotification } from '@/apis/my-notifications/useDeleteMyNotification';
import formatDateDiff from '@/utils/formatDateDiff';
import Image from 'next/image';

interface NotificationItemType {
  id: number;
  content: string;
  updatedAt: string;
}

const NotificationItem = ({ id, content, updatedAt }: NotificationItemType) => {
  const { mutate } = useDeleteNotification();

  const handleDeleteNotification = (notificationId: number) => {
    mutate({ notificationId });
  };

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
    <div className="h-[120px] px-3 py-4 rounded-[5px] border border-[#CBC9CF] bg-white">
      <div className="flex justify-between items-start">
        <div
          className={`${
            content.includes('승인') ? 'bg-blue300' : 'bg-red100'
          } w-[5px] h-[5px] mt-1 rounded-full`}
        ></div>
        <Image
          src="/icons/btn-X-medium.svg"
          alt="알림 삭제 버튼"
          width={24}
          height={24}
          className="cursor-pointer"
          onClick={() => handleDeleteNotification(id)}
        />
      </div>
      <div className="flex flex-col justify-between h-[62px]">
        <p
          className="mb-1 text-body2-regular"
          style={{ wordBreak: 'keep-all', wordWrap: 'break-word' }}
        >
          {renderContent(content)}
        </p>
        <p className="text-caption text-gray400">{formatDateDiff(updatedAt)}</p>
      </div>
    </div>
  );
};

export default NotificationItem;
