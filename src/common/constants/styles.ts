import { Platform } from 'react-native';

export const shadow = {
  ...Platform.select({
    ios: {
      shadowColor: '#919191',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.62,
      shadowRadius: 2.22,
    },
    android: {
      elevation: 3,
    },
  }),
};
