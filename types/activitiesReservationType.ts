/**
 * 예약 상태별 카운트
 */
export interface ReservationStatusCountType {
  completed: number;
  confirmed: number;
  pending: number;
}

/**
 * 예약 상태 일별 정보
 */
export interface ReservationDayInfoType {
  date: Date;
  reservations: ReservationStatusCountType;
}
