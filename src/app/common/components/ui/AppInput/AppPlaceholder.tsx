import React from 'react';
import { StyleSheet } from 'react-native';
import { AppText } from '../AppText';

interface IProps {
  placeholder?: string;
  showPlaceholder?: boolean;
}

export default function AppPlaceholder({
  showPlaceholder,
  placeholder,
}: IProps) {
  return showPlaceholder && placeholder ? (
    <AppText style={styles.placeholder}>{placeholder}</AppText>
  ) : null;
}

const styles = StyleSheet.create({
  placeholder: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    color: 'rgba(126, 126, 126, 0.3)',
    textAlign: 'center',
    textAlignVertical: 'center',
    /*  borderWidth: 1,
    borderColor: 'green', */
    zIndex: -1,
  },
});
