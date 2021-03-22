import { GOOGLE_API } from '@env';
import { takeLatest } from 'redux-saga/effects';
import { TPartDirectionsParams } from '~/src/app/models/bath';
import { GET_DIRECTIONS } from '../bathConstants';
import { methods } from '~/src/app/api';
import { IDirectionsResponse } from '~/src/app/models/bath';

interface IAction {
  payload: TPartDirectionsParams;
  types: string;
}

function* getDirectionsSaga({ payload }: IAction) {
  const params = { ...payload, key: GOOGLE_API };
  try {
    const { geocoded_waypoints, routes }: IDirectionsResponse = yield methods.getDirections(null, params);
    if (
      geocoded_waypoints.length > 1 &&
      geocoded_waypoints[0].geocoder_status === 'OK' &&
      geocoded_waypoints[1].geocoder_status === 'OK'
    ) {
      const {
        distance: { test },
        overview_polyline,
      } = routes[0];
    }
  } catch (error) {
    console.log('[getDirectionsSaga]', error);
  }
}

export default function* listener() {
  yield takeLatest(GET_DIRECTIONS, getDirectionsSaga);
}
