import React, { useEffect } from 'react';
import { Route } from '@react-navigation/native';
import { IBath } from '~/src/app/models/bath';
import { View } from 'react-native';

export interface IProps {
  route: Route<string, object | undefined>;
}

export function BathScreen({ route }: IProps) {
  const bath: IBath | undefined = route?.params;

  useEffect(() => {
    console.log('[BathScreen]', bath);
  }, [bath]);

  return <View style={{ flex: 1 }} />;
}
