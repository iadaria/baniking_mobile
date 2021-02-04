import { DefaultTheme } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';
import { Dimensions, StyleProp, ViewStyle } from 'react-native';
import { colors } from '~/app/common/constants';
const { width } = Dimensions.get('window');

export const defaultScreenOptions: StackNavigationOptions = {
  // headerTransparent: true,
  // headerShown: true,
  headerStyle: {
    // backgroundColor: colors.primary,
    // backgroundColor: 'transparent',
    // opacity: 1,
    shadowColor: 'transparent', // delete the bottomBorder for IOS
  },
  headerTitleAlign: 'left', // for IOS to full widht
  // headerTintColor: colors.white,
};

export const defaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    card: colors.primary,
    primary: colors.primary,
    background: colors.primary,
  },
};

export const drawerStyle: StyleProp<ViewStyle> = {
  backgroundColor: colors.primary,
  width,
};
