'use client';
import useGetMyNotifications from '@/apis/my-notifications/useGetMyNotifications';
import Image from 'next/image';

const MyNotifications = () => {
  const { data, error, isLoading } = useGetMyNotifications();

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
      className="w-[368px] px-5 py-6 rounded-[10px] border border-[#CBC9CF] bg-green400 text-black200"
      style={{ boxShadow: '0px 2px 8px 0px rgba(120, 116, 134, 0.25)' }}
    >
      <div className="flex justify-between items-center mb-4">
        <p className="text-h3-bold">알림 {data?.totalCount}개</p>
        <Image
          src="/icons/notifications-close.svg"
          alt="알림창 닫기 버튼"
          width={24}
          height={24}
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
                <div className=" w-[5px] h-[5px] mt-1 rounded-full bg-blue300" />
                <Image
                  src="/icons/btn-X-medium.svg"
                  alt="알림 삭제 버튼"
                  width={24}
                  height={24}
                />
              </div>
              <p className="mb-1 text-body2-regular">{item.content}</p>
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
