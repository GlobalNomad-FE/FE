import React, { useState } from 'react';
import Select, { components, DropdownIndicatorProps } from 'react-select';
import Image from 'next/image';

interface Option {
  value: string;
  label: string;
}

interface SelectBoxProps {
  options: Option[];
  onSelect: (value: string) => void;
}

/**
 * SelectBox component
 * @param options 객체를 담을 배열 [{ value: '문화예술', label: '문화예술' },{ value: '식음료', label: '식음료', ...]
 * @param onSelect: (value: string) => void , value에 선택한 값이 담깁니다.
 */

const Selectbox: React.FC<SelectBoxProps> = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const DropdownIndicator = (props: DropdownIndicatorProps<Option>) => {
    return (
      <components.DropdownIndicator {...props}>
        <Image
          src={`/icons/arrow_${menuIsOpen ? 'up' : 'down'}.svg`}
          alt="arrow icon"
          width={48}
          height={48}
        />
      </components.DropdownIndicator>
    );
  };

  return (
    <Select
      className="w-[800px] h-[56px]"
      options={options}
      value={selectedOption}
      onChange={(option) => {
        setSelectedOption(option as Option);
        onSelect((option as Option).value);
      }}
      placeholder="카테고리"
      components={{ DropdownIndicator }}
      onMenuOpen={() => setMenuIsOpen(true)}
      onMenuClose={() => setMenuIsOpen(false)}
    />
  );
};

export default Selectbox;
