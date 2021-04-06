import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { windowWidth, multiplier, isIos } from '~/src/app/common/constants';

export const styles = StyleSheet.create({
  modalView: {
    padding: wp(10),
  },
  absolute: {
    position: 'absolute',
    opacity: isIos ? 0.95 : 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  blurImage: {
    width: windowWidth,
    position: 'absolute',
    top: 0,
  },
  closeIcon: {
    alignItems: 'center',
  },
  modal: {
    flexGrow: 1,
    paddingTop: wp(7),
    paddingBottom: wp(3),
    paddingHorizontal: wp(5),
    marginTop: wp(5) * multiplier,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  label: {
    position: 'absolute',
    top: -wp(2.5),
    left: wp(2),
    backgroundColor: 'white',
    paddingHorizontal: wp(2),
  },
  element: {
    paddingHorizontal: wp(4),
    paddingVertical: wp(3.5),
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 6,
  },
  item: {
    backgroundColor: 'white',
    padding: wp(5),
  },
});
