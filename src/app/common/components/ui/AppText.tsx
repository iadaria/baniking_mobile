import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors, fonts, sizes } from '~/src/app/common/constants';
import { ITextStyleProps, IUiText } from '~/src/app/models/ui';

export function AppText(props: IUiText) {
  const {
    // style
    transform,
    spacing, // letter-spacing
    height, // line-height
    // necessary,
    // align
    align,
    center,
    right,
    //size
    h1,
    h2,
    header,
    logo,
    caption,
    size,
    // font family
    regular,
    medium,
    bold,
    semibold,
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
    // colors
    color,
    primary,
    secondary,
    disabled,
    white,
    children,
    style,
    ...otherProps
  } = props;

  const textStyles = [
    styles.text,
    h1 && styles.h1,
    h2 && styles.h2,
    header && styles.header,
    logo && styles.logo,
    caption && styles.caption,
    // small && styles.small,
    size && { fontSize: wp(size) },
    transform && { textTransform: transform },
    align && { textAlign: align },
    height && { lineHeight: height },
    spacing && { letterSpacing: spacing },
    weight && { fontWeight: weight },
    // font family
    regular && styles.regular,
    bold && styles.bold,
    medium && styles.medium,
    semibold && styles.sfTextSemibold,
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
    disabled && styles.disabled,
  ];

  return (
    <Text style={textStyles} {...otherProps}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create<ITextStyleProps>({
  // default style
  text: {
    fontSize: wp(sizes.font.base),
    color: colors.text.base,
  },
  // variations
  regular: { fontFamily: fonts.Gilroy.regular },
  bold: { fontFamily: fonts.Gilroy.bold },
  medium: { fontFamily: fonts.Gilroy.medium },
  semibold: { fontFamily: fonts.Gilroy.semibold },
  light: { fontFamily: fonts.Gilroy.light },
  lightItalic: { fontFamily: fonts.Gilroy.lightItalic },
  lightUltra: { fontFamily: fonts.Gilroy.lightUltra },
  ubuntu: { fontFamily: fonts.Ubuntu.light },
  trajan: { fontFamily: fonts.Trajan.regular },
  seogoeUI: { fontFamily: fonts.SeogoeUI.light },
  sfDisplay: { fontFamily: fonts.SFProDisplay.regular },
  sfTextRegular: { fontFamily: fonts.SFProText.regular },
  sfTextSemibold: { fontFamily: fonts.SFProText.semibold },
  // position
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
  // colors
  primary: { color: colors.primary },
  secondary: { color: colors.secondary },
  white: { color: colors.white },
  disabled: { color: colors.text.disabled },
  caption: { color: colors.caption },
  // fonts
  h1: fonts.h1,
  h2: fonts.h2,
  header: fonts.header,
  logo: fonts.logo,
  // styles
});
