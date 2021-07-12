import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
// import SocialLogin from './components/SocialLogin';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AppText, Block } from '~/src/app/common/components/UI';
import { LoginForm } from './LoginForm';
import {
  AuthLogo,
  FacebookIcon,
  GoogleIcon,
  VkIcon,
  YandexIcon,
} from '~/src/assets';
import { sizes, multiplier } from '~/src/app/common/constants';
import { styles } from './styles';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
}

export function LoginScreen({ navigation }: IProps) {
  const scrollViewRef = React.useRef<ScrollView>(null);

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.scrollView}
      // contentInsetAdjustmentBehavior="always"
      contentContainerStyle={styles.scrollViewContainer}>
      <Block full>
        {/* Top log */}
        <Block
          style={{ flexGrow: 0.7 }}
          margin={[0, 0, 4 * multiplier]}
          bottom
          center>
          <AuthLogo width={wp(11) * multiplier} />
        </Block>
        {/* Login Form */}
        <Block style={[{ flexGrow: 1 }, styles.list]} base white>
          <LoginForm navigation={navigation} scrollViewRef={scrollViewRef} />
          {/*  Social login block */}
          <Block margin={[9, 0, 3]}>
            <AppText caption medium center size={sizes.text.label + 0.1}>
              Или войдите через социальные сети
            </AppText>
            <Block margin={[1.5, 0, 0]} row middle>
              <TouchableOpacity style={styles.socialButton} onPress={() => { }}>
                <FacebookIcon />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton} onPress={() => { }}>
                <GoogleIcon />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton} onPress={() => { }}>
                <VkIcon />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton} onPress={() => { }}>
                <YandexIcon />
              </TouchableOpacity>
            </Block>
          </Block>
          {/*  Sign in  */}
          <Block margin={[0, 0, 0]} row middle>
            <AppText primary center>
              Eще не зарегистрированы?
            </AppText>
            <TouchableOpacity
              onPress={() => navigation.navigate('RegisterScreen')}>
              <AppText secondary>{' Регистрация'}</AppText>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    </ScrollView>
  );
}
