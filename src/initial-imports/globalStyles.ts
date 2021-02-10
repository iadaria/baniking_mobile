import * as globalProps from 'react-native-global-props';
import { colors, fonts } from '~/src/app/common/constants';

const customTextProps = {
  style: {
    fontFamily: fonts.Gilroy.regular,
    color: colors.text,
  },
};

globalProps.setCustomText(customTextProps);
globalProps.setCustomTextInput(customTextProps);
