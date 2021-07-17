import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { BackwardIcon } from '~/src/assets';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { multiplier, sizes } from '../constants';

interface IProps {
  screen: string;
}

export const BackButton: FC<IProps> = ({ screen }) => {
  return (
    <TouchableOpacity
      style={styles.menu}
      onPress={() => RootNavigation.reset(screen)}>
      <BackwardIcon width={wp(8) * multiplier} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menu: {
    paddingVertical: wp(sizes.offset.base),
  },
});
