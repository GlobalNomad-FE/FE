import Button from '@/components/commons/Button';
import { ReservationInfoType } from '@/types/activitiesReservationType';

interface Props {
  selectTab: string;
  reservationInfo: ReservationInfoType;
}

/**
 * 모달 내에서 예약 내역을 보여주는 컴포넌트
 * @param selectTab 선택한 상태 탭 이름
 */
const ReservationInfo = ({ selectTab, reservationInfo }: Props) => {
  const { nickname, headCount, activityId, id } = reservationInfo;

  //TODO : 내 체험 예약 상태 업데이트 /{teamId}/my-activities/{activityId}/reservations/{reservationId}
  // activityId = reservationInfo.activityId
  //reservationId= reservationInfo.id
  return (
    <div className="p-4 border border-gray200 rounded mt-4">
      <div className="text-[16px]">
        <div className="flex gap-[10px]">
          <p className="text-gray500 font-semibold">닉네임</p>{' '}
          <p className="text-black200 font-medium">{nickname}</p>
        </div>
        <div className="flex gap-[10px]">
          <p className="text-gray500 font-semibold">인원</p>{' '}
          <p className="text-black200 font-medium">{headCount}명</p>
        </div>
      </div>
      <div className="flex justify-end text-[16px] gap-4">
        {selectTab === 'pending' ? (
          <>
            <Button
              width={82}
              height={38}
              fontSize={14}
              btnColor="nomadBlack"
              textColor="white"
              textBold={true}
            >
              승인하기
            </Button>
            <Button
              width={82}
              height={38}
              fontSize={14}
              btnColor="white"
              textColor="nomadBlack"
              textBold={true}
              border={true}
            >
              거절하기
            </Button>
          </>
        ) : selectTab === 'confirmed' ? (
          <p className="w-[85px] h-[38px] bg-[#FFF4E8] text-[#FF7C1D] flex items-center justify-center rounded-3xl">
            예약승인
          </p>
        ) : (
          <p className="w-[85px] h-[38px] bg-[#FFE4E0] text-[#FF472E] flex items-center justify-center rounded-3xl">
            예약거절
          </p>
        )}
      </div>
    </div>
  );
};

export default ReservationInfo;
