export interface IProfile {
  displayName: string;
  username: string;
  firstname: string;
  secondname: string;
  sername: string;
  image: string;
  photos: IPhoto[];
}

export interface IPhoto {
  id: string;
  url: string;
  isMain: boolean;
}