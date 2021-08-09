import { useCallback, useEffect, useRef } from 'react';
import Geolocation from 'react-native-geolocation-service';
//import { ILocation } from '~/src/app/models/user';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '~/src/app/store/rootReducer';
import { logline } from '~/src/app/utils/debug';
import { setAuthUserData } from '~/src/features/auth/store/authActions';
import { IAuthState } from '../../auth/store/authReducer';

interface IProps {
  permission: boolean;
  // setUserLocation: (location: ILocation) => void;
}

//const TEST_LATITUDE = 55.8263; // TEST NEED DEL
//const TEST_LONGITUDE = 37.3263; // TEST NEED DEL

export function useGeolocation({
  permission /* , setUserLocation  */,
}: IProps) {
  const dispatch = useDispatch();
  const { currentUser }: IAuthState = useSelector(
    ({ auth }: IRootState) => auth,
  );
  const locationWatchId = useRef<number>();

  /** Функция подписная с обновлением для определения текущего местоположения */
  const requestFineLocation = useCallback(() => {
    if (permission) {
      // logline('!!! detect geolocation');
      return Geolocation.watchPosition(
        (position: Geolocation.GeoPosition) => {
          const {
            latitude: oldLt,
            longitude: oldLg,
          } = currentUser?.location || {
            latitude: null,
            longitude: null,
          };
          const { latitude: newLt, longitude: newhLg } = position.coords;
          logline('[requestFineLocation/position]', position);
          if (
            oldLt?.toFixed(3) !== newLt.toFixed(3) ||
            oldLg?.toFixed(3) !== newhLg.toFixed(3)
          ) {
            dispatch(
              setAuthUserData({
                location: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                },
              }),
            );
          }
        },
        (error: Geolocation.GeoError) => {
          // See error code charts below.
          logline('[useGeolocaton] ', `${error.code} ${error.message}`);
        },
        { enableHighAccuracy: true },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, permission]);

  /** Функция ЕДИНОРАЗОВАЯ для определения текущего местоположения */
  const requestFineLocationNow = useCallback(() => {
    if (permission) {
      return Geolocation.getCurrentPosition(
        (position: Geolocation.GeoPosition) => {
          logline('[requestFineLocation/position] now', position);
          dispatch(
            setAuthUserData({
              location: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
            }),
          );
        },
        (error: Geolocation.GeoError) => {
          // See error code charts below.
          logline('[useGeolocaton] ', `${error.code} ${error.message}`);
        },
        { enableHighAccuracy: true },
      );
    }
  }, [dispatch, permission]);

  /** Определеляем текущее местоположение пользователя */
  useEffect(() => {
    requestFineLocationNow();
    return function () {
      if (locationWatchId?.current) {
        Geolocation.clearWatch(locationWatchId?.current);
      }
    };
  }, [permission, requestFineLocation, requestFineLocationNow]);
}
