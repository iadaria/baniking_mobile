export interface IProfile {
  email: string;
  name: string | null;
  surname: string | null;
  middle_name: string | null;
  phone: string;
  birth_date: Date | null;
  avatar: string;
  full_name: string | null;
}

export interface IPhoto {
  id: string;
  url: string;
  isMain: boolean;
}
