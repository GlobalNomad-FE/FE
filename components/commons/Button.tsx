'use client';
import React, { useState } from 'react';

const ColorValue: { [key: string]: string } = {
  green: '#0B3B2D',
  gray: '#a4a1aa',
  white: 'white',
  nomadBlack: '#112211',
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width: number | 'full';
  height: number;
  fontSize: number;
  textBold?: boolean;
  btnColor: 'green' | 'white' | 'gray' | 'nomadBlack';
  textColor: 'green' | 'white' | 'gray' | 'nomadBlack';
  border?: boolean;
  borderColor?: 'green' | 'white' | 'gray' | 'nomadBlack';
  rounded?: number;
  hover?: boolean;
  children: React.ReactNode;
}
/**
 * @param {boolean} border - 테두리 유무, 기본값 false
 * @param {green' | 'white' | 'gray} borderColor - 테두리 색상, 기본값 green
 * @param {number} rounded - 테두리 굴곡 정도, 기본값 8px
 * @param {boolean} hover - 호버 효과 (버튼 크기 작아지고 글씨 크기 커짐)
 */
const Button = ({
  width,
  height,
  fontSize,
  textBold = false,
  btnColor,
  textColor,
  border = false,
  borderColor = 'green',
  rounded = 8,
  hover = false,
  children,
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
    setHovered(false);
  };

  return (
    <>
      <button
        {...rest}
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        style={{
          width:
            width === 'full' ? '100%' : pxToRem(hovered ? width * 0.8 : width),
          height: pxToRem(hovered ? height * 0.8 : height),
          fontSize: pxToRem(hovered ? fontSize * 1.2 : fontSize),
          fontWeight: textBold ? 700 : 400,
          backgroundColor: ColorValue[btnColor],
          color: ColorValue[textColor],
          marginTop: pxToRem(hovered ? height * 0.1 : 0),
          marginRight:
            width === 'full' ? 0 : pxToRem(hovered ? width * 0.1 : 0),
          marginBottom: pxToRem(hovered ? height * 0.1 : 0),
          marginLeft: width === 'full' ? 0 : pxToRem(hovered ? width * 0.1 : 0),
          borderRadius: `${rounded}px`,
          border: border ? `solid 1px ${ColorValue[borderColor]}` : 'none',
          cursor: hovered ? 'pointer' : 'default',
        }}
        className="cursor-pointer flex items-center justify-center duration-500"
      >
        {children}
      </button>
    </>
  );
};

export default Button;
