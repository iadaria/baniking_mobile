export interface IPersistImage {
  id: string;
  path: string;
}

export interface IPersistImages {
  images: IPersistImage[];
  set: string[];
}
