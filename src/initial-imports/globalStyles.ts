// import { setCustomTextInput, setCustomText } from 'react-native-global-props';
import * as globalProps from 'react-native-global-props';
import { fonts } from '../common/constants/fonts';

const customTextProps = {
  style: {
    fontFamily: fonts.regular,
  },
};

globalProps.setCustomText(customTextProps);
globalProps.setCustomTextInput(customTextProps);
