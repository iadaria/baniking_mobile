import React, { createRef, useCallback, useEffect, useRef, useState } from 'react';
import { RESULTS, openSettings } from 'react-native-permissions';
import { Route } from '@react-navigation/native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { IBath } from '~/src/app/models/bath';
import { AppPermission, PERMISSION_TYPE } from '~/src/app/common/components/AppPersmission';
import { showAlert } from '~/src/app/common/components/showAlert';
import NoPermissionPart from './NoPermissionPart';
import MapScreen from './MapScreen';
import { styles } from './styles';
import { View } from 'react-native';

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
  const [needCheck, setNeedCheck] = useState<boolean>(true);
  const [state, setState] = useState<IState>({
    hasMapPermission: [false, ''],
    userLatitude: 0,
    userLongitude: 0,
    destinationCoords: [],
  });
  const locationWatchId = useRef<number>();
  // const showDirectionsOnMap = useRef<MapView>();
  const map = createRef<MapView>();

  const bath: IBath | undefined = route?.params || {};

  useEffect(() => {
    console.log('[DestinationMab/bath]', bath);
  }, [bath]);

  useEffect(() => {
    if (needCheck) {
      AppPermission.checkPermission(PERMISSION_TYPE.location).then((result) => {
        setState({ ...state, hasMapPermission: result });
        setNeedCheck(false);
      });
    } else {
      console.log('\n[DestinationMap/useEffect] needCheck is false');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needCheck]);

  // Проверка на разрешение определения местоположения и запрос на разрешение
  useEffect(() => {
    const [granted, permit] = state.hasMapPermission;
    if (!granted && !needCheck) {
      if (!granted && (permit === RESULTS.BLOCKED || permit === RESULTS.UNAVAILABLE)) {
        showAlert(
          'Разрешение',
          'Вы запретили использовать геолокацию, для дальнейшей работы приложения небходимо разрешение на определение местоположения',
          'Изменить разрешение',
          () => {
            openSettings();
            setTimeout(setNeedCheck.bind(false, true), 6000);
          },
          true,
        );
        /* } else if (!granted && permit === RESULTS.DENIED) {
        setNeedCheck(true); */
      } else if (!granted) {
        showAlert('Разрешение', 'У приложения нет разрешения на использование геолокации');
      }
    }
  }, [state.hasMapPermission, needCheck]);

  /** Функция для определения текущего местоположения */
  const requestFineLocation = useCallback(() => {
    const [granted] = state.hasMapPermission || [false];
    if (granted) {
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
  }, [state.hasMapPermission]);

  /** Определеляем текущее местоположение пользователя */
  useEffect(() => {
    locationWatchId.current = requestFineLocation();
    return function () {
      if (locationWatchId.current) {
        Geolocation.clearWatch(locationWatchId.current);
      }
    };
  }, [state.hasMapPermission, requestFineLocation]);

  if (!state.hasMapPermission[0]) {
    return <NoPermissionPart setNeedCheck={setNeedCheck.bind(null, true)} />;
  }

  return (
    <View style={styles.container}>
      <MapScreen ref={map} userLatitude={state.userLatitude} userLongitude={state.userLongitude} />
    </View>
  );
}
