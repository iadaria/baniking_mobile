import { ISocialAccount } from './user';

export enum Role {
  User,
  Mananger,
}

export enum Sex {
  Male,
  Female,
}

export interface IQr {
  qr: string;
  qrValue: string | null;
  cardNumber: string;
}

export interface IProfile {
  email: string;
  name: string | null;
  surname: string | null;
  middle_name?: string | null;
  phone: string;
  birth_date: string | null;
  avatar: string;
  full_name: string | null;
  sex: number;
  role: Role;
  accounts: ISocialAccount[];
  userId: string | null;
  // contact?:
  // contactsAllowed: boolean;
}

/***** Avatar ****/

export type TAcceptTypeAvatar =
  | 'image/png'
  | 'image/jpeg'
  | 'image/gif'
  | 'image/jpg';

export interface IUploadAvatar {
  file: string;
  width: number;
  height: number;
  top: number;
  left: number;
  mime: TAcceptTypeAvatar;
  size: number;
}

// Cabinet

export enum Level {
  Praetor = 'Претор',
  Magister = 'Магистр',
  Consul = 'Консул',
  Emperor = 'Император',
}

export const Levels: ILevel[] = [
  {
    name: Level.Praetor,
    discount: 5,
    meetings: 3,
  },
  {
    name: Level.Magister,
    discount: 10,
    meetings: 5,
  },
  {
    name: Level.Consul,
    discount: 25,
    meetings: 10,
  },
  {
    name: Level.Emperor,
    discount: 35,
    meetings: 15,
  },
];

export interface IResponseCabinet {
  user: ICabinet;
  levels: ILevel[];
}

/**
 * @name {string}
 * @discount {number}
 * @meetings {number} - count of meetings
 */
export interface ILevel {
  name: Level;
  discount: number;
  meetings: number;
}

export interface ICabinet {
  id: number;
  full_name: string;
  level: Level;
  points: number;
  meetings_count: number;
  avatar: string;
  // levels: ILevel[];
}
