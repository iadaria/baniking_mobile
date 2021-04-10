import { useCallback, useEffect, useRef } from 'react';
import Geolocation from 'react-native-geolocation-service';
//import { ILocation } from '~/src/app/models/user';
import { useDispatch, useSelector } from 'react-redux';
import { ILocation } from '~/src/app/models/user';
import { IRootState } from '~/src/app/store/rootReducer';
import { setAuthUserData } from '~/src/features/auth/store/authActions';
import { IAuthState } from '../../auth/store/authReducer';

interface IProps {
  permission: boolean;
  // setUserLocation: (location: ILocation) => void;
}

const TEST_LATITUDE = 55.8263; // TEST NEED DEL
const TEST_LONGITUDE = 37.3263; // TEST NEED DEL

export function useGeolocation({ permission /* , setUserLocation  */ }: IProps) {
  const dispatch = useDispatch();
  const { currentUser }: IAuthState = useSelector(({ auth }: IRootState) => auth);
  const locationWatchId = useRef<number>();

  /** Функция подписная с обновлением для определения текущего местоположения */
  const requestFineLocation = useCallback(() => {
    if (permission) {
      // __DEV__ && console.log('!!! detect geolocation');
      return Geolocation.watchPosition(
        (position: Geolocation.GeoPosition) => {
          const { latitude: oldLt, longitude: oldLg } = currentUser?.location || {
            latitude: null,
            longitude: null,
          };
          const { latitude: newLt, longitude: newhLg } = position.coords;
          __DEV__ && console.log('[requestFineLocation/position]', position);
          if (oldLt?.toFixed(3) !== newLt.toFixed(3) || oldLg?.toFixed(3) !== newhLg.toFixed(3)) {
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
          }
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
                latitude: position.coords.latitude,
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
