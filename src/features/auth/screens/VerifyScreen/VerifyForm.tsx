import React, { useEffect } from 'react';
import { Keyboard, ScrollView, TextStyle, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppText, Block } from '~/src/app/common/components/UI';
import { verify as verifyAction, notify as notifyAction } from '~/src/features/auth/store/authActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { IUserAuth } from '~/src/app/models/user';

import { VerifyPayload } from '../../store/saga/verifySaga';
import { useState } from 'react';
import { ArrowRightIcon, VerifyCodeIcon } from '~/src/assets';
import { styles as s } from './styles';
import { logline } from '~/src/app/utils/debug';
import { Code } from './Code';
import { Action, colors, SMS_SECONDS } from '~/src/app/common/constants';
import { IErrors } from '~/src/app/utils/error';
import { NotifyPayload } from '../../store/saga/notifySaga';
import { isExpired, isFullCode } from '~/src/app/utils/common';


interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  scrollViewRef?: React.RefObject<ScrollView>;
  currentUser: Partial<IUserAuth> | null;
  verify: (payload: VerifyPayload) => void;
  notify: (payload: NotifyPayload) => void;
  errors: IErrors | null;
}

interface ITimer {
  seconds: number;
  isError: boolean;
}

const Timer = ({ seconds, isError }: ITimer) => {

  logline('[Timer] isError=', isError);

  function format(num: number) {
    const result = String(num);
    return result.length < 2 ? '0' + result : result;
  }


  const colorText = isExpired(seconds) && !isError ? 'black' : 'white';
  const colorBack = isExpired(seconds) && !isError ? 'white' : isError ? colors.errorDigit : 'black';
  const expiredBack: TextStyle = { backgroundColor: colorBack };
  const expiredText: TextStyle = { color: colorText }
  return (
    <Block
      style={[s.repeat, expiredBack]}
      margin={[2, 0]}
      padding={[3, 4]}
      row
      space="between">
      <Block row center>
        <AppText style={expiredText} margin={[0, 5, 0, 0]}>
          Отправить код заново
        </AppText>
        <ArrowRightIcon fill={colorText} />
      </Block>
      <AppText style={expiredText} semibold>
        00:{format(seconds)}
      </AppText>
    </Block>
  );
};

const VerifyFormContainer = ({ currentUser, verify, notify, errors }: IProps): JSX.Element => {
  const [recreate, setRecreate] = useState<boolean>(true);
  const [code, setCode] = useState(['', '', '', '']);
  const [seconds, setSeconds] = useState(SMS_SECONDS);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  // for test
  //currentUser = currentUser || { phone: '+7(914)352-82-88' }

  useEffect(() => {
    logline('[VarifyForm]', `code=${code.join('')}, isFull=${isFullCode(code)}`);
    if (isFullCode(code)) {
      Keyboard.dismiss();
      handleVerifyCode();
    }
  }, [code]);

  useEffect(() => {
    launchTick();
    return () => timer && clearInterval(timer);
  }, []);

  /* useEffect(() => {
    logline('[VarifyForm] recreate=', recreate);
  }, [recreate]); */

  useEffect(() => {
    if (timer && seconds < 1) {
      clearInterval(timer);
    }
  }, [seconds]);


  function launchTick() {
    setSeconds(SMS_SECONDS);
    const interval = setInterval(() => tick(), 1000);
    setTimer(interval);
  }

  function tick() {
    timer && setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
  }

  function handleVerifyCode() {
    //setRecreate(!recreate);
    if (currentUser) {
      verify({
        phone: currentUser.phone!,
        code: code.join(''),
        action: Action.Registration,
      });
    }
  };

  function generateNewNotifyCode() {
    clearCode();
    if (currentUser) {
      notify({
        phone: currentUser.phone!,
        action: Action.Registration
      });
      launchTick();
    }
  }

  function clearCode() { setCode([]) }

  //const isErrorCode = Boolean(errors?.code && errors?.code.length > 0);
  const isErrorCode = errors !== null;

  return (
    <Block full>
      <Block margin={[2, 0]} flex={0.25} row>
        <VerifyCodeIcon />
        <AppText margin={[0, 0, 0, 2]} header>
          Му отправили проверочный код на номер {currentUser?.phone}
        </AppText>
      </Block>

      <Code code={code} setCode={setCode} isError={isErrorCode} />

      <TouchableOpacity disabled={!isExpired(seconds)} onPress={generateNewNotifyCode}>
        <Timer seconds={seconds} isError={isErrorCode} />
      </TouchableOpacity>
    </Block>
  );
};

const VerifyFormConnected = connect(
  ({ auth }: IRootState) => ({
    currentUser: auth.currentUser,
    errors: auth.errors,
  }),
  {
    verify: verifyAction,
    notify: notifyAction,
  },
)(VerifyFormContainer);

export { VerifyFormConnected as VerifyForm };
