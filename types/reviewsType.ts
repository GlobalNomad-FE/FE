export interface ReviewsDataType {
  averageRating: number;
  totalCount: number;
  reviews: ReviewsType[];
}

export interface ReviewsType {
  id: number;
  user: ReviewUserType;
  activityId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}
export interface ReviewUserType {
  profileImageUrl: string;
  nickname: string;
  id: number;
}
