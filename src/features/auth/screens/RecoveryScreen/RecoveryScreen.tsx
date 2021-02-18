import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
// import SocialLogin from './components/SocialLogin';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AppText, Block } from '~/src/app/common/components/UI';
import { AuthLogo } from '~/src/assets';
import { colors, sizes } from '~/src/app/common/constants';
import { RecoveryForm } from './RecoveryForm';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
}

export function RecoveryScreen({ navigation }: IProps) {
  const scrollViewRef = React.useRef<ScrollView>(null);
  return (
    <ScrollView
      horizontal
      ref={scrollViewRef}
      style={styles.scrollView}
      alwaysBounceHorizontal
      contentContainerStyle={styles.scrollViewContainer}>
      <Block full debug>
        {/* Top log */}
        <Block flex={0.3} center bottom margin={[0, 0, sizes.logo.bottom]}>
          <AuthLogo />
        </Block>
        {/* Login Form */}
        <Block style={styles.list} full base white>
          {/* <LoginForm navigation={navigation} scrollViewRef={scrollViewRef} /> */}
          <RecoveryForm navigation={navigation} scrollViewRef={scrollViewRef} />
          {/*  Social login block */}

          <Block margin={[2.4, 0, 0]} row middle debug>
            <AppText primary center>
              {'Назад к '}
            </AppText>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <AppText secondary> Авторизации</AppText>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    /* borderWidth: 2,
    borderColor: 'green',
    backgroundColor: 'red', */
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  list: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
