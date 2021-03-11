import React from 'react';
import { Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { IUiText } from '~/src/app/models/ui';
import { handleMargins, handlePaddings } from '~/src/app/utils/ui';
import { styles } from './styles';

export function AppText(props: IUiText) {
  const {
    // style
    transform,
    spacing, // letter-spacing
    height, // line-height
    margin,
    padding,
    // necessary,
    // align
    align,
    center,
    right,
    left,
    //size
    h1,
    h2,
    header,
    logo,
    caption,
    tag,
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
    // custome style
    debug,
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
    tag && styles.tag,
    // small && styles.small,
    size && { fontSize: wp(size) },
    transform && { textTransform: transform },
    align && { textAlign: align },
    height && { lineHeight: height },
    spacing && { letterSpacing: spacing },
    weight && { fontWeight: weight },
    margin && { ...handleMargins(margin) },
    padding && { ...handlePaddings(padding) },
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
    left && styles.left,
    // colors
    color && styles[color as keyof typeof styles],
    color && !styles[color as keyof typeof styles] && { color },
    // color shortcuts
    // accent && styles.accent,
    primary && styles.primary,
    secondary && styles.secondary,
    // tertiary && styles.tertiary,
    // custome style
    debug && styles.debug,
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
