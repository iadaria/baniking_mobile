import React from 'react';
import { Button, StyleSheet, Text } from 'react-native';
import ValidatedElements from '~/src/app/common/components/ValidatedElements';
import { TestTextInput } from './TestTextInput';
import { defaultLoginInputs } from '../contracts/loginInputs';

export default function TestValidatedScreen() {
  return (
    <ValidatedElements defaultInputs={defaultLoginInputs}>
      <TestTextInput style={styles.input} label="First name" id="login" />
      <Text>Dasha</Text>
      <TestTextInput style={styles.input} label="Last name" id="password" />
      {/* <TestTextInput style={styles.input} label="Birthday month" id="birthday_month" />
      <TestTextInput style={styles.input} label="password" id="password" /> */}
      <Button color="green" title="Check all" onPress={() => {}} accessibilityLabel="HZ" />
    </ValidatedElements>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    paddingTop: 50,
    paddingBottom: 10,
  },
  split: {
    flexDirection: 'row',
  },
  input: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: 'grey',
    marginBottom: 40,
  },
  button: {
    flex: 0,
    justifyContent: 'flex-end',
  },
});
