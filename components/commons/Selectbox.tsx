import React, { useEffect, useState } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';
import Select, {
  components,
  DropdownIndicatorProps,
  StylesConfig,
} from 'react-select';
import Image from 'next/image';

interface Option {
  value: string;
  label: string;
}

interface SelectBoxProps {
  defaultValue?: Option;
  options: Option[];
  onSelect: (value: any) => void;
  placeholder: string;
}

/**
 * SelectBox component
 * @param options 객체를 담을 배열 [{ value: '문화예술', label: '문화예술' },{ value: '식음료', label: '식음료', ...]
 * @param onSelect: (value: string) => void , value에 선택한 값이 담깁니다.
 */

const Selectbox: React.FC<SelectBoxProps> = ({
  options,
  onSelect,
  placeholder,
  defaultValue,
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    if (defaultValue) {
      setSelectedOption(defaultValue);
    }
  }, [defaultValue]);

  const DropdownIndicator = (props: DropdownIndicatorProps<Option>) => {
    return (
      <components.DropdownIndicator {...props}>
        <Image
          src={`/icons/arrow_${menuIsOpen ? 'up' : 'down'}.svg`}
          alt="arrow icon"
          width={isMobile ? 16 : 24}
          height={isMobile ? 16 : 24}
        />
      </components.DropdownIndicator>
    );
  };
  const colorStyles: StylesConfig<Option> = {
    control: (styles) => ({
      ...styles,
      backgroundColor: 'white',
      boxShadow: 'none',
      borderRadius: '4px',
      borderColor: '#79747e',
      padding: isMobile ? '4px 0px 4px 12px' : '4px 0px 4px 16px',
      height: isMobile ? 40 : 57,
      fontSize: isMobile ? '14px' : '16px',

      ':hover': {
        ...styles[':active'],
        borderColor: '#112211',
      },
    }),
    option: (styles) => {
      return {
        ...styles,
        backgroundColor: 'white',
        color: '#112211',
        cursor: 'pointer',
        height: isMobile ? 25 : 40,
        borderRadius: '6px',

        ':active': {
          ...styles[':active'],
          backgroundColor: '#112211',
          color: 'white',
          cursor: 'pointer',
        },
        ':hover': {
          ...styles[':active'],
          backgroundColor: '#112211',
          color: 'white',
          cursor: 'pointer',
        },
      };
    },
    input: (styles) => {
      return {
        ...styles,
        height: '40px',
      };
    },
    menu: (styles) => {
      return {
        ...styles,
        padding: '8px',
      };
    },

    valueContainer: (styles) => {
      return {
        ...styles,
        padding: '0px',
      };
    },
    placeholder: (styles) => ({
      ...styles,
      color: '#a1a1aa',
      fontSize: isMobile ? '14px' : '16px',
      fontWeight: '400',
    }),
  };
  return (
    <Select
      instanceId={'select-unique-id'}
      options={options}
      value={selectedOption}
      onChange={(option) => {
        setSelectedOption(option as Option);
        onSelect((option as Option).value);
      }}
      styles={colorStyles}
      placeholder={placeholder}
      components={{ DropdownIndicator, IndicatorSeparator: () => null }}
      onMenuOpen={() => setMenuIsOpen(true)}
      onMenuClose={() => setMenuIsOpen(false)}
      isSearchable={false}
    />
  );
};

export default Selectbox;
