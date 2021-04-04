import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { windowWidth, multiplier } from '~/src/app/common/constants';

export const styles = StyleSheet.create({
  modalView: {
    position: 'relative',
    width: windowWidth - wp(19),
    alignSelf: 'center',
    margin: 20,
    marginTop: wp(40),
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
  },
  closeIcon: {
    alignItems: 'center',
  },
  modal: {
    padding: wp(7),
    paddingHorizontal: wp(5),
    marginTop: wp(10) * multiplier,
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
});