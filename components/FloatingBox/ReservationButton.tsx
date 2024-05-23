import React from 'react';

const ReservationButton = ({
  value,
  handleReservation,
}: {
  value: number | null;
  handleReservation: () => void;
}) => (
  <button
    className={`px-4 py-[1.4rem] bg-nomad-black w-full text-white text-body1-bold my-7 rounded ${
      !value ? 'opacity-50 cursor-not-allowed' : ''
    }`}
    type="submit"
    disabled={!value}
    onClick={handleReservation}
  >
    예약하기
  </button>
);

export default ReservationButton;
