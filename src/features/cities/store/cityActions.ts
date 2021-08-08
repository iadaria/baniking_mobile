import { City } from '~/src/app/models/city';
import * as constants from './cityConstants';
import { IErrors } from '~/src/app/utils/error';

export const checkCity = () => ({
  type: constants.CHECK_CITY,
});

export const fetchCities = () => ({
  type: constants.FETCH_CITIES,
});

export const setCities = (payload: City[]) => ({
  type: constants.SET_CITIES,
  payload,
});

export const initFilteredCities = () => ({
  type: constants.INIT_FILTERED_CITIES,
});

export const setFilteredCities = (payload: City[]) => ({
  type: constants.SET_FILTERED_CITIES,
  payload,
});

export const nextPage = () => ({
  type: constants.NEXT_PAGE,
});

export const citiesFail = (payload: IErrors | null) => ({
  type: constants.CITIES_FAIL,
  payload,
});

export const selectCity = (payload: number) => ({
  type: constants.SELECT_CITY,
  payload,
});

export const unselectCity = () => ({
  type: constants.UNSELECT_CITY,
});
