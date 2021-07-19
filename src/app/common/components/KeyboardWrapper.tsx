import React, { ReactNode } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { isIOS } from '../../utils/system';

export const KeyboardWrapper = ({ children }: { children: ReactNode }) => {
  if (!isIOS) {
    return <>{children}</>;
  }
  return (
    <KeyboardAvoidingView style={styles.keyboard} behavior="padding">
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    // marginTop: 30,
    backgroundColor: 'transparent',
    flexGrow: 1,
  },
});
