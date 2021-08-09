export type DetectCityParams = {
  latlng: string;
  sensor: boolean;
  key: string;
  language: 'ru';
  result_type: 'locality';
};

export type ILocation = {
  latitude: number;
  longitude: number;
};
