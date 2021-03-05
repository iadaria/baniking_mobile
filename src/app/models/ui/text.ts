import { ReactNode } from 'react';
import { TextProps, TextStyle } from 'react-native';

export interface IUiText extends TextProps {
  // size
  h1?: boolean;
  h2?: boolean;
  header?: boolean;
  logo?: boolean;
  caption?: boolean;
  size?: number;
  // font famil?: boolean;
  regular?: boolean;
  medium?: boolean;
  bold?: boolean;
  semibold?: boolean;
  ubuntu?: boolean;
  weight?: boolean;
  light?: boolean;
  lightItalic?: boolean;
  lightUltra?: boolean;
  trajan?: boolean;
  seogoeUI?: boolean;
  sfDisplay?: boolean;
  sfTextRegular?: boolean;
  sfTextSemibold?: boolean;
  // View props
  padding?: number | number[];
  margin?: number | number[];
  // align
  // colors
  disabled?: boolean;
  white?: boolean;
  primary?: boolean;
  secondary?: boolean;
  // style
  debug?: boolean;
  transform?: string;
  align?: boolean;
  center?: boolean;
  right?: boolean;
  left?: boolean;
  spacing?: number; // letter-spacin?: boolean;
  height?: number; // line-heigh?: boolean;
  necessary?: boolean;
  style?: TextStyle;
  children?: ReactNode;
  color?: string;
  // [key: string]: any;
}

export interface ITextStyleProps {
  tertiary?: object;
  text: object;
  regular: object;
  bold: object;
  semibold: object;
  medium: object;
  light: object;
  lightItalic: object;
  lightUltra: object;
  ubuntu: object;
  trajan: object;
  seogoeUI: object;
  sfDisplay: object;
  sfTextRegular: object;
  sfTextSemibold: object;
  // position
  center: object;
  right: object;
  left: object;
  // colors
  primary: object;
  secondary: object;
  white: object;
  disabled: object;
  // fonts
  h1: object;
  h2: object;
  header: object;
  logo: object;
  caption: object;
  // styles
  debug: object;
}
