import { ReactNode } from 'react';
import { TouchableOpacityProps } from 'react-native';

export interface IUiButton extends TouchableOpacityProps {
  opacity?: number;
  shadow?: boolean;
  color?: string;
  style?: object;
  // colors
  white?: boolean;
  children?: ReactNode;
  //[key: string]: any;
}
