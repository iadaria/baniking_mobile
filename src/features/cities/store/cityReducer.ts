import { City } from '~/src/app/models/city';
import { IErrors } from '~/src/app/utils/error';
import * as constants from './cityConstants';

export interface ICityState {
  loading: boolean;
  errors: IErrors | null;

  cities: City[];
  selectedCityId: number | null;
  selectedCity: City | null;
}

const initState: ICityState = {
  loading: false,
  errors: null,

  cities: [],
  /* selectedCityId: 0,
  selectedCity: {
    id: 0,
    name: 'Москва',
  }, */
  selectedCityId: null,
  selectedCity: null,
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
      const selectedCity = { ...state.cities[payload] };
      return {
        ...state,
        selectedCityId: payload,
        selectedCity,
      };

    case constants.UNSELECT_CITY:
      return {
        ...state,
        selectedCityId: 0,
      };

    default:
      return state;
  }
}
