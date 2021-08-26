export interface IBathBaseParams {
  search_query: string;
  sort_field: BathSortField;
  sort_type: BathSortType;
  // location
  latitude: number;
  longitude: number;
  city_id: number;
  // extra
  rating_from: Rating;
  rating_to: Rating;
  price_from: number;
  price_to: number;
  types: BathType[];
  steam_rooms_ids: number[];
  services_ids: number[];
  zones_ids: number[];
}

export interface IBathMainParams {
  search_query: string;
  sort_field: BathSortField;
  sort_type: BathSortType;
  city_id: number;
  latitude: number | null;
  longitude: number | null;
}

export interface IBathGeoParams {
  latitude: number;
  longitude: number;
}

export interface IBathExtraParams {
  rating_from: Rating;
  rating_to: Rating;
  price_from: number;
  price_to: number;
  types: BathType[];
  steam_rooms_ids: number[];
  services_ids: number[];
  zones_ids: number[];
}

export type FieldMain = keyof IBathMainParams;

export type BathMainParams = {
  prop: 'params' | 'extraParams' | 'geoParams';
  params: Partial<IBathMainParams> | Partial<IBathExtraParams>;
  isDelete?: boolean;
};

//export type BathBaseParams = { page: number } & Partial<IBathBaseParams>;

//export type BathExtraParams = { page: number } & Partial<IBathExtraParams>;
//export type BathLocationParams = { page: number } & Partial<IBathCityParams>;

//export type BathParams = BathMainParams;

/* export type BathParam = BathMainParam | BathExtraParam | BathLocatonParam;

export type BathMainParam = {
  field: keyof IBathMainParams;
  value: string | number | number[] | undefined;
};

export type BathExtraParam = {
  field: keyof IBathExtraParams;
  value: string | number | number[] | undefined;
};
export type BathLocatonParam = {
  field: keyof IBathGeoParams;
  value: string | number | number[] | undefined;
};
 */
// Raring

export type Rating = 0 | 1 | 2 | 3 | 4 | 5;

// Sort

export enum BathSortField {
  Price = 'price',
  Rating = 'rating',
}

export enum BathSortType {
  Asc = 'asc',
  Desc = 'desc',
}

export enum BathSort {
  PriceAsc,
  PriceDesc,
  RatingDesc,
  None,
}

export enum BathType {
  Economy = 'Economy',
  Comfort = 'Comfort',
  Lux = 'Lux',
  Premium = 'Premium',
}

export interface BathSortParams {
  sort_field?: BathSortField;
  sort_type?: BathSortType;
}

export const bathSortParams: BathSortParams[] = [
  { sort_field: BathSortField.Price, sort_type: BathSortType.Asc },
  { sort_field: BathSortField.Price, sort_type: BathSortType.Desc },
  { sort_field: BathSortField.Rating, sort_type: BathSortType.Desc },
  { sort_field: undefined, sort_type: undefined },
];
