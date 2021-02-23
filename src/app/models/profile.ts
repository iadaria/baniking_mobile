import { ISocialAccount } from './user';

export enum Role {
  User,
  Mananger,
}

export enum Sex {
  Male,
  Female,
}

export interface IProfile {
  email: string;
  name: string | null;
  surname: string | null;
  middle_name: string | null;
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

export interface IPhoto {
  id: string;
  url: string;
  isMain: boolean;
}

export enum Level {
  Praetor = 'Претор',
  Magister = 'Магистр',
  Consul = 'Консул',
  Emperor = 'Император',
}

export interface ILevel {
  name: string;
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
  levels: ILevel[];
}
