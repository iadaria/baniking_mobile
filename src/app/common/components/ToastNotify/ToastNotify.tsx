import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { closeWhiteCircle } from '~/src/assets';

import styles from './styles';

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
      <View style={[styles.container, styles.error]}>
        <Text style={[styles.message, styles.errorText]}>{message.message}</Text>
        <TouchableOpacity onPress={onClick}>
          <Image style={styles.closeImg} source={closeWhiteCircle} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
