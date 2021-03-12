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

export interface IBathParams {
  search_query: string;
  sort_field: 'price' | 'rating';
  sort_type: 'asc' | 'desc';
  rating: number;
  price_from: number;
  price_to: number;
  types: number[];
  steam_rooms_ids: number[];
  services_ids: number[];
  zones_ids: number[];
  page: number;
}

export type TPartBathParameter = Partial<IBathParams>;

export const defaultBathParameter: TPartBathParameter = {
  page: 0,
};

/**
 * @interface IBathAction
 * @param {TPartBathParameter} bathParams
 * @param {boolean} moreBathes
 * @param {number} lastPage
 */
export interface IBathAction {
  // bathes: IBath[];
  bathParams: TPartBathParameter;
  moreBathes: boolean;
  lastPage: number;
}
