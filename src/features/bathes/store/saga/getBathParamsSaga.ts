import { call, put, takeEvery } from 'redux-saga/effects';
import { methods } from '~/src/app/api';
import { setBathFilterParams } from '../bathActions';
import { BathType } from '~/src/app/models/bath';
import { GET_BATH_PARAMS_FILTERING } from '../bathConstants';
import { logline } from '~/src/app/utils/debug';
import { objectToArray } from '~/src/app/utils/common';

export interface IResponse {
  types: BathType[];
  zones: string[];
  services: string[];
  steamRooms: string[];
}

function* getBathParamsSaga() {
  try {
    const params: IResponse = yield call(methods.getBathParams, null, null);
    //log('paramsFilter', params);
    const { types, zones, services, steamRooms } = params;
    yield put(
      setBathFilterParams({
        types,
        zones: objectToArray(zones),
        services: objectToArray(services),
        steamRooms: objectToArray(steamRooms),
      }),
    );
  } catch (error) {
    logline('[getBathParamsSaga]', error);
  }
}

export default function* listener() {
  yield takeEvery(GET_BATH_PARAMS_FILTERING, getBathParamsSaga);
}

// var countParams = 0;
/* countParams++;
  if (countParams > 3) {
    logline('[getBathParamsSAga] count > 3');
    setTimeout(function () {
      countParams = 0;
    }, 30000);
    return;
  } */
/*
const paramsFilter: BathFilterParams = {
  types: params.types,
  zones: new Map(Object.entries(params.zones) || {}),
  zones: params.zones,
  services: new Map(Object.entries(params.services) || {}),
  steamRooms: new Map(Object.entries(params.steamRooms) || {}),
}; */
