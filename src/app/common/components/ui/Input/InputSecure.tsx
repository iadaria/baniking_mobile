import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { EyeIcon, EyeOpenedIcon } from '~/src/assets';
import { sizes, WIDTH_EYE_BUTTON } from '~/src/app/common/constants';

interface IProps {
  secure: boolean;
  rightLabel?: JSX.Element;
  toggleSecure: boolean;
  setToggleSecure: (secure: boolean) => void;
}

export function InputSecure(props: IProps) {
  const { secure, toggleSecure, setToggleSecure } = props;

  if (!secure) {
    return null;
  }

  function renderIcon() {
    return toggleSecure ? <EyeOpenedIcon /> : <EyeIcon />;
  }

  return (
    <TouchableOpacity
      style={styles.toggle}
      onPress={() => setToggleSecure(!toggleSecure)}>
      {renderIcon()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  toggle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(WIDTH_EYE_BUTTON),
    height: hp(sizes.input.big.height),
    /* borderWidth: 1,
    borderColor: 'blue', */
  },
});
