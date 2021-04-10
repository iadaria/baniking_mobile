import { useCallback, useEffect, useRef } from 'react';
import Geolocation from 'react-native-geolocation-service';
//import { ILocation } from '~/src/app/models/user';
import { useDispatch } from 'react-redux';
import { setAuthUserData } from '~/src/features/auth/store/authActions';

interface IProps {
  permission: boolean;
  // setUserLocation: (location: ILocation) => void;
}

const TEST_LATITUDE = 55.8263; // TEST NEED DEL
const TEST_LONGITUDE = 37.3263; // TEST NEED DEL

export function useGeolocation({ permission /* , setUserLocation  */ }: IProps) {
  const dispatch = useDispatch();
  const locationWatchId = useRef<number>();

  /** Функция подписная с обновлением для определения текущего местоположения */
  const requestFineLocation = useCallback(() => {
    if (permission) {
      // __DEV__ && console.log('!!! detect geolocation');
      return Geolocation.watchPosition(
        (position: Geolocation.GeoPosition) => {
          __DEV__ && console.log('[requestFineLocation/position]', position);
          dispatch(
            setAuthUserData({
              location: {
                //latitude: TEST_LATITUDE, //position.coords.latitude,
                latitude: position.coords.latitude,
                //longitude: TEST_LONGITUDE, //position.coords.longitude,
                longitude: position.coords.longitude,
              },
            }),
          );
        },
        (error: Geolocation.GeoError) => {
          // See error code charts below.
          __DEV__ && console.log(error.code, error.message);
        },
        { enableHighAccuracy: true },
      );
    }
  }, [dispatch, permission]);

  /** Функция ЕДИНОРАЗОВАЯ для определения текущего местоположения */
  const requestFineLocationNow = useCallback(() => {
    if (permission) {
      // __DEV__ && console.log('!!! detect geolocation');
      return Geolocation.getCurrentPosition(
        (position: Geolocation.GeoPosition) => {
          __DEV__ && console.log('[requestFineLocation/position] now', position);
          dispatch(
            setAuthUserData({
              location: {
                latitude: TEST_LATITUDE, //position.coords.latitude,
                longitude: TEST_LONGITUDE, //position.coords.longitude,
              },
            }),
          );
        },
        (error: Geolocation.GeoError) => {
          // See error code charts below.
          __DEV__ && console.log(error.code, error.message);
        },
        { enableHighAccuracy: true },
      );
    }
  }, [dispatch, permission]);

  /** Определеляем текущее местоположение пользователя */
  useEffect(() => {
    //__DEV__ && console.log('\n[useGoelocation/useEffect/requestFineLocation]', permission);
    //locationWatchId.current = requestFineLocation();
    requestFineLocationNow();
    return function () {
      if (locationWatchId?.current) {
        Geolocation.clearWatch(locationWatchId?.current);
      }
    };
  }, [permission, requestFineLocation, requestFineLocationNow]);
}

/* setUserLocation({
  latitude: position.coords.latitude,
  longitude: position.coords.longitude,
}); */
