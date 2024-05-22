import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useToggleButton } from '@/hooks/useToggleButton';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Avatar from '@/components/avatar/avatar';
import DropdownMenu from '../dropdownMenu/DropdownMenu';

export default function Gnb() {
  const router = useRouter();
  const [Auth, setAuth] = useState(false);
  const { isToggle: isDropdownOpen, handleToggleClick: isDropdownOpenToggle } =
    useToggleButton();
  const {
    isToggle: isNotificationOpen,
    handleToggleClick: isNotificationOpenToggle,
  } = useToggleButton();
  const ref = useRef<HTMLButtonElement>(null);

  // 외부 클릭을 감지하여 드롭다운 메뉴를 닫습니다.
  useOutsideClick(ref, isDropdownOpen, isDropdownOpenToggle);

  useEffect(() => {
    // 로그인 상태를 확인하고 설정합니다.
    if (
      localStorage.getItem('accessToken') &&
      localStorage.getItem('refreshToken')
    ) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);

  const handleLogout = () => {
    // 로그아웃 시 처리하는 함수입니다.
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    isDropdownOpenToggle();
    router.push('/signin');
  };

  const handleMyPageClick = () => {
    // 마이 페이지로 이동하는 함수입니다.
    isDropdownOpenToggle();
    router.push('/mypage');
  };

  const MyMenuList = [
    {
      text: '내 정보',
      handleClick: handleMyPageClick,
    },
    {
      text: '로그아웃',
      handleClick: handleLogout,
    },
  ];

  return (
    <div>
      <div>
        <Link href="/">
          <Image
            src="/icons/logo_small.svg" // /public 제거
            alt="로고"
            height={28}
            width={166}
          />
        </Link>
        <div>
          {!Auth ? (
            <div>
              <Link href="/signin">로그인</Link>
              <Link href="/signup">회원가입</Link>
            </div>
          ) : (
            <div>
              <button onClick={isNotificationOpenToggle}>
                <Image
                  src="/icons/notification.svg" // /public 제거
                  alt="알림"
                />
              </button>
              {isNotificationOpen && '모달 자리'}
              <div>
                <div />
                <div>
                  <Avatar
                    profileImageUrl={null} // profileImageUrl 변수 정의 필요
                    type="gnb"
                  />
                  <button onClick={isDropdownOpenToggle} ref={ref}>
                    메뉴
                  </button>
                  {isDropdownOpen && (
                    <DropdownMenu type="gnb" dropdownMenuList={MyMenuList} />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
