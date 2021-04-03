import { View } from 'react-native';

export interface ICachedImage {
  uri: string;
}

export interface IPersistImage {
  id: string;
  path: string;
}

export interface IPersistImages {
  images: IPersistImage[];
  set: string[];
}
