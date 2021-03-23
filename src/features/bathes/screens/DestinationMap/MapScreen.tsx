import React, { ForwardedRef } from 'react';
import MapView, { MapViewProps } from 'react-native-maps';
import { styles } from './styles';

interface IProps extends MapViewProps {
  userLatitude: number;
  userLongitude: number;
  children?: React.ReactNode;
}

export default React.forwardRef(
  ({ userLatitude, userLongitude, children }: IProps, ref: ForwardedRef<MapView>) => (
    <MapView
      ref={ref}
      mapType="standard"
      showsUserLocation
      followsUserLocation
      zoomEnabled={true}
      style={styles.map}
      region={{
        latitude: userLatitude,
        longitude: userLongitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}>
      {children}
    </MapView>
  ),
);
