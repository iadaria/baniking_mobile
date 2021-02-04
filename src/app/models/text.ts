import { ReactNode } from 'react';

export interface IUiText {
  // size
  h1?: boolean;
  header?: boolean;
  logo?: boolean;
  size?: number;
  // style
  transform?: boolean;
  align?: boolean;
  // font famil?: boolean;
  regular?: boolean;
  medium?: boolean;
  bold?: boolean;
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
  center?: boolean;
  right?: boolean;
  spacing?: boolean; // letter-spacin?: boolean;
  height?: boolean; // line-heigh?: boolean;
  capitalize?: boolean;
  style?: object;
  children?: ReactNode;
  [key: string]: any;
}

export interface ITextStyleProps {
  tertiary?: object;
  text: object;
  regular: object;
  bold: object;
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
  // fonts
  h1: object;
  header: object;
  logo: object;
}
