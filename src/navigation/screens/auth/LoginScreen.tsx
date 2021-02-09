import React from 'react';
import { Block, AppText } from '~/app/common/components/ui';
import { GoogleSigninButton } from '@react-native-community/google-signin';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { ICredential } from '../../../app/models/user';
import VKLogin from 'react-native-vkontakte-login';
import { Button } from 'react-native';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  socialLogin: ({ provider }: ICredential) => void;
}

export function LoginScreen({ socialLogin }: IProps) {
  return (
    <Block base center debug>
      <AppText>Login</AppText>
      <GoogleSigninButton
        // style={{ width: '100%', height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        //color={GoogleSigninButton.Color.Dark}
        onPress={() => {
          socialLogin({ provider: 'google' });
        }}
      />

      <Block margin={[0, 0, 3, 0]} />

      <Button
        title="VK"
        onPress={async () => {
          const auth = await VKLogin.login(['friends', 'photos', 'email']);
          console.log(auth.access_token);
        }}
      />
    </Block>
  );
}
