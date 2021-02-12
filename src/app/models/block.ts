import { ReactNode } from 'react';
import { ViewProps, ViewStyle } from 'react-native';

export interface IUiBlock extends ViewProps {
  full?: boolean;
  flex?: number;
  debug?: boolean;
  content?: boolean;
  base?: boolean;
  row?: boolean;
  column?: string;
  center?: boolean;
  middle?: boolean;
  left?: boolean;
  right?: boolean;
  top?: string;
  bottom?: boolean;
  card?: boolean;
  shadow?: boolean;
  color?: string;
  space?: string;
  safe?: boolean;
  padding?: number | number[];
  margin?: number | number[];
  animated?: boolean;
  wrap?: boolean;
  // custome style
  underline?: boolean;
  style?: ViewStyle;
  // colors
  white?: boolean;
  children?: ReactNode;
  // [key: string]: any;
}

export interface IUiMargin {
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

export interface IUiPadding {
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
}

export interface IBlockStyleProps {
  block: object;
  debug: object;
  row: object;
  column: object;
  card: object;
  center: object;
  middle: object;
  left: object;
  right: object;
  top: object;
  bottom: object;
  shadow: object;
  wrap: object;

  // custome styles
  underline: object;

  primary: object;
  white: object;
  secondary?: object;
  tertiary?: object;
}

export interface IUiColor {
  // accent?: string;
  primary?: string;
  secondary?: string;
  tertiary?: string;
  black?: string;
  white?: string;
}

export interface IUiInput {
  label?: string;
  error?: boolean;
  secure?: boolean;
  rightLabel?: JSX.Element;
  rightStyle?: object;
  onRightPress?: Function;
  email?: boolean;
  phone?: boolean;
  number?: boolean;
  style?: object;
  children?: ReactNode;
  [key: string]: any;
}
