import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors, isIos, sizes, windowWidth } from '~/src/app/common/constants';

export const styles = StyleSheet.create({
  divider: {
    borderBottomColor: 'rgba(112, 112, 112, 0.5)',
    backgroundColor: 'transparent',
    opacity: isIos ? 0.5 : 1,
    padding: 0,
    margin: 0,
  },
  modalView: {
    width: windowWidth - wp(19),
    alignSelf: 'center',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    // padding: wp(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  item: {
    padding: sizes.offset.base * 1.9,
  },
  activeStyle: {
    backgroundColor: 'rgba(217, 179, 132, 0.3)',
  },
  end: {
    borderBottomLeftRadius: 10,
    borderBottomEndRadius: 10,
  },
});
