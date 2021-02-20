import React from 'react';
import { Block } from '~/src/app/common/components/UI';
import { GoogleSigninButton } from '@react-native-community/google-signin';
import VKLogin from 'react-native-vkontakte-login';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { ICredential } from '~/src/app/models/user';
import { Button } from 'react-native';

interface IProps {
  socialLogin: ({ provider }: ICredential) => void;
}

export default function SocialLogin({ socialLogin }: IProps) {
  return (
    <Block base center row middle debug>
      <GoogleSigninButton
        style={{ width: 40, height: 40 }}
        size={GoogleSigninButton.Size.Icon}
        color={GoogleSigninButton.Color.Light}
        onPress={() => {
          socialLogin({ provider: 'google' });
        }}
      />

      <Block margin={[0, 2]} />

      <Button
        title="VK"
        onPress={async () => {
          const auth = await VKLogin.login(['friends', 'photos', 'email']);
          console.log(auth);
        }}
      />

      <Block margin={[0, 2]} />

      <LoginButton
        style={{ width: 36, height: 36 }}
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then((data: AccessToken | null) => {
              console.log(data?.accessToken.toString());
            });
          }
        }}
        onLogoutFinished={() => console.log('logout.')}
      />
    </Block>
  );
}
