import Registerpage from '@/components/activitie/registerPage';

export interface ActivitiesData {
  title: string;
  description: string;
  address: string;
  price: number;
  category: string;
  schedules: any[];
  bannerImageUrl: string;
  subImageUrls: string[];
  scheduleIdsToRemove?: string[];
}
export type KeyActivitiesData = keyof ActivitiesData;

export default function Register() {
  return <Registerpage />;
}
