import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReservationInfoType } from '@/types/activitiesReservationType';
import useUpdateReservationRequest from '@/apis/my-activity-reservation-status/usePatchReservationRequest';
import Button from '@/components/commons/Button';
import BasePopup from '@/components/commons/Popups/BasePopup';

interface Props {
  selectTab: string;
  reservationInfo: ReservationInfoType;
}

/**
 * 모달 내에서 예약 내역을 보여주는 컴포넌트
 * @param selectTab 선택한 상태 탭 이름
 */
const ReservationInfo = ({ selectTab, reservationInfo }: Props) => {
  const {
    nickname,
    headCount,
    activityId,
    id: reservationId,
  } = reservationInfo;
  const queryClient = useQueryClient();
  const { mutate } = useUpdateReservationRequest();
  const [openPopup, setOpenPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isUpdate, setIsUpdate] = useState(false); //업데이트 여부

  //내 체험 예약 상태 업데이트
  const handleResultUpdate = (status: string) => {
    mutate(
      {
        activityId: activityId,
        reservationId: reservationId,
        status: status,
      },
      {
        onSuccess: () => {
          status === 'confirmed'
            ? setPopupMessage('승인되었습니다.')
            : setPopupMessage('거절되었습니다.');
          setOpenPopup(true);
          setIsUpdate(true);
          queryClient.invalidateQueries();
        },
        onError: (error: any) => {
          setIsUpdate(false);
          if (error.response.status === 401) {
            setPopupMessage('로그인 후 이용 해주세요.');
            setOpenPopup(true);
            return;
          }
          if (error.response.data.message) {
            setPopupMessage(error.response.data.message);
            setOpenPopup(true);
            return;
          }
          setPopupMessage(
            '알 수 없는 에러가 발생하였습니다. 다시 시도해주세요.',
          );
          setOpenPopup(true);
        },
      },
    );
  };
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

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
              onClick={() => handleResultUpdate('confirmed')}
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
              onClick={() => handleResultUpdate('declined')}
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
      <BasePopup
        isOpen={openPopup}
        closePopup={handleClosePopup}
        clickEvent={
          popupMessage === '승인되었습니다.' ? handleClosePopup : undefined
        }
      >
        {popupMessage}
      </BasePopup>
    </div>
  );
};

export default ReservationInfo;
