import { StyleSheet } from 'react-native';
import { colors } from '~/src/app/common/constants';

export const styles = StyleSheet.create({
  form: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    height: '72%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginVertical: 20,
    borderColor: colors.input.border,
    borderWidth: 1,
    borderRadius: 4,
  },
  nealy: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cityItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderColor: colors.input.border,
    borderWidth: StyleSheet.hairlineWidth,
  },
  citiesList: {
    height: '68%',
  },
});
