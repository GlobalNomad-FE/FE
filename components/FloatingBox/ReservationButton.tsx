import React from 'react';

const ReservationButton = ({
  value,
  handleButtonClick,
  text,
}: {
  value: boolean;
  handleButtonClick: () => void;
  text: string;
}) => (
  <button
    className={`px-4 py-[1.4rem] bg-nomad-black w-full text-white text-body1-bold my-7 rounded ${
      !value ? 'opacity-50 cursor-not-allowed' : ''
    }`}
    type="submit"
    disabled={!value}
    onClick={handleButtonClick}
  >
    {text}
  </button>
);

export default ReservationButton;
