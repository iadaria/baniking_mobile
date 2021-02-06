import { DefaultTheme } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';
import { Dimensions, StyleProp, ViewStyle } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '~/app/common/constants';
import { sizes } from '../app/common/constants/sizes';

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

export const appDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    card: colors.primary,
    primary: colors.primary,
    background: colors.primary,
  },
};

export const appDrawerStyle: StyleProp<ViewStyle> = {
  width,
  paddingVertical: hp(sizes.base / 3), // TODO depend on android version
  paddingHorizontal: wp(sizes.base - 3),
  backgroundColor: colors.primary,
};

export const appDrawerItemStyle: StyleProp<ViewStyle> = {
  marginBottom: hp(1.25),
};
