import React, { useState } from 'react';
import Image from 'next/image';

const Rating = () => {
  const [rating, setRating] = useState([
    { id: 1, empty: true },
    { id: 2, empty: true },
    { id: 3, empty: true },
    { id: 4, empty: true },
    { id: 5, empty: true },
  ]);

  const handleRating = (clicked: number) => {
    const newRating = rating.map((item) => ({
      ...item,
      empty: item.id <= clicked ? false : true,
    }));
    setRating(newRating);
  };

  return (
    <div className="flex justify-center gap-[8px] p-[12px]">
      {rating.map(({ id, empty }) => (
        <Image
          key={id}
          src={empty ? '/icons/empty-star.svg' : '/icons/star.svg'}
          alt={empty ? '빈 별' : '노란 별'}
          width={56}
          height={56}
          onClick={() => handleRating(id)}
          className="cursor-pointer"
        />
      ))}
    </div>
  );
};

export default Rating;
