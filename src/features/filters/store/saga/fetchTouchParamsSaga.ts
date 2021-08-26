import { call, put, takeEvery } from 'redux-saga/effects';
import { objectToArray } from '~/src/app/utils/common';
import { setTouchParams } from '../flterActions';
import { methods } from '~/src/app/api';
import { BathType } from '~/src/app/models/bath';
import { FETCH_TOUCH_PARAMS } from '../filterConstants';
import { logline } from '~/src/app/utils/debug';

export interface IResponse {
  types: BathType[];
  zones: string[];
  services: string[];
  steamRooms: string[];
}

function* fetchTouchParamsSaga() {
  try {
    const params: IResponse = yield call(methods.getBathParams, null, null);
    //log('paramsTouch', params);
    const { types, zones, services, steamRooms } = params;
    yield put(
      setTouchParams({
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
  yield takeEvery(FETCH_TOUCH_PARAMS, fetchTouchParamsSaga);
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
const paramsTouch: BathTouchParams = {
  types: params.types,
  zones: new Map(Object.entries(params.zones) || {}),
  zones: params.zones,
  services: new Map(Object.entries(params.services) || {}),
  steamRooms: new Map(Object.entries(params.steamRooms) || {}),
}; */
