import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { IUiButton } from '~/src/app/models/ui';
import { colors, sizes } from '../../constants';

export function AppButton(props: IUiButton) {
  const {
    style,
    opacity,
    color,
    shadow,
    children,
    // property of Button
    disabled = false,
    ...other
  } = props;

  const buttonStyles = [
    styles.button,
    shadow && styles.shadow,
    color && styles[color as keyof typeof styles], // predefined styles colors for backgroundColor
    color &&
      !styles[color as keyof typeof styles] && { backgroundColor: color }, // custom backgroundColor
    disabled && styles.disabled,
    // yellow && styles.yellow,
  ];

  return (
    <TouchableOpacity
      disabled={disabled}
      style={buttonStyles}
      activeOpacity={disabled ? 1 : opacity || 0.8}
      {...other}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: sizes.button.radius,
    padding: wp(sizes.button.padding),

    // height: wp(sizes.offset.base) * 1.2,
    // justifyContent: 'center',
    backgroundColor: colors.secondary,
    // marginVertical: wp(sizes.padding) / 3,
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  disabled: { backgroundColor: colors.button.disable },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.secondary },
  black: { backgroundColor: colors.black },
  white: { backgroundColor: colors.white },
});
