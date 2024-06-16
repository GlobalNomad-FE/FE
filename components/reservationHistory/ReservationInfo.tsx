interface Props {
  selectTab: string;
}

/**
 * 모달 내에서 예약 내역을 보여주는 컴포넌트
 * @param selectTab 선택한 상태 탭 이름
 */
const ReservationInfo = ({ selectTab }: Props) => {
  return (
    <div className="p-4 border border-gray200 rounded mt-4">
      <div className="text-[16px]">
        <div className="flex gap-[10px]">
          <p className="text-gray500 font-semibold">닉네임</p>{' '}
          <p className="text-black200 font-medium">정만철</p>
        </div>
        <div className="flex gap-[10px]">
          <p className="text-gray500 font-semibold">인원</p>{' '}
          <p className="text-black200 font-medium">12명</p>
        </div>
      </div>
      <div className="flex justify-end text-[16px] gap-4">
        {selectTab === '신청' ? (
          <>
            <button>승인하기</button>
            <button>거절하기</button>
          </>
        ) : selectTab === '승인' ? (
          <button>예약승인</button>
        ) : (
          <button>예약거절</button>
        )}
      </div>
    </div>
  );
};

export default ReservationInfo;
