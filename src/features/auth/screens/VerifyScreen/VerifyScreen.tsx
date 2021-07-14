import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { AppText, Block } from '~/src/app/common/components/UI';
import { AuthLogo } from '~/src/assets';
import { multiplier } from '~/src/app/common/constants';
import { VerifyForm } from './VerifyForm';
import { styles } from './styles';
import { KeyboardWrapper } from '~/src/app/common/components/KeyboardWrapper';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
}

export function VerifyScreen({ navigation }: IProps) {
  return (
    <Block full>
      {/* Top log */}
      <Block
        style={{ flexGrow: 0.7 }}
        margin={[0, 0, 5 * multiplier]}
        bottom
        center>
        <AuthLogo width={wp(11) * multiplier} />
      </Block>
      {/* Login Form */}
      <Block style={{ flexGrow: 1 }} base>
        {/* Form */}
        <VerifyForm navigation={navigation} />
      </Block>
    </Block>
  );
}
