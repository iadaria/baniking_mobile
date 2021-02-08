import React from 'react';
import { Block, AppText } from '~/app/common/components/ui';
import { GoogleSigninButton } from '@react-native-community/google-signin';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { ICredential } from '../../../app/models/user';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  socialLogin: ({ provider }: ICredential) => void;
}

export function LoginScreen({ socialLogin }: IProps) {
  return (
    <Block base center debug>
      <AppText>Login</AppText>
      <GoogleSigninButton
        style={{ width: '100%', height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        //color={GoogleSigninButton.Color.Dark}
        onPress={() => {
          socialLogin({ provider: 'google' });
        }}
        /*  socialLogin('google')
            .then(() => {
              console.log('success entered by Google');
            })
            .catch((error) => console.log('error', error))
        } */
      />
    </Block>
  );
}
