export type Bath = {
  id: number;
  name: string;
  type: EBathType;
  short_description: string;
  rating: number;
  address: string;
  latitude: number;
  longitude: number;
  image: string;
  cachedImage?: string | null;
  //price: number | null; // need del
  //placeId?: string; // need del
};

export type Rating = 0 | 1 | 2 | 3 | 4 | 5;

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
  page: number;
  search_query: string;
  sort_field: EBathSortField;
  sort_type: EBathSortType;
  rating_from: Rating;
  rating_to: Rating;
  price_from: number;
  price_to: number;
  //types: number[];
  types: EBathType[];
  steam_rooms_ids: number[];
  services_ids: number[];
  zones_ids: number[];
  latitude: number;
  longitude: number;
  city_id: number;
}

export type BathParams = Partial<IBathParams>;

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

export const defaultBathSort: BathParams = {
  sort_field: undefined,
  sort_type: undefined,
  page: 0,
};

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

export enum BathType {
  Economy,
  Comfort,
  Lux,
  Premium,
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

export interface IBathDetailed extends Bath {
  type: string;
  views: number;
  city_name: string;
  has_laundry: boolean;
  laundry_address: string | null;
  has_parking: boolean;
  parking_address: string | null;
  has_hotel: boolean;
  hotel_address: string | null;
  description: string | null;
  history: string | null;
  features: string | null;
  service: string | null;
  traditions: string | null;
  steam_room: string | null;
  schedule: ISchedule;
  zones: string[];
  services: string[];
  steam_rooms: string[];
  propositions: IProposition[] | null;
  photos: string[];
  bathers: IBather[];
}

export interface ISchedule {
  is_round_the_clock: boolean;
  on_mo: boolean;
  mo_hours_from: string | null;
  mo_hours_to: string | null;
  on_tu: boolean;
  tu_hours_from: string | null;
  tu_hours_to: string | null;
  on_we: boolean;
  we_hours_from: string | null;
  we_hours_to: string | null;
  on_th: boolean;
  th_hours_from: string | null;
  th_hours_to: string | null;
  on_fr: boolean;
  fr_hours_from: string | null;
  fr_hours_to: string | null;
  on_sa: boolean;
  sa_hours_from: string | null;
  sa_hours_to: string | null;
  on_su: boolean;
  su_hours_from: string | null;
  su_hours_to: string | null;
}

export interface IBather {
  name: string;
  position: string;
  avatar: string | null;
}

export interface IProposition {
  description: string | null;
  discount: string | null;
}

export interface IOrderCall {
  name: string;
  phone: string;
}

export interface IOrderCallParams {
  bathId: number;
  name: string;
  phone: string;
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
  geocoded_waypoints: [
    { geocoder_status: string },
    { geocoder_status: string },
  ];
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
