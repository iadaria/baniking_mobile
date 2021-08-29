import React, { createRef, useCallback, useEffect, useState } from 'react';
import MapView, { Polyline as MapPolyline, Marker } from 'react-native-maps';
import PolyLine from '@mapbox/polyline';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { IRootState } from '~/src/app/store/rootReducer';
import { IBathDetailed, TPartDirectionsParams } from '~/src/app/models/bath';
import { ILocation } from '~/src/app/models/user';
import { getPoints } from '~/src/app/utils/bathUtility';
import { styles } from './styles';
import { MarkerIconSvg } from '~/src/assets';
import MapScreen from '../../components/MapScreen';
import { logline } from '~/src/app/utils/debug';
import { Location } from '~/src/app/models/map';

export interface IProps {
  selectedBath: IBathDetailed | null;
  userLocation: Location | null;
}

function DestinationMapContainer({ selectedBath, userLocation }: IProps) {
  const [destinationCoords, setDestinationCoords] = useState<ILocation[]>([]);
  const map = createRef<MapView>();
  const timeIds: NodeJS.Timeout[] = [];

  const bathLocation: ILocation = {
    latitude: selectedBath!.latitude,
    longitude: selectedBath!.longitude,
  };

  const requestPoint = useCallback(() => {
    const { latitude: bathLatitude, longitude: bathLongitude } =
      bathLocation || {};
    const { lat: userLatitud, lng: userLongitude } = userLocation || {};
    if (bathLatitude && bathLongitude && userLatitud && userLongitude) {
      const params: TPartDirectionsParams = {
        origin: `${userLatitud},${userLongitude}`,
        destination: `${bathLatitude},${bathLongitude}`,
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
            let timeId = setTimeout(() => {
              map.current?.fitToElements(true);
              map.current?.fitToCoordinates(latLng, {
                edgePadding: { top: 40, bottom: 40, left: 40, right: 40 },
              });
            }, 1500);
            timeIds.push(timeId);
          }
          // setPoints(result);
        })
        .catch((error) => {
          logline('[DestingationMap/getPoitns/error]', error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bathLocation, userLocation]);

  useEffect(() => {
    logline('[DestingationMap]', 'requestPoint');
    if (bathLocation && userLocation) {
      requestPoint();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let timeId: NodeJS.Timeout;
    timeId = setTimeout(() => {
      map.current?.fitToElements(true);
      map.current?.fitToCoordinates(destinationCoords, {
        edgePadding: { top: 40, bottom: 40, left: 40, right: 40 },
      });
    }, 1000);
    return () => clearTimeout(timeId);
  }, [destinationCoords, map]);

  const onMapReady = () => {
    let timeId = setTimeout(() => {
      map.current?.map.setNativeProps({ style: { flex: 1, marginLeft: 0 } });
    }, 500);
    timeIds.push(timeId);
  };

  if (!userLocation || !bathLocation) {
    return null;
  }

  let marker = null;
  let polyline = null;
  if (destinationCoords.length > 0) {
    polyline = (
      <MapPolyline
        coordinates={destinationCoords}
        strokeWidth={4}
        strokeColor="#000"
      />
    );
    marker = (
      <Marker coordinate={destinationCoords[destinationCoords.length - 1]}>
        <MarkerIconSvg />
        {/* <Image source={MarkerIcon} width={wp(15)} height={wp(15)} /> */}
      </Marker>
    );
  }

  return (
    <View style={[styles.container]}>
      <MapScreen
        style={styles.container}
        onMapReady={onMapReady}
        ref={map}
        userLatitude={userLocation?.lat}
        userLongitude={userLocation?.lng}>
        {polyline}
        {marker}
      </MapScreen>
    </View>
  );
}

const DestinationMapConnected = connect(
  ({ map, bath }: IRootState) => ({
    selectedBath: bath.selectedBath,
    userLocation: map.location,
  }),
  {},
)(DestinationMapContainer);

export { DestinationMapConnected as DestinationMap };

/*   if (!granted) {
    return <NoPermissionPart setNeedCheck={() => setNeedGeo(true)} />;
  } */

// logline('[DestinationMap/userLocation]', location, localPermission);

/*  const { location: userLocation } =
    useSelector(({ auth }: IRootState) => auth.currentUser) || {}; */
//const bathLocation: ILocation = route?.params || {};
//const [customeNeedCheck, setCustomeNeedCheck] = useState<boolean>(false);
//const [localPermission, setLocalPermission] = useState(false);
//const [fit, setFit] = useState(false);

/* import usePermission from '~/src/app/hooks/usePermission';
import { useGeolocation } from '../../hooks/useGeolocation';
import { PERMISSION_TYPE } from '~/src/app/common/components/AppPersmission'; */

/* interface IState {
  hasMapPermission: [boolean, string];
  userLatitude: number;
  userLongitude: number;
  destinationCoords: number[];
} */

//const test: ILocation = { latitude: 55.82633, longitude: 37.3262967 };
// const testBath: Bath = { latitude: 55.822871, longitude: 37.3131741 };
//const testBath: Bath = { latitude: 55.832871, longitude: 37.3031741 };

/* useEffect(() => {
    setTimeout(() => {
      setFit(true);
    }, 1000);
  }, []); */

/*   usePermission({
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
}); */

/* useEffect(() => {
  __DEV__ && console.log('[DestinationMap/points]', destinationCoords);
}, [destinationCoords]); */

/*   useEffect(() => {
  return () => {
    logline('[OrderCallForm/useEffect/timeIds change]', timeIds);
    timeIds.forEach((timeId: NodeJS.Timeout) => clearTimeout(timeId));
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []); */
