import React, { useState } from 'react';

const ColorValue: { [key: string]: string } = {
  green: '#112211',
  gray: '#a4a1aa',
  white: 'white',
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width: number;
  height: number;
  text: string;
  fontSize: number;
  bgColor: 'green' | 'white' | 'gray';
  textColor: 'green' | 'white' | 'gray';
  border?: boolean;
  borderColor?: 'green' | 'white' | 'gray';
  hover?: boolean;
}

const Button = ({
  width,
  height,
  text,
  fontSize,
  bgColor,
  textColor,
  border = false,
  borderColor = 'green',
  hover = false,
  ...rest
}: ButtonProps) => {
  const [hovered, setHovered] = useState(false);
  const pxToRem = (value: number) => {
    return value / 16 + 'rem';
  };

  const handleMouseOver = () => {
    if (hover) setHovered(true);
  };

  const handleMouseOut = () => {
    if (hover) setHovered(false);
  };

  return (
    <>
      <button
        {...rest}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        style={{
          width: pxToRem(hovered ? width * 0.8 : width),
          height: pxToRem(hovered ? height * 0.8 : height),
          fontSize: pxToRem(hovered ? fontSize * 1.2 : fontSize),
          backgroundColor: ColorValue[bgColor],
          color: ColorValue[textColor],
          marginTop: pxToRem(hovered ? height * 0.1 : 0),
          marginRight: pxToRem(hovered ? width * 0.1 : 0),
          marginBottom: pxToRem(hovered ? height * 0.1 : 0),
          marginLeft: pxToRem(hovered ? width * 0.1 : 0),
          border: border
          ? `solid 1px ${ColorValue[borderColor]}`
          : 'none',
        }}
        className='text-white rounded-[8px] cursor-pointer flex items-center justify-center duration-500'
      >
        {text}
      </button>
    </>
  );
};

export default Button;