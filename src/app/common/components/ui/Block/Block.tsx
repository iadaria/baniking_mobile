import React from 'react';
import { Animated, View, StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { IUiBlock } from '~/src/app/models/ui';
import { sizes } from '~/src/app/common/constants';
import { handleMargins, handlePaddings } from '~/src/app/utils/ui';
import { styles } from './styles';

type ViewKinds = {
  Animated: React.ReactNode;
  Safe: React.ReactNode;
  Regular: React.ReactNode;
};

const viewKinds: ViewKinds = {
  Animated: Animated.View,
  Safe: SafeAreaView,
  Regular: View,
};

export function Block<T>(props: IUiBlock<T>) {
  const {
    animated,
    base,
    bottom,
    card,
    center,
    children,
    color,
    column,
    content,
    debug,
    flex,
    full,
    left,
    margin,
    middle,
    padding,
    right,
    row,
    safe,
    shadow,
    space,
    style,
    top,
    underline,
    white,
    wrap,
    ...otherProps
  } = props;

  const blockStyles = [
    full && styles.block,
    !full && { flex: 0 },
    flex && { flex },
    debug && styles.debug,
    content && { flex: 0 }, // reset - disable flex
    base && { padding: wp(sizes.offset.base) },
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
    white && styles.white,
    color && { backgroundColor: color },
    underline && styles.underline,
    style,
  ] as StyleProp<ViewStyle>;

  const kind: keyof ViewKinds = safe
    ? 'Safe'
    : animated
      ? 'Animated'
      : 'Regular';
  const ViewComponent = viewKinds[kind] as React.ElementType;

  return (
    <ViewComponent style={blockStyles} {...otherProps}>
      {children}
    </ViewComponent>
  );
}

/* <ImageBackground source={image} style={{ flex: 1, resizeMode: 'cover' }}>
  <Text>Test</Text>
  <TotalPointScores />
</ImageBackground>; */
