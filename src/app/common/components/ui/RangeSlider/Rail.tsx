import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../../constants';

const Rail = () => {
  return <View style={styles.root} />;
};

export default memo(Rail);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: 8,
    borderRadius: 5,
    backgroundColor: colors.slider.rail,
    opacity: 0.25,
  },
});
