import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { closeWhiteCircle } from '~/src/assets';
import { Block, AppText } from '~/src/app/common/components/UI';

import styles from './styles';
import { colors, sizes } from '~/src/app/common/constants';

interface Props {
  message: {
    message: string;
    onPress?: () => void;
    status?: string;
  };
  onClick: () => void;
}

export function InfoMessage({ onClick, message }: Props) {
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={[styles.container, styles.gold]}>
        <Text style={[styles.message]}>{message.message}</Text>
        {message.status && <Text style={styles.status}>{message.status}</Text>}
        <TouchableOpacity onPress={onClick}>
          {/* hide(); console.log('internalState', internalState);  */}
          <Image style={styles.closeImg} source={closeWhiteCircle} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export function InfoError({ onClick, message }: Props) {
  return (
    <TouchableOpacity
      onPress={() => {
        // if (typeof message.onPress !== 'undefined') { message.onPress(); }
        onClick();
      }}>
      {/* <View style={[styles.container, styles.error]}> */}
      <Block
        style={newStyle.container}
        center
        margin={[3, sizes.offset.base, 0]}
        padding={[2, 1]}
        color={colors.error}>
        <Text style={[styles.message, styles.errorText]}>{message.message}</Text>
        <TouchableOpacity style={newStyle.OK} onPress={onClick}>
          {/* <Image style={styles.closeImg} source={closeWhiteCircle} /> */}
          <AppText center>OK</AppText>
        </TouchableOpacity>
      </Block>
    </TouchableOpacity>
  );
}

const newStyle = StyleSheet.create({
  container: {
    // height: hp(5.5),
    borderRadius: 8,
  },
  OK: {
    width: '70%',
    borderWidth: 1,
    borderColor: 'white',
    padding: 3,
    borderRadius: 3,
    marginTop: 10,
  },
});
