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

  const labelWrapperStyle: StyleProp<ViewStyle> = [
    styles.labelWrapper,
    {
      /* top: !isFocused ? hp(1.4) : -hp(1.4),
      left: !isFocused ? wp(4) : wp(sizes.input.paddingHorizontal),
      zIndex: !isFocused ? undefined : 2, */
      top: -hp(1.4),
      left: wp(sizes.input.paddingHorizontal),
      zIndex: 2,
    },
  ];

  const labelStyle: StyleProp<TextStyle> = [
    styles.label,
    /* {
      fontSize: !isFocused ? wp(sizes.label) : 14,
      color: !isFocused ? '#aaa' : '#000',
    }, */
  ];

  return (
    <>
      {label ? (
        <View style={labelWrapperStyle}>
          <Text style={labelStyle}>{label}</Text>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  labelWrapper: {
    position: 'absolute',
    left: 0,
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    /* borderWidth: 0.5,
    borderColor: 'red', */
    paddingHorizontal: wp(1),
  },
  label: {
    fontFamily: fonts.Gilroy.semibold,
    fontSize: wp(sizes.input.label),
    fontWeight: '700',
    color: colors.black,
  },
});
