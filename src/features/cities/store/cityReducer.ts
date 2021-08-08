import { City } from '~/src/app/models/city';
import { IErrors } from '~/src/app/utils/error';
import * as constants from './cityConstants';

const defaultCity: City = {
  id: 0,
  name: 'Москва',
};

export interface ICityState {
  loading: boolean;
  errors: IErrors | null;

  count: number;
  cities: City[];
  // select
  selectedCityId: number;
  selectedCity: City;
}

const initState: ICityState = {
  loading: false,
  errors: null,

  count: 0,
  cities: [],
  // select
  selectedCityId: 0,
  selectedCity: defaultCity,
};

export default function cityReducer(
  state = initState,
  { type, payload }: any = { type: '', paylaod: undefined },
): ICityState {
  switch (type) {
    case constants.FETCH_CITIES:
      return {
        ...state,
        loading: true,
      };

    case constants.SET_CITIES:
      return {
        ...state,
        count: payload.length,
        loading: false,
        cities: payload,
      };

    case constants.CITIES_FAIL:
      return {
        ...state,
        loading: false,
        errors: payload,
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
