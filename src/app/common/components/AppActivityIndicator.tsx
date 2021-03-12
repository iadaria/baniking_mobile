import React from 'react';
import { ActivityIndicator } from 'react-native';
import { colors } from '../constants';
import { Block } from './UI';

export default function AppActivityIndicator() {
  return (
    <Block full center middle>
      <ActivityIndicator size="small" color={colors.secondary} />
    </Block>
  );
}
