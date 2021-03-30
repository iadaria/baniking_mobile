export interface IBath {
  id: number;
  name: string;
  short_description: string;
  rating: number;
  address: string;
  latitude: number;
  longitude: number;
  placeId?: string;
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

// Google
export interface IGooglePlaceParams {
  key: string;
  input: string;
  inputtype: string;
  fields: string;
  locationbieas: string;
}

export interface IGooglePlaceResponse {
  candidates: [
    {
      name: string;
      place_id: string;
    },
  ];
  status: string;
}

export interface IDirectionsParams {
  origin: string;
  destination: string;
  key: string;
}

export type TPartDirectionsParams = Partial<IDirectionsParams>;

export interface IDirectionsResponse {
  geocoded_waypoints: [{ geocoder_status: string }, { geocoder_status: string }];
  routes: [
    {
      legs: [
        {
          distance: {
            test: string;
            value: number;
          };
        },
      ];
      overview_polyline: {
        points: string;
      };
    },
  ];
}

export interface IDistanceParams {
  units: string;
  origins: string;
  destinations: string;
  key: string;
}

export type TPartDistanceParams = Partial<IDirectionsParams>;

export interface IDistanceResponse {
  rows: [
    {
      elements: [
        {
          distance: { value: number };
          status: string;
        },
      ];
    },
  ];
  status: string;
}

export interface IMap {
  bathId: number;
  distance: number;
  lastUpdateDistance: Date;
  points?: string;
  lastUpdatePoints?: Date;
}

// Filters
export interface IBathParamsResponse {
  types: EBathType[];
  zones: object;
  services: object;
  steamRooms: object;
}

export interface IBathParamsVariety {
  types: EBathType[];
  zones: Map<string, string>;
  services: Map<string, string>;
  steamRooms: Map<string, string>;
}

export enum EBathType {
  Economy = 'Economy',
  Comfort = 'Comfort',
  Lux = 'Lux',
  Premium = 'Premium',
}

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
export const bathServices = ['Бассейн с видом', 'Терраса', 'Патио', 'Кофемашина'];
export const bathSteamRooms = ['Финская сауна', 'Японская баня', 'Турецкая парная'];
