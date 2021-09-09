import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors, sizes } from '~/src/app/common/constants';
import { IInputStyleProps } from '~/src/app/models/ui';

export const styles = StyleSheet.create<IInputStyleProps>({
  block: {
    borderWidth: 0.8,
    borderRadius: sizes.radius,
    borderColor: colors.input.border,
  },
  input: {
    fontSize: wp(sizes.font.base),
    color: colors.input.text,
    height: hp(sizes.input.big.height),
    paddingHorizontal: wp(sizes.input.paddingHorizontal),
    //paddingTop: isAndroid ? 0 : wp(4),
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: colors.input.border,
  },
});
