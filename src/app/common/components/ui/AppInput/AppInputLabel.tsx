import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { IUiInput } from '~/src/app/models/input';
import { colors, fonts, sizes } from '~/src/app/common/constants';

interface IProps extends IUiInput {
  isFocused: boolean;
}

export default function AppInputLabel(props: IProps) {
  const { label, error, isFocused } = props;

  // console.log('[AppInputLabel]', isFocused);

  const labelStyle: StyleProp<TextStyle> = [
    styles.label,
    /* {
      fontSize: !isFocused ? wp(sizes.font.label) : 14,
      color: !isFocused ? '#aaa' : '#000',
    }, */
  ];

  return (
    <>
      {label ? (
        <View style={styles.labelWrapper}>
          <Text style={labelStyle}>{label}</Text>
        </View>
      ) : null}
    </>
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
    /* borderWidth: 0.5,
    borderColor: 'red', */
    paddingHorizontal: wp(sizes.input.labelPadding),
  },
  label: {
    fontFamily: fonts.Gilroy.semibold,
    fontSize: wp(sizes.input.label),
    // fontWeight: '700',
    color: colors.black,
  },
});
