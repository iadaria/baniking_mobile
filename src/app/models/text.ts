import { ReactNode } from 'react';
import { TextProps } from 'react-native';

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
  // align
  // colors
  disabled?: boolean;
  white?: boolean;
  primary?: boolean;
  secondary?: boolean;
  // style
  transform?: string;
  align?: boolean;
  center?: boolean;
  right?: boolean;
  spacing?: boolean; // letter-spacin?: boolean;
  height?: boolean; // line-heigh?: boolean;
  necessary?: boolean;
  style?: object;
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
}
