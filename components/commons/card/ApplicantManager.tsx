import { useState } from 'react';

interface BookerInformation {
  nickname: string;
  headCount: number;
  status: string;
  activityId: number;
  reservationId: number;
}

/**
 * 예약 승인여부 확인, 예약 확정 및 거절을 할 수 있는 카드
 * @param nickname 닉네임
 * @param headCount 인원
 * @param status pending(보류), confirmed(확정), declined(거절)
 * @param activityId 체험Id
 * @param reservationId 예약Id
 */
const ApplicantManager = ({
  nickname,
  headCount,
  status,
  activityId,
  reservationId,
}: BookerInformation) => {
  const [reservationStatus, SetReservationStatus] = useState(status);

  const handleReservationStatusChange = (status: string) => {
    SetReservationStatus(status);
    //TODO : api연동 필요. patch
    // /4-13/my-activities/{activityId}/reservations/{reservationId}
  };

  return (
    <div className="w-[381px] h-[116px] rad rounded-md border border-gray200 p-4 gap-2">
      <div className="gap-2.5 flex flex-row">
        <p className="text-gray500">닉네임</p>
        <p>{nickname}</p>
      </div>
      <div className="gap-2.5 flex flex-row">
        <p className="text-gray500">인원</p>
        <p>{headCount}명</p>
      </div>
      <div className="w-[350px] flex justify-end gap-2">
        {reservationStatus === 'pending' ? (
          <>
            <button
              className="w-[82px] h-[38px] bg-black200 rounded-md px-3 py-2 text-white text-sm font-bold"
              onClick={() => handleReservationStatusChange('confirmed')}
            >
              확정하기
            </button>
            <button
              className="w-[82px] h-[38px] bg-white border rounded-md px-3 py-2 text-black text-sm font-bold"
              onClick={() => handleReservationStatusChange('declined')}
            >
              거절하기
            </button>
          </>
        ) : reservationStatus === 'confirmed' ? (
          <button className="w-[82px] h-[38px] bg-[#FFF4E8] rounded-[26.5px] px-3 py-2 text-[#FF7C1D] text-sm font-bold cursor-default">
            예약확정
          </button>
        ) : (
          <button className="w-[82px] h-[38px] bg-[#FFE4E0] rounded-[26.5px] px-3 py-2 text-[#FF472E] text-sm font-bold cursor-default">
            예약거절
          </button>
        )}
      </div>
    </div>
  );
};

export default ApplicantManager;
