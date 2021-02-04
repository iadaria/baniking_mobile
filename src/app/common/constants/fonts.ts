import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { sizes } from './sizes';

export const fonts = {
  Gilroy: {
    bold: 'Gilroy-Bold',
    light: 'Gilroy-Light',
    lightItalic: 'Gilroy-LightItalic',
    medium: 'Gilroy-Medium',
    regular: 'Gilroy-Regular',
    lightUltra: 'Gilroy-UltraLight',
  },
  Ubuntu: {
    light: 'Ubuntu-Light',
  },
  Trajan: {
    regular: 'TrajanPro3-Regular',
  },
  SeogoeUI: {
    light: 'SegoeUI-Light',
  },
  SFProDisplay: {
    regular: 'SFProDisplay-Regular',
  },
  SFProText: {
    regular: 'SFProText-Regular',
    semibold: 'SFProText-Semibold',
  },
  base: {
    fontSize: wp(sizes.font),
  },
  h1: {
    fontSize: wp(sizes.h1),
  },
  header: {
    fontSize: wp(sizes.header),
  },
  logo: {
    fontSize: wp(sizes.logo),
  },
};
