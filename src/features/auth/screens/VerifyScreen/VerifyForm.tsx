import React, { useEffect } from 'react';
import { ScrollView, TextInput } from 'react-native';
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
import { IRootState } from '~/src/app/store/rootReducer';
import { IUserAuth } from '~/src/app/models/user';
import { IVerifyInputs } from '../contracts/verifyInputs';
import { colors, sizes } from '~/src/app/common/constants';
import { log, logline } from '~/src/app/utils/debug';
import { VerifyPayload } from '../../store/saga/verifySaga';
import { styles as s } from './styles';
import { useState, ForwardedRef } from 'react';
import { color } from 'react-native-reanimated';

type RefInput = React.RefObject<TextInput>;

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  scrollViewRef?: React.RefObject<ScrollView>;
  currentUser: Partial<IUserAuth> | null;
  defaultVerifyInputs: IVerifyInputs;
  verify: (payload: VerifyPayload) => void;
  initVerifyInputs: (verifies: VerifyPayload) => void;
}

interface IDigitProps {
  //ref: RefInput;
  prevRef?: RefInput;
  nextRef?: RefInput;
}

const Digit = React.forwardRef(({ prevRef, nextRef }: IDigitProps, ref: ForwardedRef<TextInput>) => {
  const [isFocus, setFocus] = useState(false);

  function handleBlur() { setFocus(false); }
  function handleFocus() { setFocus(true); }

  return (
    <TextInput
      ref={ref}
      style={[s.digit, isFocus && { backgroundColor: 'white' }]}
      textAlign="center"
      multiline={true}
      keyboardType="numeric"
      maxLength={1}
      returnKeyType="next"
      placeholder={!isFocus ? '-' : undefined}
      placeholderTextColor={colors.white}
      onChangeText={(text: string) => {
        text.length > 0 && nextRef?.current?.focus();
        text.length === 0 && prevRef?.current?.focus();
      }}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  )
});

const Code = () => {
  const ref_one = React.createRef<TextInput>();
  const ref_two = React.createRef<TextInput>();
  const ref_three = React.createRef<TextInput>();
  const ref_four = React.createRef<TextInput>();

  const isErrors = false;
  const color = isErrors ? colors.error : colors.secondary;

  return (
    <Block style={[s.digits, { borderColor: color }]} row middle center>
      <Digit ref={ref_one} nextRef={ref_two} />
      <Digit ref={ref_two} nextRef={ref_three} prevRef={ref_one} />
      <Digit ref={ref_three} nextRef={ref_four} prevRef={ref_two} />
      <Digit ref={ref_four} prevRef={ref_three} />
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
