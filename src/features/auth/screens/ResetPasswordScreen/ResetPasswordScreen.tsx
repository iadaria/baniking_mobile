import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
// import SocialLogin from './components/SocialLogin';
// import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AppText, Block } from '~/src/app/common/components/UI';
import { AuthLogo } from '~/src/assets';
import { sizes, multiplier } from '~/src/app/common/constants';
import { ResetPasswordForm } from './ResetPasswordForm';
import { styles } from './styles';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
}

export function ResetPasswordScreen({ navigation }: IProps) {
  const scrollViewRef = React.useRef<ScrollView>(null);
  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.scrollView}
      alwaysBounceHorizontal
      contentContainerStyle={styles.scrollViewContainer}>
      <Block full>
        {/* Top log */}
        <Block style={{ flexGrow: 0.7 }} margin={[0, 0, 5 * multiplier]} bottom center>
          <AuthLogo width={wp(11) * multiplier} />
        </Block>
        {/* Login Form */}
        <Block style={[{ flexGrow: 1 }, styles.list]} base white>
          <ResetPasswordForm navigation={navigation} scrollViewRef={scrollViewRef} />

          <Block margin={[2.4, 0, 0]} row middle>
            <AppText primary center>
              {'Назад к '}
            </AppText>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <AppText secondary>Авторизации</AppText>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    </ScrollView>
  );
}
