export interface IBath {
  id: number;
  name: string;
  short_description: string;
  rating: number;
  address: string;
  latitude: number;
  longitude: number;
  image: string;
  price: number | null;
}

export interface IBathParams = {
  search_query: string;
  sort_field: 
}