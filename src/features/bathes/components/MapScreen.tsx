import React, { ForwardedRef } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import MapView, { MapStyleElement, MapViewProps } from 'react-native-maps';

interface IProps extends MapViewProps {
  userLatitude: number;
  userLongitude: number;
  children?: React.ReactNode;
  customMapStyle?: MapStyleElement[];
  style?: ViewStyle;
}

export default React.forwardRef(
  (
    { userLatitude, userLongitude, children, customMapStyle, style, ...otherProps }: IProps,
    ref: ForwardedRef<MapView>,
  ) => (
    <MapView
      ref={ref}
      // style={{ flex: 1, marginLeft: 1}}
      style={[styles.map, style]}
      customMapStyle={customMapStyle}
      // mapType="standard"
      showsUserLocation
      followsUserLocation
      zoomEnabled
      zoomControlEnabled
      // showsMyLocationButton
      region={{
        latitude: userLatitude,
        longitude: userLongitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
      {...otherProps}>
      {children}
    </MapView>
  ),
);

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
