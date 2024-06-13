interface SubImageDataType {
  id: number;
  imageUrl: string;
}

interface ScheduleDataType {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface ActivitiesDataType {
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
  subImages: SubImageDataType[];
  schedules: ScheduleDataType[];
}
