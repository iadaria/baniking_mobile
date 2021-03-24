import React, { createRef } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MapView, { Marker } from 'react-native-maps';
import { MarkerIconSvg } from '~/src/assets';
import MapScreen from '../../components/MapScreen';
import { mapStyle } from './mapStyle';

interface IProps {
  latitude: number;
  longitude: number;
}

export default function BathDestinationMap({ latitude, longitude }: IProps) {
  const map = createRef<MapView>();

  return (
    <MapScreen customMapStyle={mapStyle} ref={map} userLatitude={latitude} userLongitude={longitude}>
      <Marker coordinate={{ latitude, longitude }}>
        <MarkerIconSvg width={wp(20)} height={wp(20)} />
      </Marker>
    </MapScreen>
  );
}
