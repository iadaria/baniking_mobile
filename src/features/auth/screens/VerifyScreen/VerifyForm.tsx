import React, { FC, useEffect } from 'react';
import { ScrollView, TextInput, TextInputProps } from 'react-native';
import { connect } from 'react-redux';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Block } from '~/src/app/common/components/UI';
import { verify as verifyAction } from '~/src/features/auth/store/authActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { IUserAuth } from '~/src/app/models/user';
import { IVerifyInputs } from '../contracts/verifyInputs';
import { colors } from '~/src/app/common/constants';
import { log, logline } from '~/src/app/utils/debug';
import { VerifyPayload } from '../../store/saga/verifySaga';
import { styles as s } from './styles';
import { useState, ForwardedRef } from 'react';
import { replaceAt } from '~/src/app/utils/common';

type RefInput = React.RefObject<TextInput>;

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  scrollViewRef?: React.RefObject<ScrollView>;
  currentUser: Partial<IUserAuth> | null;
  defaultVerifyInputs: IVerifyInputs;
  verify: (payload: VerifyPayload) => void;
  initVerifyInputs: (verifies: VerifyPayload) => void;
}

interface IDigitProps extends TextInputProps {
  //ref: RefInput;
  prevRef?: RefInput;
  nextRef?: RefInput;
  setDigit: (newDigit: string) => void;
  digit: string;
}

const Digit = React.forwardRef(
  (
    { prevRef, nextRef, digit, setDigit, ...otherProps }: IDigitProps,
    ref: ForwardedRef<TextInput>,
  ) => {
    const [isFocus, setFocus] = useState(false);

    function handleBlur() {
      setFocus(false);
    }
    function handleFocus() {
      setFocus(true);
    }

    return (
      <TextInput
        ref={ref}
        style={[s.digit, isFocus && { backgroundColor: 'white' }]}
        textAlign="center"
        multiline={true}
        keyboardType="numeric"
        maxLength={1}
        returnKeyType="next"
        value={digit}
        placeholder={!isFocus ? '-' : undefined}
        placeholderTextColor={colors.white}
        onChangeText={(text: string) => {
          setDigit(text);
          text.length > 0 && nextRef?.current?.focus();
          text.length === 0 && prevRef?.current?.focus();
        }}
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...otherProps}
      />
    );
  },
);

interface ICodeProps {
  code: string;
  setCode: (code: string) => void;
}

const Code: FC<ICodeProps> = ({ code, setCode }) => {
  const ref_one = React.createRef<TextInput>();
  const ref_two = React.createRef<TextInput>();
  const ref_three = React.createRef<TextInput>();
  const ref_four = React.createRef<TextInput>();

  const isErrors = false;
  const color = isErrors ? colors.error : colors.secondary;

  function handleChangeCode(newDigit: string, at: number) {
    const newCode = replaceAt(code, at, newDigit);
    setCode(newCode);
  }

  return (
    <Block style={[s.digits, { borderColor: color }]} row middle center>
      <Digit
        ref={ref_one}
        nextRef={ref_two}
        digit={code[0]}
        setDigit={(digit: string) => handleChangeCode(digit, 0)}
      />
      <Digit
        ref={ref_two}
        nextRef={ref_three}
        prevRef={ref_one}
        digit={code[1]}
        setDigit={(digit: string) => handleChangeCode(digit, 1)}
      />
      <Digit
        ref={ref_three}
        nextRef={ref_four}
        prevRef={ref_two}
        digit={code[2]}
        setDigit={(digit: string) => handleChangeCode(digit, 2)}
      />
      <Digit
        ref={ref_four}
        prevRef={ref_three}
        digit={code[3]}
        setDigit={(digit: string) => handleChangeCode(digit, 4)}
      />
    </Block>
  );
};
const VerifyFormContainer = ({ currentUser, verify }: IProps): JSX.Element => {
  const [code, setCode] = useState('1234');
  const [recreate, setRecreate] = useState<boolean>(true);

  useEffect(() => {
    logline('[VarifyForm] code = ', code);
  }, []);

  const handleResetPassword = () => {
    //verify(valuesRef?.current);
    //setRecreate(!recreate);
  };

  return <Code code={code} setCode={setCode} />;
};

const VerifyFormConnected = connect(
  ({ auth }: IRootState) => ({
    currentUser: auth.currentUser,
  }),
  {
    verify: verifyAction,
  },
)(VerifyFormContainer);

export { VerifyFormConnected as VerifyForm };
