import React from 'react';
import { formatWage } from '@/utils/wageFormatter';

const Price = ({ price }: { price: number }) => (
  <div className="flex flex-row items-center gap-5">
    <p className="text-h1 text-black200">{formatWage(price)}</p>
    <p className="text-h3-regular text-gray600">/ 인</p>
  </div>
);

export default Price;
