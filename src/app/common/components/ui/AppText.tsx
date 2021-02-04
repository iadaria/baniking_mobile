import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors, fonts, sizes } from '~/app/common/constants';
import { ITextStyleProps, IUiText } from '~/app/models/text';

export function AppText(props: IUiText) {
  const {
    // style
    transform,
    align,
    //size
    h1,
    header,
    size,
    // font family
    regular,
    medium,
    bold,
    ubuntu,
    weight,
    light,
    lightItalic,
    lightUltra,
    trajan,
    seogoeUI,
    sfDisplay,
    sfTextRegular,
    sfTextSemibold,
    center,
    right,
    spacing, // letter-spacing
    height, // line-height
    capitalize,
    // colors
    color,
    primary,
    secondary,
    // logo,
    white,
    children,
    style,
    ...otherProps
  } = props;

  const textStyles = [
    styles.text,
    h1 && styles.h1,
    header && styles.header,
    // small && styles.small,
    size && { fontSize: size },
    transform && { textTransform: transform },
    align && { textAlign: align },
    height && { lineHeight: height },
    spacing && { letterSpacing: spacing },
    weight && { fontWeight: weight },
    // font family
    regular && styles.regular,
    bold && styles.bold,
    medium && styles.medium,
    light && styles.light,
    lightItalic && styles.lightItalic,
    lightUltra && styles.lightUltra,
    ubuntu && styles.ubuntu,
    trajan && styles.trajan,
    seogoeUI && styles.seogoeUI,
    sfDisplay && styles.sfDisplay,
    sfTextRegular && styles.sfTextRegular,
    sfTextSemibold && styles.sfTextSemibold,
    // styles
    center && styles.center,
    right && styles.right,
    // colors
    color && styles[color as keyof typeof styles],
    color && !styles[color as keyof typeof styles] && { color },
    // color shortcuts
    // accent && styles.accent,
    primary && styles.primary,
    secondary && styles.secondary,
    // tertiary && styles.tertiary,
    white && styles.white,
    style, // rewrite predefined styles
    // disabled && styles.disable,
  ];

  return (
    <Text style={textStyles} {...otherProps}>
      {capitalize && typeof children === 'string'
        ? children.toUpperCase()
        : children}
    </Text>
  );
}

const styles = StyleSheet.create<ITextStyleProps>({
  // default style
  text: {
    fontSize: wp(sizes.font),
    color: colors.text,
  },
  // variations
  regular: {
    fontFamily: fonts.Gilroy.regular,
  },
  bold: {
    // fontWeight: 'bold',
    fontFamily: fonts.Gilroy.bold,
  },
  medium: {
    fontFamily: fonts.Gilroy.medium,
  },
  light: {
    fontFamily: fonts.Gilroy.light,
  },
  lightItalic: {
    fontFamily: fonts.Gilroy.lightItalic,
  },
  lightUltra: {
    fontFamily: fonts.Gilroy.lightUltra,
    // fontWeight: '500',
  },
  ubuntu: {
    fontFamily: fonts.Ubuntu.light,
  },
  trajan: {
    fontFamily: fonts.Trajan.regular,
  },
  seogoeUI: {
    fontFamily: fonts.SeogoeUI.light,
  },
  sfDisplay: {
    fontFamily: fonts.SFProDisplay.regular,
  },
  sfTextRegular: {
    fontFamily: fonts.SFProText.regular,
  },
  sfTextSemibold: {
    fontFamily: fonts.SFProText.semibold,
  },
  // position
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
  // colors
  primary: { color: colors.primary },
  secondary: { color: colors.secondary },
  white: { color: colors.white },
  // fonts
  h1: fonts.h1,
  header: fonts.header,
});
