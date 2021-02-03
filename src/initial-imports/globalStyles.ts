import * as globalProps from 'react-native-global-props';
import { fonts } from '~/app/common/constants/fonts';

const customTextProps = {
  style: {
    fontFamily: fonts.Gilroy.regular,
  },
};

globalProps.setCustomText(customTextProps);
globalProps.setCustomTextInput(customTextProps);
