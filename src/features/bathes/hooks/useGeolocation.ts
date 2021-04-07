import { useCallback, useEffect, useRef } from 'react';
import Geolocation from 'react-native-geolocation-service';
//import { ILocation } from '~/src/app/models/user';
import { useDispatch } from 'react-redux';
import { setAuthUserData } from '~/src/features/auth/store/authActions';

interface IProps {
  permission: boolean;
  // setUserLocation: (location: ILocation) => void;
}

export function useGeolocation({ permission /* , setUserLocation  */ }: IProps) {
  const dispatch = useDispatch();
  const locationWatchId = useRef<number>();
  /** Функция для определения текущего местоположения */
  const requestFineLocation = useCallback(() => {
    if (permission) {
      // __DEV__ && console.log('!!! detect geolocation');
      return Geolocation.watchPosition(
        (position: Geolocation.GeoPosition) => {
          __DEV__ && console.log(position);
          dispatch(
            setAuthUserData({
              location: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
            }),
          );
          /* setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }); */
        },
        (error: Geolocation.GeoError) => {
          // See error code charts below.
          __DEV__ && console.log(error.code, error.message);
        },
        { enableHighAccuracy: true },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permission]);

  /** Определеляем текущее местоположение пользователя */
  useEffect(() => {
    __DEV__ && console.log('\n[useGoelocation/useEffect/requestFineLocation]', permission);
    locationWatchId.current = requestFineLocation();
    return function () {
      if (locationWatchId.current) {
        Geolocation.clearWatch(locationWatchId.current);
      }
    };
  }, [permission, requestFineLocation]);
}
