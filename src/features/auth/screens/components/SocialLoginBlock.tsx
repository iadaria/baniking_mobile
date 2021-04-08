import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import VKLogin from 'react-native-vkontakte-login';
import { LoginManager } from 'react-native-fbsdk';
import { yandexLogin } from './socialLogins';
import { AppText, Block } from '~/src/app/common/components/UI';
import { colors, sizes, multiplier } from '~/src/app/common/constants';
import { FacebookIcon, GoogleIcon, VkIcon, YandexIcon } from '~/src/assets';

export default function SocialLoginBlock() {
  return (
    <Block margin={[5 * multiplier, 0, 3 * multiplier]}>
      <AppText caption medium center size={sizes.text.label + 0.1}>
        Или войдите через социальные сети
      </AppText>
      <Block margin={[1.5, 0, 0]} row middle>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => {
            /* LoginManager.logInWithPermissions(['public_profile']).then(
              function (result) {
                if (result.isCancelled) {
                  __DEV__ && console.log('Login cancelled');
                } else {
                  __DEV__ && console.log('Login success with permissions: ' + result.grantedPermissions.toString());
                }
              },
              function (error) {
                __DEV__ && console.log('Login fail with error: ' + error);
              },
            ); */
          }}>
          <FacebookIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={() => {}}>
          <GoogleIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={async () => {
            /* try {
              const auth = await VKLogin.login(['friends', 'photos', 'email']);
              __DEV__ && console.log(auth);
            } catch (error) {
              __DEV__ && console.log(error);
            } */
          }}>
          <VkIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => {
            //yandexLogin();
          }}>
          <YandexIcon />
        </TouchableOpacity>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  socialButton: {
    width: wp(10.14),
    height: wp(10.14),
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(0.8),
  },
});
