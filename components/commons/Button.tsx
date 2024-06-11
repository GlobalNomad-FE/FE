'use client';
import React from 'react';

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
 * @param {boolean} hover - 삭제했으나 쓰이는곳이 있어서 프롭스로 받게만 놔둠, 아무효과 없음
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
  hover,
  children,
  ...rest
}: ButtonProps) => {
  const pxToRem = (value: number) => {
    return value / 16 + 'rem';
  };

  return (
    <>
      <button
        {...rest}
        style={{
          width: width === 'full' ? '100%' : pxToRem(width),
          height: pxToRem(height),
          fontSize: pxToRem(fontSize),
          fontWeight: textBold ? 700 : 400,
          backgroundColor: ColorValue[btnColor],
          color: ColorValue[textColor],
          borderRadius: `${rounded}px`,
          border: border ? `solid 1px ${ColorValue[borderColor]}` : 'none',
        }}
        className="flex items-center justify-center duration-500"
      >
        {children}
      </button>
    </>
  );
};

export default Button;
