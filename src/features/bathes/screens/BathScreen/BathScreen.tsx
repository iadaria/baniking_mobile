import React, { useEffect } from 'react';
import { Route } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { IBath } from '~/src/app/models/bath';

export interface IProps {
  route: Route<string, object | undefined>;
}

export function BathScreen({ route }: IProps) {
  const bath: IBath | undefined = route?.params;

  useEffect(() => {
    console.log('[BathScreen]', bath);
  }, [bath]);

  return (
    <View>
      <Text>Bath</Text>
    </View>
  );
}
