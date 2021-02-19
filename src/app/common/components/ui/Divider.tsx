import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { colors, sizes } from '../../constants';
import { Block } from './Block';

interface IProps {
  color: string;
  style: object;
  height: number;
  [key: string]: any;
}

export function Divider(props: Partial<IProps>) {
  const { color, style, height, ...otherProps } = props;
  const dividerStyles: StyleProp<ViewStyle> = [styles.divider, !!height && { height: height }, style];

  return <Block color={color || colors.divider} style={dividerStyles} {...otherProps} />;
}

export const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: '100%',
    alignSelf: 'center',
    margin: sizes.offset.base * 1.9, // 2
    borderBottomColor: colors.divider,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
