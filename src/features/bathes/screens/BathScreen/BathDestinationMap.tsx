import React, { createRef } from 'react';
import { Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MapView, { Marker } from 'react-native-maps';
import { MarkerIcon } from '~/src/assets';
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
        <Image source={MarkerIcon} width={wp(15)} height={wp(15)} />
      </Marker>
    </MapScreen>
  );
}
