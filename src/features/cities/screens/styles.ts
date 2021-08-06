import { StyleSheet } from 'react-native';
import { colors } from '~/src/app/common/constants';

export const styles = StyleSheet.create({
  form: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  item: {
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
});
