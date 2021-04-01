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

export interface IBathDetailed extends IBath {
  type: string;
  views: number;
  city_name: string;
  has_laundry: boolean;
  laundry_address: string | null;
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
  zones: Map<string, string>;
  services: Map<string, string>;
  steam_rooms: Map<string, string>;
  propositions: IProposition | null;
  photos: Map<string, string>;
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
  avatar: string;
}

export interface IProposition {
  description: string | null;
  discount: string | null;
}
