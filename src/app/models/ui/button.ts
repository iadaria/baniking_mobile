import { ReactNode, RefObject } from 'react';
import { TouchableOpacityProps, TouchableOpacity } from 'react-native';

export interface IUiButton extends TouchableOpacityProps {
  opacity?: number;
  shadow?: boolean;
  color?: string;
  style?: object;
  // colors
  white?: boolean;
  children?: ReactNode;
  newRef?: RefObject<TouchableOpacity>;
  //[key: string]: any;
  // native
}
