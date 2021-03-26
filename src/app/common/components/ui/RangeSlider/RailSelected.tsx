import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../../constants';

const RailSelected = () => {
  return <View style={styles.root} />;
};

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 8,
    backgroundColor: colors.secondary,
    borderRadius: 2,
  },
});
