import { City } from '~/src/app/models/city';
import { IErrors } from '~/src/app/utils/error';
import * as constants from './cityConstants';
import { logline } from '~/src/app/utils/debug';

export const COUNT_CITIES = 3;

const defaultCity: City = {
  id: 0,
  name: 'Москва',
};

export interface ICityState {
  loading: boolean;
  errors: IErrors | null;

  count: number;
  cities: City[];
  // for form
  start: number;
  showCities: City[];
  filteredCities: City[];
  // select
  selectedCityId: number;
  selectedCity: City;
}

const initState: ICityState = {
  loading: false,
  errors: null,

  count: 0,
  cities: [],
  // for form
  start: 0,
  showCities: [],
  filteredCities: [],
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

    case constants.SET_FILTERED_CITIES:
      return {
        ...state,
        start: 0,
        showCities: [],
        filteredCities: payload,
      };

    case constants.INIT_FILTERED_CITIES:
      return {
        ...state,
        start: 0,
        showCities: [],
        filteredCities: state.cities,
      };

    case constants.NEXT_PAGE:
      const total = state.filteredCities.length;
      const nextEnd = state.start + COUNT_CITIES;
      const end = nextEnd < total ? nextEnd : total;
      return {
        ...state,
        start: end,
        showCities: [
          ...state.showCities,
          ...state.filteredCities.slice(state.start, end),
        ],
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
