import React, { ForwardedRef } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import MapView, { MapStyleElement, MapViewProps } from 'react-native-maps';
import { colors } from '~/src/app/common/constants';

interface IProps extends MapViewProps {
  userLatitude: number;
  userLongitude: number;
  children?: React.ReactNode;
  customMapStyle?: MapStyleElement[];
  style?: ViewStyle;
  /* showsUserLocation?: boolean;
  showMyLocationButton?: boolean; */
}

export default React.forwardRef(
  (
    { userLatitude, userLongitude, children, customMapStyle, style, ...otherProps }: IProps,
    ref: ForwardedRef<MapView>,
  ) => {
    return (
      <MapView
        ref={ref}
        // style={{ flex: 1, marginLeft: 1}}
        style={[styles.map, style]}
        customMapStyle={customMapStyle}
        mapType="standard"
        showsUserLocation={true}
        followsUserLocation={true}
        zoomEnabled={true}
        loadingEnabled={true}
        loadingBackgroundColor={colors.primary}
        loadingIndicatorColor={colors.secondary}
        zoomControlEnabled={true}
        showsMyLocationButton={true}
        region={{
          latitude: userLatitude,
          longitude: userLongitude,
          latitudeDelta: 0.015 * 10,
          longitudeDelta: 0.0121 * 10,
        }}
        {...otherProps}>
        {children}
      </MapView>
    );
  },
);

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
