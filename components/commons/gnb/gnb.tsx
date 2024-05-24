import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useToggleButton } from '@/hooks/useToggleButton';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Avatar from '@/components/commons/avatar/avatar';
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
    <div className="fixed top-[0] w-full h-28 bg-[white] border-b border-gray200 flex justify-around ">
      <div className=" max-w-[120rem] w-full mx-[auto] items-center flex justify-between px-[2.4rem] py-[1rem] ">
        <Link href="/">
          <Image
            src="/icons/logo_small.svg"
            alt="로고"
            height={28}
            width={166}
          />
        </Link>
        <div>
          {!Auth ? (
            <div className=" flex gap-[2.5rem] relative text-[1.4rem] h3-bold text-[black200] ">
              <Link href="/signin">로그인</Link>
              <Link href="/signup">회원가입</Link>
            </div>
          ) : (
            //TODO 로그인 되면 알람이 뜰 수 있게
            <div className=" flex gap-[2.5rem] static">
              <button onClick={isNotificationOpenToggle}>
                <Image src="/icons/notification.svg" alt="알림" />
              </button>
              {isNotificationOpen && '모달 자리'}
              <div className=" flex relative gap-[2.5rem] ">
                <div className=" h-[2.2rem] border-r-[1px_gray300]" />
                <div className="flex w-[fit-content] gap-[1rem]">
                  <Avatar
                    profileImageUrl={null} //TODO profileImageUrl 변수 정의 필요
                  />
                  <button
                    onClick={isDropdownOpenToggle}
                    ref={ref}
                    className=" flex text-[1.4rem] body1-regular text-[nomad-black]"
                  >
                    메뉴
                    {/* user 데이터 받아오면서 수정 */}
                  </button>
                  {isDropdownOpen && (
                    <DropdownMenu dropdownMenuList={MyMenuList} />
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
