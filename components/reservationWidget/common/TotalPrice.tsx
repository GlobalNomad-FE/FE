import React from 'react';
import { formatWage } from '@/utils/wageFormatter';

const TotalPrice = ({ total }: { total: number }) => (
  <div className="border-t border-t-gray200 pt-4 text-h3-bold flex justify-between text-nomad-black">
    <p>총 합계</p>
    <div>{formatWage(total)}</div>
  </div>
);

export default TotalPrice;
