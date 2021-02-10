import React from 'react';
import { Block, AppText } from '~/src/app/common/components/ui';
import { GoogleSigninButton } from '@react-native-community/google-signin';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { ICredential } from '../../../app/models/user';
import VKLogin from 'react-native-vkontakte-login';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
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
        // style={{ width: 48, height: 48 }}
        size={GoogleSigninButton.Size.Icon}
        color={GoogleSigninButton.Color.Light}
        onPress={() => {
          socialLogin({ provider: 'google' });
        }}
      />

      <Block margin={[0, 0, 3, 0]} />

      <Button
        title="VK"
        onPress={async () => {
          const auth = await VKLogin.login(['friends', 'photos', 'email']);
          console.log(auth);
        }}
      />

      <Block margin={[0, 0, 3, 0]} />

      <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then((data) => {
              console.log(data.accessToken.toString());
            });
          }
        }}
        onLogoutFinished={() => console.log('logout.')}
      />
    </Block>
  );
}

