import React, { useState } from 'react';

const ColorValue: { [key: string]: string } = {
  green: '#112211',
  gray: '#a4a1aa',
  white: 'white',
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width: number;
  height: number;
  fontSize: number;
  textBold?: boolean;
  btnColor: 'green' | 'white' | 'gray';
  textColor: 'green' | 'white' | 'gray';
  border?: boolean;
  borderColor?: 'green' | 'white' | 'gray';
  rounded?: number;
  hover?: boolean;
  clicked?: boolean;
  children: React.ReactNode;
}
/**
 * @param {boolean} border - 테두리 유무, 기본값 false
 * @param {green' | 'white' | 'gray} borderColor - 테두리 색상, 기본값 green
 * @param {number} rounded - 테두리 굴곡 정도, 기본값 8px
 * @param {boolean} hover - 호버 효과 (버튼 크기 작아지고 글씨 크기 커짐)
 * @param {boolean} clicked - 클릭된 버튼 효과 (페이지네이션용)
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
  clicked = false,
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
          width: pxToRem(hovered || clicked ? width * 0.8 : width),
          height: pxToRem(hovered || clicked ? height * 0.8 : height),
          fontSize: pxToRem(hovered || clicked ? fontSize * 1.2 : fontSize),
          fontWeight: textBold ? 700 : 400,
          backgroundColor: ColorValue[btnColor],
          color: ColorValue[textColor],
          marginTop: pxToRem(hovered || clicked ? height * 0.1 : 0),
          marginRight: pxToRem(hovered || clicked ? width * 0.1 : 0),
          marginBottom: pxToRem(hovered || clicked ? height * 0.1 : 0),
          marginLeft: pxToRem(hovered || clicked ? width * 0.1 : 0),
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
