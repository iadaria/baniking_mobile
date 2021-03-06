import React from 'react';
import { Animated, View, StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { IUiBlock } from '~/src/app/models/ui';
import { sizes } from '~/src/app/common/constants';
import { handleMargins, handlePaddings } from '~/src/app/utils/ui';
import { styles } from './styles';

export function Block(props: IUiBlock) {
  const {
    full,
    flex,
    debug,
    content,
    base,
    row,
    column,
    center,
    middle,
    left,
    right,
    top,
    bottom,
    color,
    space,
    // offers
    padding,
    margin,
    animated,
    // styles
    wrap,
    // colors
    white,
    // custome styles
    underline,
    card,
    shadow,
    safe,
    // others
    style,
    children,
    ...otherProps
  } = props;

  const blockStyles = [
    full && styles.block,
    !full && { flex: 0 },
    flex && { flex },
    debug && styles.debug,
    content && { flex: 0 }, // reset - disable flex
    base && {
      // paddingVertical: wp(sizes.offset.base),
      paddingVertical: wp(sizes.offset.base),
      paddingHorizontal: wp(sizes.offset.base),
      // paddingBottom: hp(sizes.footerBottom),
    },
    row && styles.row,
    column && styles.column,
    center && styles.center,
    middle && styles.middle,
    left && styles.left,
    right && styles.right,
    top && styles.top,
    bottom && styles.bottom,
    margin && { ...handleMargins(margin) },
    padding && { ...handlePaddings(padding) },
    card && styles.card,
    shadow && styles.shadow,
    space && { justifyContent: `space-${space}` },
    wrap && styles.wrap,
    // colors
    white && styles.white,
    // section && styles.section,
    // color && styles[color as keyof typeof styles],
    color && { backgroundColor: color },
    // custome styles
    underline && styles.underline,
    // others
    style,
  ] as StyleProp<ViewStyle>;

  if (animated) {
    return (
      <Animated.View style={blockStyles} {...otherProps}>
        {children}
      </Animated.View>
    );
  }

  if (safe) {
    return (
      <SafeAreaView style={blockStyles} {...otherProps}>
        {children}
      </SafeAreaView>
    );
  }

  return (
    <View style={blockStyles} {...otherProps}>
      {children}
    </View>
  );
}

/* <ImageBackground source={image} style={{ flex: 1, resizeMode: 'cover' }}>
  <Text>Test</Text>
  <TotalPointScores />
</ImageBackground>; */
