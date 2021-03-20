import React, { createRef, useCallback, useEffect, useRef, useState } from 'react';
import { RESULTS } from 'react-native-permissions';
import { Route } from '@react-navigation/native';
import { IBath } from '~/src/app/models/bath';
import { AppPermission, PERMISSION_TYPE } from '~/src/app/common/components/AppPersmission';
import { openSettings } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import { showAlert } from '~/src/app/common/components/showAlert';
import { isAndroid, isIos } from '~/src/app/common/constants/platform';
import MapScreen from './MapScreen';
import MapView from 'react-native-maps';
import { View } from 'react-native';
import { styles } from './styles';

export interface IProps {
  route: Route<string, object | undefined>;
}

interface IState {
  hasMapPermission: [boolean, string];
  userLatitude: number;
  userLongitude: number;
  destinationCoords: number[];
}

export function DestinationMap({ route }: IProps) {
  const [permitLocate, setPermitLocate] = useState<[boolean, string]>();
  const [state, setState] = useState<IState>({
    hasMapPermission: [true, ''],
    userLatitude: 0,
    userLongitude: 0,
    destinationCoords: [],
  });
  const locationWatchId = useRef<number>();
  // const showDirectionsOnMap = useRef<MapView>();
  const map = createRef<MapView>();

  const bath: IBath | undefined = route?.params;

  useEffect(() => {
    AppPermission.checkPermission(PERMISSION_TYPE.location).then((result) => {
      setPermitLocate(result);
      setState((prevState: IState) => ({
        ...prevState,
        hasMapPermission: result,
      }));
    });
  }, []);

  useEffect(() => {
    console.log('[BathScreen]', bath);
  }, [bath]);

  // Проверка на разрешение определения местоположения и запрос на разрешение
  useEffect(() => {
    if (permitLocate) {
      const [granted, permit] = permitLocate;
      console.log(`[BathScreen] result=${granted} permit=${permit} ===`, JSON.stringify(permitLocate, null, 2));
      if (!granted && permit === RESULTS.BLOCKED) {
        showAlert(
          'Разрешение',
          'Вы запретили использовать геолокацию, для дальнейшей работы приложения небходимо разрешение на определение местоположения',
          'Изменить разрешение',
          openSettings,
          true,
        );
      } else if (!granted) {
        showAlert('Разрешение', 'У приложения нет разрешения на использование геолокации');
      }
    }
  }, [permitLocate]);

  const requestFineLocation = useCallback(() => {
    const [granted] = permitLocate || [false];
    if ((isAndroid && granted) || isIos) {
      return Geolocation.watchPosition(
        (position: Geolocation.GeoPosition) => {
          console.log(position);
          setState((prevState: IState) => ({
            ...prevState,
            userLatitude: position.coords.latitude,
            userLongitude: position.coords.longitude,
          }));
        },
        (error: Geolocation.GeoError) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true },
      );
    }
  }, [permitLocate]);

  useEffect(() => {
    locationWatchId.current = requestFineLocation();
    return function () {
      if (locationWatchId.current) {
        Geolocation.clearWatch(locationWatchId.current);
      }
    };
  }, [permitLocate, requestFineLocation]);

  if (!state.hasMapPermission[0]) {
    return null;
  }

  return (
    <View style={styles.container}>
      <MapScreen ref={map} userLatitude={state.userLatitude} userLongitude={state.userLongitude} />
    </View>
  );
}
