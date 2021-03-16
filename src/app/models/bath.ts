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

export enum EBathSortField {
  Price = 'price',
  Rating = 'rating',
}

export enum EBathSortType {
  Asc = 'asc',
  Desc = 'desc',
}

/**
 * @interface IBathParams
 * @param {string} searc_query {string}
 * @param {EBathSortField} sort_field {EBathSortField}
 * @param {EBathSortType} sort_type {EBathSortType}
 * @param {number} rating {number}
 */
export interface IBathParams {
  search_query: string;
  sort_field: EBathSortField;
  sort_type: EBathSortType;
  rating: number;
  price_from: number;
  price_to: number;
  types: number[];
  steam_rooms_ids: number[];
  services_ids: number[];
  zones_ids: number[];
  page: number;
}

export type TPartBathParams = Partial<IBathParams>;

export const defaultBathParams: TPartBathParams = {
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
  bathParams: TPartBathParams;
  moreBathes: boolean;
  lastPage: number;
}
