import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { EyeIcon, EyeOpenedIcon } from '~/src/assets';
import { sizes } from '~/src/app/common/constants';

interface IProps {
  secure: boolean;
  rightLabel?: JSX.Element;
  toggleSecure: boolean;
  setToggleSecure: (secure: boolean) => void;
}

export function AppSecure(props: IProps) {
  const { secure, toggleSecure, setToggleSecure } = props;

  if (!secure) {
    return null;
  }

  function renderIcon() {
    return toggleSecure ? <EyeOpenedIcon style={{ marginTop: 2 }} /> : <EyeIcon />;
  }

  return (
    <TouchableOpacity style={styles.toggle} onPress={() => setToggleSecure(!toggleSecure)}>
      {renderIcon()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  toggle: {
    position: 'absolute',
    alignItems: 'flex-end',
    top: wp(sizes.input.hight / 1.5),
    right: wp(sizes.input.paddingHorizontal),
  },
});
