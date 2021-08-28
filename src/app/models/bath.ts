import { BathType } from './filter';

export type Bath = {
  id: number;
  name: string;
  type: BathType;
  short_description: string;
  rating: number;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  image: string;
  cachedImage?: string | null;
  //price: number | null; // need del
  //placeId?: string; // need del
};

export interface IBathDetailed extends Bath {
  bathers: IBather[];
  city_name: string;
  description: string | null;
  features: string | null;
  has_hotel: boolean;
  has_laundry: boolean;
  has_parking: boolean;
  history: string | null;
  hotel_address: string | null;
  laundry_address: string | null;
  parking_address: string | null;
  photos: string[];
  price: number | null;
  propositions: IProposition[] | null;
  schedule: ISchedule;
  service: string | null;
  services: string[];
  steam_room: string | null;
  steam_rooms: string[];
  traditions: string | null;
  views: number;
  zones: string[];
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
