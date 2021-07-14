import React from 'react';
import { AppText, Block } from '~/src/app/common/components/UI';
import { Input } from '~/src/app/common/components/UI/Input';

export function RegisterFromTwo() {
  return (
    <Block>
      <AppText>Test</AppText>
      <Input secure />
      <Input secure placeholder="Enter phone" center defaultValue="Dasha" error="Heelow" />
    </Block>
  )
}