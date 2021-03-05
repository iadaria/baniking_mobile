import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { IUiMargin, IUiPadding } from '~/src/app/models/ui';

export function handleMargins(margin: number | number[]): IUiMargin {
  if (typeof margin === 'number') {
    return {
      marginTop: hp(margin),
      marginRight: wp(margin),
      marginBottom: hp(margin),
      marginLeft: wp(margin),
    };
  }

  if (typeof margin === 'object') {
    const marginSize = Object.keys(margin).length;
    switch (marginSize) {
      case 1:
        return {
          marginTop: hp(margin[0]),
          marginRight: wp(margin[0]),
          marginBottom: hp(margin[0]),
          marginLeft: wp(margin[0]),
        };
      case 2:
        return {
          marginTop: hp(margin[0]),
          marginRight: wp(margin[1]),
          marginBottom: hp(margin[0]),
          marginLeft: wp(margin[1]),
        };
      case 3:
        return {
          marginTop: hp(margin[0]),
          marginRight: wp(margin[1]),
          marginBottom: hp(margin[2]),
          marginLeft: wp(margin[1]),
        };
      default:
        return {
          marginTop: hp(margin[0]),
          marginRight: wp(margin[1]),
          marginBottom: hp(margin[2]),
          marginLeft: wp(margin[3]),
        };
    }
  }
  return {};
}

export function handlePaddings(padding: number | number[]): IUiPadding {
  if (typeof padding === 'number') {
    return {
      paddingTop: hp(padding),
      paddingRight: wp(padding),
      paddingBottom: hp(padding),
      paddingLeft: wp(padding),
    };
  }

  if (typeof padding === 'object') {
    const paddingSize = Object.keys(padding).length;
    switch (paddingSize) {
      case 1:
        return {
          paddingTop: hp(padding[0]),
          paddingRight: wp(padding[0]),
          paddingBottom: hp(padding[0]),
          paddingLeft: wp(padding[0]),
        };
      case 2:
        return {
          paddingTop: hp(padding[0]),
          paddingRight: wp(padding[1]),
          paddingBottom: hp(padding[0]),
          paddingLeft: wp(padding[1]),
        };
      case 3:
        return {
          paddingTop: hp(padding[0]),
          paddingRight: wp(padding[1]),
          paddingBottom: hp(padding[2]),
          paddingLeft: wp(padding[1]),
        };
      default:
        return {
          paddingTop: hp(padding[0]),
          paddingRight: wp(padding[1]),
          paddingBottom: hp(padding[2]),
          paddingLeft: wp(padding[3]),
        };
    }
  }
  return {};
}
