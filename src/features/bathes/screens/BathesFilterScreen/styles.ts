import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '~/src/app/common/constants';
import { sizes } from '~/src/app/common/constants/sizes';

export const styles = StyleSheet.create({
  button: {
    paddingHorizontal: wp(3.5),
    backgroundColor: colors.secondary,
    borderRadius: 10,
  },
  border: {
    borderColor: '#414141',
    borderWidth: 1,
    borderRadius: 10,
  },
  element: {
    backgroundColor: '#121213',
    paddingVertical: wp(2.2),
    paddingHorizontal: wp(3.5),
    borderRadius: sizes.radius,
    alignSelf: 'flex-start',
    marginRight: wp(1),
    marginBottom: wp(1),
    overflow: 'hidden',
  },
  input: {
    width: wp(14),
    color: colors.text.base,
    fontSize: wp(sizes.font.label),
    paddingLeft: wp(3),
    borderRadius: 5,
    backgroundColor: '#121213',
    height: hp(sizes.input.big.height * 0.9),
  },
  icon: {
    borderWidth: 1,
    borderColor: 'red',
    padding: wp(3),
  },
  toggle: {
    justifyContent: 'center',
    alignItems: 'center',
    right: -1,
    top: -1,
    width: wp(8),
    height: hp(sizes.input.big.height * 0.9),
  },
  slider: {
    /* borderWidth: 1,
    borderColor: 'red', */
  },
  block: {
    flexDirection: 'row',
  }
});
