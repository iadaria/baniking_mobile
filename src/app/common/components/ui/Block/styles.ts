import { StyleSheet } from 'react-native';
import { IBlockStyleProps } from '~/src/app/models/ui';
import { colors, sizes } from '~/src/app/common/constants';

export const styles = StyleSheet.create<IBlockStyleProps>({
  block: {
    flex: 1, //borderWidth: 1, borderColor: 'red'
  },
  debug: {
    borderWidth: 0.5,
    borderColor: 'red',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  card: {
    borderRadius: sizes.radius,
  },
  center: {
    alignItems: 'center',
  },
  middle: {
    justifyContent: 'center',
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
  },
  top: {
    justifyContent: 'flex-start',
  },
  bottom: {
    justifyContent: 'flex-end',
  },
  wrap: {
    flexWrap: 'wrap',
  },
  // custome styles
  shadow: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 13,
    elevation: 2,
  },
  // custome styles
  underline: {
    height: 1,
    backgroundColor: colors.secondary,
    bottom: -7,
  },
  // colors
  primary: { backgroundColor: colors.primary },
  white: { backgroundColor: colors.white },
});
