import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

interface PageMenuProp {
  linkTo: string;
  icon: any;
  activeIcon: any;
  name: string;
}

const PageMenu = ({ linkTo, icon, activeIcon, name }: PageMenuProp) => {
  const router = useRouter();
  const isActive = router.pathname.startsWith(linkTo);
  return (
    <Link href={linkTo}>
      <a
        className={`flex h-11 p-[9px] pr-[16px] pb-[9px] pl-[16px] items-center self-stretch rounded-xl hover:bg-green-10
        ${isActive ? ' bg-green-10 text-black' : ' text-gray-60'}`}
      >
        <div className="flex gap-[14px]">
          <Image
            src={isActive ? activeIcon : icon}
            alt="Icon"
            width={24}
            height={24}
          />
          <span className=" text-base font-bold">{name}</span>
        </div>
      </a>
    </Link>
  );
};

export default PageMenu;
