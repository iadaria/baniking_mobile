import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

export const KeyboardWrapper = ({ children }: { children: JSX.Element | JSX.Element[] }): JSX.Element => {
  const isIOS = Platform.OS === 'ios';

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
    marginTop: 30,
    backgroundColor: 'transparent',
    padding: 0,
    margin: 0,
    flex: 1,
  },
});
