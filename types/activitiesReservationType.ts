/**
 * 예약 상태별 카운팅 - 캘린더 내 날짜별 상태
 */
export interface ReservationStatusCountType {
  completed: number;
  confirmed: number;
  pending: number;
}
/**
 * 예약 상태별 카운팅 - 캘린더 내 날짜별 상태
 */
export interface ModalReservationStatusCountType {
  confirmed: number;
  pending: number;
  declined: number;
}

/**
 * 예약현황 일별 상태정보
 */
export interface ReservationDayInfoType {
  date: string;
  reservations: ReservationStatusCountType;
}

/**
 * 예약현황 월간 상태정보 리스트
 */
export interface ReservationMonthInfosType {
  MonthReservations: ReservationDayInfoType[];
}

/**
 * 내 체험 날짜별 예약정보(신청, 승인, 거절)이 있는 스케쥴
 */
export interface ReservationScheduleType {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: ModalReservationStatusCountType;
}

/**
 * 내 체험 예약 시간대 별 예약 내역 조회
 */
export interface ReservationInfoType {
  id: number;
  status: string;
  totalPrice: number;
  headCount: number;
  nickname: string;
  userId: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  activityId: number;
  scheduleId: number;
  reviewSubmitted: boolean;
  teamId: string;
}

/**
 * 내 체험 예약 시간대 별 예약 내역 리스트 조회
 */
export interface ReservationInfosType {
  reservations: ReservationInfoType[];
  totalCount: number;
  cursorId: number;
}
