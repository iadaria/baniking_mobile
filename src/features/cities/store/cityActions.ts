import { City } from '~/src/app/models/city';
import * as constants from './cityConstants';
import { IErrors } from '~/src/app/utils/error';

export const fetchCities = () => ({
  type: constants.FETCH_CITIES,
});

export const setCities = (payload: City[]) => ({
  type: constants.SET_CITIES,
  payload,
});

export const citiesFail = (payload: IErrors | null) => ({
  type: constants.CITIES_FAIL,
  payload,
});

export const selectCity = (paylaod: number) => ({
  type: constants.SELECT_CITY,
  paylaod,
});

export const unselectCity = () => ({
  type: constants.UNSELECT_CITY,
});
