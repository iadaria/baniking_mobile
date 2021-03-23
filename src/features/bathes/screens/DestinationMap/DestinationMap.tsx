import React, { createRef, useCallback, useEffect, useState } from 'react';
import { Route } from '@react-navigation/native';
import MapView, { Polyline as MapPolyline, Marker } from 'react-native-maps';
import PolyLine from '@mapbox/polyline';
import NoPermissionPart from './NoPermissionPart';
import MapScreen from './MapScreen';
import { View, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import usePermission from '~/src/app/hooks/usePermission';
import { useGeolocation } from '../../hooks/useGeolocation';
import { PERMISSION_TYPE } from '~/src/app/common/components/AppPersmission';
import { useSelector } from 'react-redux';
import { IRootState } from '~/src/app/store/rootReducer';
import { IBath, TPartDirectionsParams } from '~/src/app/models/bath';
import { ILocation } from '~/src/app/models/user';
import { getPoints } from '~/src/app/utils/bathUtility';
import { styles } from './styles';
import { MarkerIcon } from '~/src/assets';

export interface IProps {
  route: Route<string, object | undefined>;
}

interface IState {
  hasMapPermission: [boolean, string];
  userLatitude: number;
  userLongitude: number;
  destinationCoords: number[];
}

const test: ILocation = { latitude: 55.82633, longitude: 37.3262967 };
// const testBath: IBath = { latitude: 55.822871, longitude: 37.3131741 };
const testBath: IBath = { latitude: 55.832871, longitude: 37.3031741 };

export function DestinationMap({ route }: IProps) {
  const [customeNeedCheck, setCustomeNeedCheck] = useState<boolean>(false);
  const [localPermission, setLocalPermission] = useState(false);
  // const [points, setPoints] = useState<string | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<ILocation[]>([]);
  const { location } = useSelector(({ auth }: IRootState) => auth.currentUser) || test;
  const map = createRef<MapView>();

  const bath: IBath | undefined = route?.params || testBath;

  console.log(bath);

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

  useEffect(() => {
    console.log('[DestinationMap/points]', destinationCoords);
  }, [destinationCoords]);

  const requestPoint = useCallback(() => {
    const { latitude, longitude } = bath || {};
    const { latitude: userLatitud, longitude: userLongitude } = location || {};
    if (latitude && longitude && userLatitud && userLongitude) {
      const params: TPartDirectionsParams = {
        origin: `${userLatitud},${userLongitude}`,
        destination: `${latitude},${longitude}`,
      };
      getPoints(params)
        .then((result: string | null) => {
          if (result) {
            const _points = PolyLine.decode(result);
            const latLng = _points.map((point: [number, number]) => ({
              latitude: point[0],
              longitude: point[1],
            }));
            setDestinationCoords(latLng);
            map.current?.fitToElements(true);
            map.current?.fitToCoordinates(latLng, {
              edgePadding: { top: 40, bottom: 40, left: 40, right: 40 },
            });
          }
          // setPoints(result);
        })
        .catch((error) => console.log('[DestingationMap/getPoitns/error]', error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bath, location]);

  useEffect(() => {
    if (bath && location) {
      requestPoint();
    }
  }, [bath, location, requestPoint]);

  useEffect(() => {
    if (map.current) {
      map.current?.fitToElements(true);
      map.current?.fitToCoordinates(destinationCoords, {
        edgePadding: { top: 40, bottom: 40, left: 40, right: 40 },
      });
    }
  }, [destinationCoords, map]);

  if (!localPermission) {
    return <NoPermissionPart setNeedCheck={setCustomeNeedCheck.bind(null, true)} />;
  }

  console.log('[DestinationMap/userLocation]', location, localPermission);

  if (!location) {
    return null;
  }

  let marker = null;
  let polyline = null;
  if (destinationCoords.length > 0) {
    polyline = <MapPolyline coordinates={destinationCoords} strokeWidth={4} strokeColor="#000" />;
    marker = (
      <Marker coordinate={destinationCoords[destinationCoords.length - 1]}>
        <Image source={MarkerIcon} />
      </Marker>
    );
  }

  return (
    <View style={styles.container}>
      <MapScreen ref={map} userLatitude={location?.latitude} userLongitude={location?.longitude}>
        {polyline}
        {marker}
      </MapScreen>
    </View>
  );
}
