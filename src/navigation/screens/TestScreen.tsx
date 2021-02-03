import React from 'react';
import { Text } from 'react-native';
import { Block } from '~/app/common/components/ui/Block';
import { TotalPointScores } from '~/assets';

export default function TestScreen() {
  return (
    <Block debug base>
      <Text>Test</Text>
      <TotalPointScores />
    </Block>
  );
}
