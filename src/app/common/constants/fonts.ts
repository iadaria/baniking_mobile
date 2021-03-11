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
    semibold: 'Gilroy-SemiBold',
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
    fontSize: wp(sizes.font.base),
  },
  h1: {
    fontSize: wp(sizes.font.h1),
  },
  h2: {
    fontSize: wp(sizes.font.h2),
  },
  header: {
    fontSize: wp(sizes.font.header),
  },
  logo: {
    fontSize: wp(sizes.font.logo),
  },
  caption: {
    fontSize: wp(sizes.font.caption),
  },
  tag: {
    fontSize: wp(sizes.font.tag),
  },
};
