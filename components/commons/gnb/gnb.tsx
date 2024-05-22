import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useToggleButton } from '@/hooks/useToggleButton';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
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

  useOutsideClick(ref, isDropdownOpen, isDropdownOpenToggle);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    if (!localStorage.getItem('accessToken')) {
      isDropdownOpenToggle();
      router.push('/signin');
    }
  };

  const handleMyPageClick = () => {
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
              <button>
                <Image
                  src="/icons/notification.svg" // /public 제거
                  alt="알림"
                  onClick={isNotificationOpenToggle}
                />
              </button>
              {isNotificationOpen && '모달 들어갈 자리'}
              <div>
                <div />
                <div>
                  <Avatar
                    profileImageUrl={null} // profileImageUrl 변수 정의 필요
                    type="gnb"
                  />
                  <button onClick={isDropdownOpenToggle} ref={ref}></button>
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
