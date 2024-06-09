import instance from '@/apis/axios';
import { API } from '@/utils/constants/API';

export interface ActivitiesProps {
  title: string;
  category: '문화 · 예술' | '식음료' | '스포츠' | '투어' | '관광' | '웰빙';
  description: string;
  address: string;
  price: number;
  schedules: Schedule[];
  bannerImageUrl: string;
  subImageUrls: string[];
}

export interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

interface ReservationData {
  scheduleId: number;
  headCount: number;
}

/**
 * 체험 등록
 * @param data 체험 등록 폼 데이터
 */
export const postActivities = (data: ActivitiesProps) => {
  return instance.post(API.ACTIVITIE, data);
};

/**
 * 체험 상세 조회
 * @param activityId
 */
export const getActivities = (activityId: number) => {
  return instance.get(`${API.ACTIVITIE}/${activityId}`);
};

/**
 * 체험 예약 가능일 조회
 * @param activityId
 * @param year
 * @param month
 */
export const getActivitiesSchedule = (
  activityId: number,
  year: number,
  month: number,
) => {
  return instance.get(`${API.ACTIVITIE}/${activityId}/available-schedule`, {
    params: {
      year: year,
      month: month,
    },
  });
};

/**
 * 체험 리뷰 조회
 * @param activityId
 * @param page Default value : 1
 * @param size Default value : 3
 * @returns
 */
export const getActivitiesReviews = (
  activityId: number,
  page: number,
  size: number,
) => {
  return instance.get(`${API.ACTIVITIE}/${activityId}/reviews`, {
    params: {
      page: page,
      size: size,
    },
  });
};

/**
 * 체험 예약 신청
 * @param activityId
 * @param data  scheduleId: number, headCount: number;
 */
export const postActivitiesReservation = (
  activityId: number,
  data: ReservationData,
) => {
  return instance.post(`${API.ACTIVITIE}/${activityId}`, data);
};

/**
 * 체험 이미지 url 생성
 * @param data 등록이미지 파일
 */
export const postActivitiesImage = (data: string) => {
  return instance.post(`${API.ACTIVITIE}/image`, data);
};
