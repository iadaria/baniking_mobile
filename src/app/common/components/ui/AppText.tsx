import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors, fonts, sizes } from '~/app/common/constants';

export function AppText(props: any) {
  const {
    h1,
    h2,
    h3,
    title,
    body,
    header,
    caption,
    big,
    // small,
    size,
    transform,
    align,
    // styling
    regular,
    bold,
    semibold,
    weight,
    light,
    center,
    right,
    spacing, // letter-spacing
    height, // line-height
    capitalize,
    // colors
    color,
    accent,
    primary,
    secondary,
    // tertiary,
    black,
    white,
    gray,
    gray2,
    children,
    style,
    disabled,
    ...otherProps
  } = props;

  // console.log('*** children', children);

  const textStyles = [
    styles.text,
    h1 && styles.h1,
    h2 && styles.h2,
    h3 && styles.h3,
    title && styles.title,
    header && styles.header,
    body && styles.body,
    caption && styles.caption,
    big && styles.big,
    // small && styles.small,
    size && { fontSize: size },
    transform && { textTransform: transform },
    align && { textAlign: align },
    height && { lineHeight: height },
    spacing && { letterSpacing: spacing },
    weight && { fontWeight: weight },
    regular && styles.regular,
    bold && styles.bold,
    semibold && styles.semibold,
    light && styles.light,
    center && styles.center,
    right && styles.right,
    color && styles[color as keyof typeof styles],
    color && !styles[color as keyof typeof styles] && { color },
    // color shortcuts
    accent && styles.accent,
    primary && styles.primary,
    secondary && styles.secondary,
    // tertiary && styles.tertiary,
    black && styles.black,
    white && styles.white,
    gray && styles.gray,
    gray2 && styles.gray2,
    style, // rewrite predefined styles
    disabled && styles.gray,
  ];

  return (
    <Text style={textStyles} {...otherProps}>
      {capitalize && typeof children === 'string'
        ? children.toUpperCase()
        : children}
    </Text>
  );
}

const styles = StyleSheet.create({
  // default style
  text: {
    fontSize: wp(sizes.font),
    color: colors.text,
  },
  // variations
  bold: {
    // fontWeight: 'bold',
    fontFamily: fonts.G
  },
  black: {
    fontFamily: 'Montserrat-Black',
  },
  light: {
    fontFamily: 'Montserrat-Light',
  },
  semibold: {
    fontWeight: '500',
  },
  // position
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
  // colors
  // accent: { color: colors.accent },
  primary: { color: colors.primary },
  secondary: { color: colors.secondary },
  // tertiary: { color: colors.tertiary },
  // black: { color: colors.black },
  white: { color: colors.white },
  /* gray: { color: colors.gray },
  gray2: { color: colors.gray2 }, */
  // fonts
  h1: fonts.h1,
  /* h2: fonts.h2,
  h3: fonts.h3,
  big: fonts.big,
  title: fonts.title,
  header: fonts.header,
  body: fonts.body,
  caption: fonts.caption, */
  //small: fonts.small
});
