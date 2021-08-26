import React from 'react';
import { TouchableOpacity } from 'react-native';
import { CloseFilerIcon } from '~/src/assets';
import { styles } from '../styles';

interface IProps {
  onPress: () => void;
}

export const RightButton = ({ onPress }: IProps) => (
  <TouchableOpacity style={styles.toggle} onPress={onPress}>
    <CloseFilerIcon />
  </TouchableOpacity>
);
