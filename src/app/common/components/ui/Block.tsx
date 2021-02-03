import React from 'react';
import { StyleSheet, Animated, View, StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
  IBlockStyleProps,
  IUiBlock,
  IUiMargin,
  IUiPadding,
} from '../../../models/ui';
import { colors, sizes } from '@constants';

export function Block(props: IUiBlock) {
  function handleMargins(): IUiMargin {
    const { margin } = props;

    if (typeof margin === 'number') {
      return {
        marginTop: wp(margin),
        marginRight: wp(margin),
        marginBottom: wp(margin),
        marginLeft: wp(margin),
      };
    }

    if (typeof margin === 'object') {
      const marginSize = Object.keys(margin).length;
      switch (marginSize) {
        case 1:
          return {
            marginTop: wp(margin[0]),
            marginRight: wp(margin[0]),
            marginBottom: wp(margin[0]),
            marginLeft: wp(margin[0]),
          };
        case 2:
          return {
            marginTop: wp(margin[0]),
            marginRight: wp(margin[1]),
            marginBottom: wp(margin[0]),
            marginLeft: wp(margin[1]),
          };
        case 3:
          return {
            marginTop: wp(margin[0]),
            marginRight: wp(margin[1]),
            marginBottom: wp(margin[2]),
            marginLeft: wp(margin[1]),
          };
        default:
          return {
            marginTop: wp(margin[0]),
            marginRight: wp(margin[1]),
            marginBottom: wp(margin[2]),
            marginLeft: wp(margin[3]),
          };
      }
    }
    return {};
  }

  function handlePaddings(): IUiPadding {
    const { padding } = props;
    if (typeof padding === 'number') {
      return {
        paddingTop: wp(padding),
        paddingRight: wp(padding),
        paddingBottom: wp(padding),
        paddingLeft: wp(padding),
      };
    }

    if (typeof padding === 'object') {
      const paddingSize = Object.keys(padding).length;
      switch (paddingSize) {
        case 1:
          return {
            paddingTop: wp(padding[0]),
            paddingRight: wp(padding[0]),
            paddingBottom: wp(padding[0]),
            paddingLeft: wp(padding[0]),
          };
        case 2:
          return {
            paddingTop: wp(padding[0]),
            paddingRight: wp(padding[1]),
            paddingBottom: wp(padding[0]),
            paddingLeft: wp(padding[1]),
          };
        case 3:
          return {
            paddingTop: wp(padding[0]),
            paddingRight: wp(padding[1]),
            paddingBottom: wp(padding[2]),
            paddingLeft: wp(padding[1]),
          };
        default:
          return {
            paddingTop: wp(padding[0]),
            paddingRight: wp(padding[1]),
            paddingBottom: wp(padding[2]),
            paddingLeft: wp(padding[3]),
          };
      }
    }
    return {};
  }

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
    card,
    shadow,
    safe,
    color,
    space,
    padding,
    margin,
    animated,
    wrap,
    primary,
    // colors
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
    base && { padding: wp(sizes.padding) },
    row && styles.row,
    column && styles.column,
    center && styles.center,
    middle && styles.middle,
    left && styles.left,
    right && styles.right,
    top && styles.top,
    bottom && styles.bottom,
    margin && { ...handleMargins() },
    padding && { ...handlePaddings() },
    card && styles.card,
    shadow && styles.shadow,
    space && { justifyContent: `space-${space}` },
    wrap && { flexWrap: 'wrap' },
    // colors
    // section && styles.section,
    color && styles[color as keyof typeof styles], // predefined styles for backgroundColor
    primary && styles.primary,
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

export const styles = StyleSheet.create<IBlockStyleProps>({
  block: {
    flex: 1, //borderWidth: 1, borderColor: 'red'
  },
  debug: {
    borderWidth: 1,
    borderColor: 'red',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  card: {
    borderRadius: sizes.radius,
  },
  center: {
    alignItems: 'center',
  },
  middle: {
    justifyContent: 'center',
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
  },
  top: {
    justifyContent: 'flex-start',
  },
  bottom: {
    justifyContent: 'flex-end',
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 13,
    elevation: 2,
  },
  // custome styles
  /* section: {
    backgroundColor: colors.section,
    marginTop: wp(0.2),
    padding: wp(sizes.padding),
    justifyContent: 'space-between',
  }, */

  // colors
  primary: { backgroundColor: colors.primary },
});
