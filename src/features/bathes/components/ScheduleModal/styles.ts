import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { windowWidth, multiplier, windowHeight } from '~/src/app/common/constants';

__DEV__ && console.log('[ScheduleModal Height]', windowHeight);

export const styles = StyleSheet.create({
  modalView: {
    position: 'relative',
    width: windowWidth - wp(19),
    alignSelf: 'center',
    marginTop: (windowHeight / 100) * 10 * multiplier,
  },
  closeIcon: {
    alignItems: 'center',
  },
  modal: {
    paddingTop: wp(7),
    paddingBottom: wp(3),
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
