export interface IBath {
  id: number;
  name: string;
  short_description: string;
  rating: number;
  address: string;
  latitude: number;
  longitude: number;
  image: string;
  cachedImage?: string | null;
  price: number | null;
}
