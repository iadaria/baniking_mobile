import React from 'react';
import { StyleProp, StyleSheet, Text, View, TextStyle } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import { IUiInput } from '~/src/app/models/ui';
import { colors, fonts, sizes } from '~/src/app/common/constants';

interface IProps /*  extends IUiInput */ {
  label: string;
  isFocused: boolean;
}

export default function AppInputLabel(props: IProps) {
  const { label /* error, isFocused  */ } = props;

  const labelStyle: StyleProp<TextStyle> = [styles.label];

  return (
    <View style={styles.labelWrapper}>
      <Text style={labelStyle}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  labelWrapper: {
    position: 'absolute',
    alignSelf: 'flex-start',
    top: -hp(sizes.input.labelTop),
    left: wp(sizes.input.paddingHorizontal - sizes.input.labelPadding),
    zIndex: 2,
    backgroundColor: colors.white,
    paddingHorizontal: wp(sizes.input.labelPadding),
    /*     borderColor: 'red',
    borderWidth: 1, */
  },
  label: {
    fontFamily: fonts.Gilroy.semibold,
    fontSize: wp(sizes.input.label),
    // fontWeight: '700',
    color: colors.black,
  },
});
