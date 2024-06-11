import Image from 'next/image';

const MyNotifications = () => {
  return (
    <div>
      <div>
        <p>알림 6개</p>
        <Image
          src="/icons/notifications-close.svg"
          alt="알림창 닫기 버튼"
          width={24}
          height={24}
        />
      </div>
      <div>
        <div>
          <div></div>
          <Image
            src="/icons/btn-X-medium.svg"
            alt="알림 삭제 버튼"
            width={24}
            height={24}
          />
        </div>
        <p>
          함께하면 즐거운 스트릿 댄스(2023-01-14 15:00~18:00) 예약이{' '}
          <span>승인</span>되었어요.
        </p>
        <p>1분전</p>
      </div>
    </div>
  );
};

export default MyNotifications;
