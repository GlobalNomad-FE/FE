import Image from 'next/image';
import Link from 'next/link';

interface DropdownMenuProps {
  dropdownMenuList: {
    icon: string;
    alt: string;
    label: string;
    path: string;
    handleClick?: () => void;
  }[];
}

export default function DropdownMenu({ dropdownMenuList }: DropdownMenuProps) {
  return (
    <div
      className="bg-white absolute top-[72px] right-[-45px] w-[160px] border rounded-md text-gray600 text-body1-regular cursor-pointer mobile:w-[150px] mobile:right-[-15px]"
      style={{ boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.08)' }}
    >
      {dropdownMenuList.map((item, index) =>
        item.label !== '로그아웃' ? (
          <Link
            key={index}
            href={item.path}
            className="flex gap-3 items-center h-[3.625rem] py-4 px-[22px] border-b border-gray200 text-gray600 font-medium hover:bg-gray100 mobile:h-[3.5rem] mobile:text-sm"
          >
            <Image
              src={item.icon}
              className="opacity-70"
              width={20}
              height={20}
              alt={item.alt}
            />
            <p>{item.label}</p>
          </Link>
        ) : (
          <div
            key={index}
            onClick={item.handleClick}
            className="flex gap-3 items-center h-[3.625rem] py-4 px-[22px] border-gray200 text-gray600 font-medium hover:bg-gray100 mobile:h-[3.5rem] mobile:text-sm"
          >
            <Image
              src={item.icon}
              className="opacity-80 ml-[3px] mr-[2px]"
              width={16}
              height={16}
              alt={item.alt}
            />
            <p>{item.label}</p>
          </div>
        ),
      )}
    </div>
  );
}
