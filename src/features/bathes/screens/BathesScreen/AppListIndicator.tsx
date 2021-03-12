import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '~/src/app/common/constants';

export default function AppListIndicator() {
  return <ActivityIndicator size="small" color={colors.secondary} style={styles.indicator} />;
}

const styles = StyleSheet.create({
  indicator: { height: 100, justifyContent: 'center', alignItems: 'center' },
});
