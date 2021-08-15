import * as constants from './mapConstants';
import { City } from '~/src/app/models/city';
import { logline } from '~/src/app/utils/debug';
import { Location } from '~/src/app/models/map';

const defaultCity: City = {
  id: 0,
  name: 'Москва',
};

export interface IMapState {
  loading: boolean;
  error: boolean;
  // city
  citiesCount: number;
  cities: [];
  // detect
  detectedCity: string | null;
  location: Location | null;
  // select
  selectedCityId: number;
  selectedCity: City;
}

const initState: IMapState = {
  loading: false,
  error: false,
  // city
  citiesCount: 0,
  cities: [],
  // detect
  detectedCity: null,

  location: null,
  // select
  selectedCityId: 0,
  selectedCity: defaultCity,
};

export default function mapReducer(
  state = initState,
  { type, payload }: any = { type: '', payload: undefined },
): IMapState {
  switch (type) {
    case constants.MAP_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case constants.MAP_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };

    case constants.SET_GEOLOCATION:
      logline('SET_GEOLOCATION', payload);
      return {
        ...state,
        loading: false,
        error: false,
        location: payload,
      };

    case constants.SET_DETECTED_CITY:
      const detectedCity =
        state.cities.find((city) => city.name === payload) || defaultCity;
      return {
        ...state,
        loading: false,
        error: false,
        // detect
        detectedCity: payload,
        // select auto
        selectedCityId: defaultCity.id,
        selectedCity: detectedCity,
      };

    case constants.SELECT_CITY:
      return {
        ...state,
        selectedCityId: payload,
        selectedCity:
          state.cities.find((city) => city.id === payload) || defaultCity,
      };

    case constants.UNSELECT_CITY:
      return {
        ...state,
        selectedCityId: payload,
        selectedCity: defaultCity,
      };

    default:
      return state;
  }
}
