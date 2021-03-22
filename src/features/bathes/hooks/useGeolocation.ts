import { useCallback, useEffect, useRef } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { ILocation } from '~/src/app/models/user';

interface IProps {
  permission: boolean;
  setUserLocation: (location: ILocation) => void;
}

export function useGeolocation({ permission, setUserLocation }: IProps) {
  const locationWatchId = useRef<number>();
  /** Функция для определения текущего местоположения */
  const requestFineLocation = useCallback(() => {
    if (permission) {
      return Geolocation.watchPosition(
        (position: Geolocation.GeoPosition) => {
          console.log(position);
          setUserLocation({
            userLatitude: position.coords.latitude,
            userLongitude: position.coords.longitude,
          });
        },
        (error: Geolocation.GeoError) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permission]);

  /** Определеляем текущее местоположение пользователя */
  useEffect(() => {
    locationWatchId.current = requestFineLocation();
    return function () {
      if (locationWatchId.current) {
        Geolocation.clearWatch(locationWatchId.current);
      }
    };
  }, [permission, requestFineLocation]);
}
