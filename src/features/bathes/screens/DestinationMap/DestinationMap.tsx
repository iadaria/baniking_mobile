import React, { createRef, useCallback, useEffect, useRef, useState } from 'react';
import { RESULTS, openSettings } from 'react-native-permissions';
import { Route } from '@react-navigation/native';
import MapView from 'react-native-maps';
import NoPermissionPart from './NoPermissionPart';
import MapScreen from './MapScreen';
import { styles } from './styles';
import { View } from 'react-native';
import usePermission from '~/src/app/hooks/usePermission';
import { useGeolocation } from '../../hooks/useGeolocation';
import { ILocation } from '~/src/app/models/user';
import { PERMISSION_TYPE } from '~/src/app/common/components/AppPersmission';
import { useSelector } from 'react-redux';
import { IAuthState } from '~/src/features/auth/store/authReducer';
import { IRootState } from '~/src/app/store/rootReducer';

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
  const [customeNeedCheck, setCustomeNeedCheck] = useState<boolean>(false);
  const [localPermission, setLocalPermission] = useState(false);
  const { location } = useSelector(({ auth }: IRootState) => auth.currentUser);
  const map = createRef<MapView>();

  usePermission({
    permission_type: PERMISSION_TYPE.location,
    setGranted: setLocalPermission,
    alert_message:
      'Вы запретили использовать геолокацию, для дальнейшей работы приложения небходимо разрешение на определение местоположения',
    warning_message: 'У приложения нет разрешения на использование геолокации',
    customeNeedCheck,
    resetCustomeNeedCheck: setCustomeNeedCheck.bind(null, false),
  });

  useGeolocation({
    permission: localPermission,
  });

  if (!localPermission) {
    return <NoPermissionPart setNeedCheck={setCustomeNeedCheck.bind(null, true)} />;
  }

  console.log('[DestinationMap/userLocation]', location, localPermission);

  if (!location) return null;

  return (
    <View style={styles.container}>
      <MapScreen ref={map} userLatitude={location?.latitude} userLongitude={location?.longitude} />
    </View>
  );
}
