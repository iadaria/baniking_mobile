import React from 'react';
import { Modal, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { closeModal } from './modalReducer';
import { BlurView } from '@react-native-community/blur';
import { isIos } from '../constants';

export default function ModalWrapper({ children, header }: any) {
  const dispatch = useDispatch();

  return (
    <Modal animationType="fade" transparent={true} visible={true} onRequestClose={() => dispatch(closeModal())}>
      <BlurView
        style={styles.absolute}
        blurType="dark"
        blurAmount={isIos ? 1 : 5}
        reducedTransparencyFallbackColor="black"
      />
      {children}
    </Modal>
    // <ImageBackground key={'blurryImage'} style={styles.blur} source={bathesBlurBackground}>
    //   {children}
    //   <BlurView style={styles.absolute} blurType="dark" blurAmount={4} reducedTransparencyFallbackColor="black" />
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  blur: {
    flex: 1,
  },
  absolute: {
    position: 'absolute',
    opacity: isIos ? 0.95 : 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
