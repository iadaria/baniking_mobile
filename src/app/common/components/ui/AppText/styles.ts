import { StyleSheet } from 'react-native';
import { ITextStyleProps } from '~/src/app/models/ui/text';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors, fonts, sizes } from '~/src/app/common/constants';

export const styles = StyleSheet.create<ITextStyleProps>({
  // default style
  text: {
    fontSize: wp(sizes.font.base),
    color: colors.text.base,
  },
  // variations
  regular: { fontFamily: fonts.Gilroy.regular },
  bold: { fontFamily: fonts.Gilroy.bold },
  medium: { fontFamily: fonts.Gilroy.medium },
  semibold: { fontFamily: fonts.Gilroy.semibold },
  light: { fontFamily: fonts.Gilroy.light },
  lightItalic: { fontFamily: fonts.Gilroy.lightItalic },
  lightUltra: { fontFamily: fonts.Gilroy.lightUltra },
  ubuntu: { fontFamily: fonts.Ubuntu.light },
  trajan: { fontFamily: fonts.Trajan.regular },
  seogoeUI: { fontFamily: fonts.SeogoeUI.light },
  sfDisplay: { fontFamily: fonts.SFProDisplay.regular },
  sfTextRegular: { fontFamily: fonts.SFProText.regular },
  sfTextSemibold: { fontFamily: fonts.SFProText.semibold },
  // position
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
  left: { alignSelf: 'flex-start' },
  // colors
  primary: { color: colors.primary },
  secondary: { color: colors.secondary },
  white: { color: colors.white },
  disabled: { color: colors.text.disabled },
  caption: { color: colors.caption },
  // fonts
  h1: fonts.h1,
  h2: fonts.h2,
  header: fonts.header,
  logo: fonts.logo,
  // styles
  debug: {
    borderWidth: 1,
    borderColor: 'blue',
  },
});
