/**
 * 예약 상태별 카운팅
 */
export interface ReservationStatusCountType {
  completed: number;
  confirmed: number;
  pending: number;
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
