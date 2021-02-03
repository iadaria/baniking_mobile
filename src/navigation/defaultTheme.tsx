import { DefaultTheme } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';
import { colors } from '~/app/common/constants';

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
