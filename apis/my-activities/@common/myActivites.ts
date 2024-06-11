import instance from '@/apis/axios';
import { API } from '@/utils/constants/API';
import { ActivitiesData } from '@/app/activities/register/page';

type Status = {
  status: 'pedding' | 'confirmed' | 'declined';
};

/**
 * 내 체험 리스트 조회
 * @param cursorId
 * @param size Default value : 20
 */
export const getMyActivites = (cursorId: number, size: number) => {
  return instance.get(API.MYACTIVITIE, {
    params: {
      cursorId: cursorId,
      size: size,
    },
  });
};

/**
 * 내 체험 월별 예약 현황 조회
 * @param activityId
 * @param year
 * @param month
 */
export const getReservationDashBoard = (
  activityId: number,
  year: string,
  month: string,
) => {
  return instance.get(
    `${API.MYACTIVITIE}/${activityId}/reservation-dashboard`,
    {
      params: {
        year: year,
        month: month,
      },
    },
  );
};

/**
 * 내 체험 날짜별 예약정보(신청,승인,거절) 있는 스케줄 조회
 * @param activityId
 * @param date: string
 */
export const getReservationSchedule = (activityId: number, date: string) => {
  return instance.get(`${API.MYACTIVITIE}/${activityId}/reserved-schedule`, {
    params: {
      date: date,
    },
  });
};

/**
 * 내 체험 예약 시간대별 예약 내역 조회
 * @param activityId
 * @param cursorId
 * @param size Default value : 10
 * @param scheduleId
 * @param status declined, pending, confirmed 중 하나
 */
export const getReservations = (
  activityId: number,
  cursorId: number,
  size: number,
  scheduleId: number,
  status: Status,
) => {
  return (
    instance.get(`${API.MYACTIVITIE}/${activityId}/reservations`),
    {
      params: {
        cursorId: cursorId,
        size: size,
        scheduleId: scheduleId,
        status: status,
      },
    }
  );
};

/**
 * 내 체험 예약 상태 업데이트
 * @param activityId
 * @param reservationId
 * @param data status(예약상태) : pending, confirmed, declined 중 하나
 */
export const patchReservations = (
  activityId: number,
  reservationId: number,
  data: Status,
) => {
  return instance.patch(
    `${API.MYACTIVITIE}/${activityId}/reservations/${{ reservationId }}`,
    data,
  );
};
/**
 * 내 체험 삭제
 * @param activityId
 */
export const deleteActivities = (activityId: number) => {
  return instance.delete(`${API.MYACTIVITIE}/${activityId}`);
};

/**
 * 내 체험 수정
 * @param activityId
 * @param data 체험등록 폼 데이터
 */
export const patchActivities = (activityId: number, data: ActivitiesData) => {
  return instance.patch(`${API.MYACTIVITIE}/${activityId}`, data);
};
