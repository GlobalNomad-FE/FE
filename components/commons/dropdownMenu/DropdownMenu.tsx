interface DropdownMenuProps {
  type?: 'meatball' | 'gnb';
  dropdownMenuList: { text: string; handleClick: () => void }[];
}

export default function DropdownMenu({ dropdownMenuList }: DropdownMenuProps) {
  return (
    <div>
      {dropdownMenuList.map(dropdownMenu => (
        <button key={dropdownMenu.text} onClick={dropdownMenu.handleClick}>
          {dropdownMenu.text}
        </button>
      ))}
    </div>
  );
}
