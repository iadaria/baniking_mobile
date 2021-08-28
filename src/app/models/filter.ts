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

export interface IBathExtraParams {
  //rating_from: Rating;
  //rating_to: Rating;
  price_from: number;
  price_to: number;
  types: BathType[];
  steam_rooms_ids: number[];
  services_ids: number[];
  zones_ids: number[];
}

export type BathBaseParams = Partial<IBathBaseParams> & { page: number };

export type FieldMain = keyof IBathMainParams | keyof IBathExtraParams;

export type BathMainParams = {
  prop: 'params' | 'extraParams';
  params: Partial<IBathMainParams> | Partial<IBathExtraParams>;
  isDelete?: boolean;
};

// Raring

export type Rating = 0 | 1 | 2 | 3 | 4 | 5;

// Sort

export const countingParams = [
  'types',
  'steam_rooms_ids',
  'services_ids',
  'zones_ids',
];

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

export type TouchParams = {
  types: BathType[];
  zones: string[];
  services: string[];
  steamRooms: string[];
};

export const EXTRA_KEYS = [
  'search_query',
  //'rating_from',
  //'rating_to',
  'price_from',
  'price_to',
  'types',
  'steam_rooms_ids',
  'services_ids',
  'zones_ids',
];

export const bathType = new Map([
  ['Economy', 'Эконом'],
  ['Comfort', 'Комфорт'],
  ['Lux', 'Люкс'],
  ['Premium', 'Премиум'],
]);

export const bathZones = [
  'Душ',
  'Купель',
  'Баня',
  'Русская на дровах',
  'Инфакрасная',
  'Финская на дровах',
  'Арктическая сауна',
];
export const bathServices = [
  'Бассейн с видом',
  'Терраса',
  'Патио',
  'Кофемашина',
];
export const bathSteamRooms = [
  'Финская сауна',
  'Японская баня',
  'Турецкая парная',
];
