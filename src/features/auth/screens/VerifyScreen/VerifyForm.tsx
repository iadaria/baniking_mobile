import React, { useEffect } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Input, AppText, Block } from '~/src/app/common/components/UI';
import { AppButton } from '~/src/app/common/components/UI/AppButton';
import ValidatedElements from '~/src/app/common/components/ValidatedElements';
import {
  verify as verifyAction,
  initVerifyInputs as initVerifyInputsAction,
} from '~/src/features/auth/store/authActions';
import { AuthLogoLeft, AuthLogoRight } from '~/src/assets';
import { IRootState } from '~/src/app/store/rootReducer';
import { IUserAuth } from '~/src/app/models/user';
import { IVerifyInputs } from '../contracts/verifyInputs';
import { sizes } from '~/src/app/common/constants';
import { log, logline } from '~/src/app/utils/debug';
import { VerifyPayload } from '../../store/saga/verifySaga';
import { styles as s } from './styles';
import { useState } from 'react';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  scrollViewRef?: React.RefObject<ScrollView>;
  currentUser: Partial<IUserAuth> | null;
  defaultVerifyInputs: IVerifyInputs;
  verify: (payload: VerifyPayload) => void;
  initVerifyInputs: (verifies: VerifyPayload) => void;
}

const Code = () => {
  const [focus, setFo] = useState(true);
  return (
    <Block margin={[0, 4]} row middle>
      <TextInput
        style={s.digit}
        textAlign="center"
        multiline={true}
        keyboardType="numeric"
        maxLength={1}
        returnKeyType="next"
        autoFocus={true}
      />
      <TextInput
        style={s.digit}
        textAlign="center"
        multiline={true}
        keyboardType="numeric"
        maxLength={1}
        returnKeyType="next"
        autoFocus={true}
      />
      <TextInput
        style={s.digit}
        textAlign="center"
        multiline={true}
        keyboardType="numeric"
        maxLength={1}
        autoFocus={true}
      />
      <TextInput
        style={s.digit}
        textAlign="center"
        multiline={true}
        keyboardType="numeric"
        maxLength={1}
        autoFocus={true}
      />
    </Block>
  );
};
const VerifyFormContainer = ({
  scrollViewRef,
  currentUser,
  verify,
  initVerifyInputs,
  defaultVerifyInputs,
}: IProps): JSX.Element => {
  // Use ref because don't need rendering component
  const valuesRef = React.useRef<VerifyPayload>({
    phone: currentUser?.phone || '',
    action: 0,
    code: '',
  });
  const [recreate, setRecreate] = React.useState<boolean>(true);

  useEffect(() => {
    if (currentUser) {
      initVerifyInputs({
        phone: currentUser?.phone || '',
        action: 0,
        code: '',
      });
    }
  }, [currentUser, initVerifyInputs]);

  const handleResetPassword = () => {
    if (valuesRef.current) {
      log('values1', valuesRef.current);
      verify(valuesRef?.current);
      //resetPassword(valuesRef?.current.email!);
      setRecreate(!recreate);
    }
  };

  return (
    <ValidatedElements
      key={Number(recreate)}
      defaultInputs={defaultVerifyInputs}
      scrollView={scrollViewRef}
      valuesRef={valuesRef}>
      <Block margin={[0, 0, 3]} row middle center>
        <AuthLogoLeft />
        <AppText style={{ marginHorizontal: 15 }} h2 trajan primary>
          Verification Code
        </AppText>
        <AuthLogoRight />
      </Block>

      <Code />

      <Block row middle center>
        <AppText primary semibold size={sizes.text.label}>
          Code
        </AppText>
      </Block>
      <Input
        style={{ borderRadius: 10 }}
        center
        id="code"
        placeholder="Enter code"
      />
      {/* Button */}
      <AppButton margin={[2, 0, 1]} onPress={handleResetPassword}>
        <AppText center medium>
          Восстановить
        </AppText>
      </AppButton>
    </ValidatedElements>
  );
};

const VerifyFormConnected = connect(
  ({ auth }: IRootState) => ({
    currentUser: auth.currentUser,
    defaultVerifyInputs: auth.inputs.verify,
  }),
  {
    verify: verifyAction,
    initVerifyInputs: initVerifyInputsAction,
  },
)(VerifyFormContainer);

export { VerifyFormConnected as VerifyForm };
