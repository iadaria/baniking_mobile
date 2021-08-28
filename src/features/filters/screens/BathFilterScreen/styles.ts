import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors, isIos } from '~/src/app/common/constants';
import { sizes } from '~/src/app/common/constants/sizes';

export const styles = StyleSheet.create({
  sv: {
    flex: 1,
    padding: wp(sizes.offset.base),
  },
  contentScrollStyle: {
    padding: wp(sizes.offset.base),
  },
  button: {
    paddingVertical: wp(0.5),
    paddingHorizontal: wp(3.5),
    backgroundColor: colors.secondary,
    borderRadius: 10,
    overflow: 'hidden',
  },
  border: {
    borderColor: '#414141',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  closeIcon: {
    padding: wp(2),
    backgroundColor: '#121213',
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
  elementSelected: {
    backgroundColor: colors.secondary,
    color: 'white',
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
    height: hp(sizes.input.big.height * (isIos ? 0.65 : 0.8)),
    paddingVertical: wp(1),
    paddingLeft: wp(3),
    borderColor: '#2E2E2E',
    borderRadius: 5,
    fontSize: wp(sizes.font.label),
    color: colors.text.base,
    backgroundColor: '#121213',
  },
  icon: {
    borderWidth: 1,
    borderColor: 'red',
    padding: wp(3),
  },
  toggle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(6),
  },
  slider: {
    /* borderWidth: 1,
    borderColor: 'red', */
  },
  block: {
    flexDirection: 'row',
  },
  backForAcceptButton: {
    position: 'absolute',
    bottom: -wp(sizes.offset.base),
    width: '100%',
    height: 120,
    backgroundColor: colors.primary,
    opacity: 1,
    zIndex: 1,
  },
  filterButton: {
    position: 'absolute',
    bottom: -wp(sizes.offset.base),
    left: wp(sizes.offset.base),
    right: wp(sizes.offset.base),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    zIndex: 2,
  },
});
