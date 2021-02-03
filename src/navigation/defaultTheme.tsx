import { DefaultTheme } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';
import { Dimensions, StyleProp, ViewStyle } from 'react-native';
import { colors } from '~/app/common/constants';

const { width } = Dimensions.get('window');

export const defaultScreenOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.primary,
  },
  // headerTintColor: colors.white,
  // headerTitleAlign: "center"
};

export const defaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.primary,
  },
};

export const drawerStyle: StyleProp<ViewStyle> = {
  backgroundColor: colors.primary,
  width,
};
