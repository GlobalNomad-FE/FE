import React from 'react';

const ReservationButton = ({
  value,
  handleButtonClick,
  text,
}: {
  value: boolean;
  handleButtonClick: () => void;
  text: string;
}) => {
  return (
    <button
      className={`px-4 py-[1.4rem] bg-nomad-black w-full mobile:w-[full] mobile:m-0  mobile:py-[1rem] text-white text-body1-bold my-7 rounded-md ${
        !value ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      type="submit"
      disabled={!value}
      onClick={handleButtonClick}
    >
      {text}
    </button>
  );
};

export default ReservationButton;
