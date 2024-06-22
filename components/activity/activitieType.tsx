export interface Props {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageUrls: SubImageUrl[];
}

interface SubImageUrl {
  id: number;
  imageUrl: string;
}
