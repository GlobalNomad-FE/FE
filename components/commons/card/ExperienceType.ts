interface ExperienceType {
  id: number;
  title: string;
  totalPrice: number;
  bannerImageUrl: string;
  activityId: number;
}

export interface ActivitiesExperienceType extends ExperienceType {
  rating: number;
  reviewCount: number;
}

export interface ReservationsExperienceType extends ExperienceType {
  date: string;
  startTime: string;
  endTime: string;
  headCount: number;
  experienceStatus: string;
  reviewSubmitted: boolean;
}
