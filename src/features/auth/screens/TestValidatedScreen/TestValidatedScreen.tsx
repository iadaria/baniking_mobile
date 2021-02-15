import React from 'react';
import { Button, Text, StyleSheet } from 'react-native';
import { Block } from '~/src/app/common/components/UI';
import { AppInput } from '~/src/app/common/components/UI/AppInput';
import ValidatedElements from '~/src/app/common/components/ValidatedElements';
import { defaultRegisterInputs } from '../contracts/registerInputs';

export default function TestValidatedScreen() {
  return (
    <ValidatedElements defaultInputs={defaultRegisterInputs}>
      <AppInput style={styles.text} id="first_name" placeholder="Enter surname" />
      <Text>Dasha</Text>
      <AppInput style={styles.text} id="email" email />
      <AppInput style={styles.text} defaultValue="+7" center mask="+7 ([000]) [000] [00] [00]" id="phone" phone />
      <Button color="green" title="Check all" onPress={() => {}} accessibilityLabel="HZ" />
    </ValidatedElements>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
});
