import React from 'react';
import { Button, Text } from 'react-native';
import { AppInput } from '~/src/app/common/components/UI/AppInput';
import ValidatedElements from '~/src/app/common/components/ValidatedElements';
import { defaultRegisterInputs } from '../contracts/registerInputs';

export default function TestValidatedScreen() {
  return (
    <ValidatedElements defaultInputs={defaultRegisterInputs}>
      <AppInput id="first_name" />
      <Text>Dasha</Text>
      <AppInput id="email" email />
      <AppInput defaultValue="+7" center mask="+7 ([000]) [000] [00] [00]" id="phone" phone />
      <Button color="green" title="Check all" onPress={() => {}} accessibilityLabel="HZ" />
    </ValidatedElements>
  );
}
