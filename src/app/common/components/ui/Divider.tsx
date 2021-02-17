import React from 'react';
import { StyleSheet } from 'react-native';
import { colors, sizes } from '../../constants';;
import { Block } from './Block';

export function Divider(props) {
  const { color, style, ...otherProps } = props;
  const dividerStyles = [styles.divider, style];

  return <Block color={color || colors.divider} style={dividerStyles} {...otherProps} />;
}

export const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: '100%',
    alignSelf: 'center',
    margin: sizes.offset.base * 2,
    borderBottomColor: colors.divider,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
