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

export enum EBathSort {
  None,
  PriceAsc,
  PriceDesc,
  RatingDesc,
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

export const FILTER_KEYS = [
  'search_query',
  'rating',
  'price_from',
  'price_to',
  'types',
  'steam_rooms_ids',
  'services_ids',
  'zones_ids',
];

export const defaultBathSort: TPartBathParams = {
  sort_field: undefined,
  sort_type: undefined,
  page: 0,
};

/**
 * @interface IBathAction
 * @param {TPartBathParameter} bathParams
 * @param {boolean} moreBathes
 */
export interface IBathAction {
  bathParams: TPartBathParams;
  moreBathes: boolean;
}
