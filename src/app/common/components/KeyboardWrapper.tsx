import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

export const KeyboardWrapper = ({ children }: { children: JSX.Element | JSX.Element[] }): JSX.Element => {
  const isIOS = Platform.OS === 'ios';

  if (!isIOS) {
    return <>{children}</>;
  }
  return <KeyboardAvoidingView behavior="padding">{children}</KeyboardAvoidingView>;
};
