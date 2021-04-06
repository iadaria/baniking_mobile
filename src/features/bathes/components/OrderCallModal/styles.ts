import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { windowWidth, multiplier, windowHeight } from '~/src/app/common/constants';

export const styles = StyleSheet.create({
  modalView: {
    //flexGrow: 1,
    //position: 'relative',
    //marginTop: (windowHeight / 100) * 10 * multiplier,
    //flex: 1,
    position: 'absolute',
    top: wp(20),
    width: windowWidth - wp(19),
    alignSelf: 'center',
    //marginTop: (windowHeight / 100) * 10 * multiplier,
    // paddingTop: (windowHeight / 100) * 10 * multiplier,
    borderColor: 'green',
    borderWidth: 1,
  },
  closeIcon: {
    alignItems: 'center',
  },
  modal: {
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
  }
});
