/**
 * 체험 정보
 */
export interface Activity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * 내 체험 리스트
 */
export interface MyActivityType {
  activities: Activity[];
}
