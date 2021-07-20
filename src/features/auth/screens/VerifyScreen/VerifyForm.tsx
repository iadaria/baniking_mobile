import React, { useEffect } from 'react';
import { ScrollView, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppText, Block } from '~/src/app/common/components/UI';
import {
  verify as verifyAction,
  notify as notifyAction,
} from '~/src/features/auth/store/authActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { VerifyPayload } from '../../store/saga/verifySaga';
import { useState, useCallback } from 'react';
import { VerifyCodeIcon } from '~/src/assets';
import { Code } from './Code';
import { Action } from '~/src/app/common/constants';
import { IErrors } from '~/src/app/utils/error';
import { NotifyPayload } from '../../store/saga/notifySaga';
import { isFullCode } from '~/src/app/utils/common';
import { Timer } from './Timer';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  action: Action;
  phone: string;
  scrollViewRef?: React.RefObject<ScrollView>;
  verify: (payload: VerifyPayload) => void;
  notify: (payload: NotifyPayload) => void;
  errors: IErrors | null;
}

const VerifyFormContainer = ({
  action,
  phone,
  verify,
  notify,
  errors,
}: IProps) => {
  const [code, setCode] = useState(['', '', '', '']);

  const requestVerifyCode = useCallback(() => {
    verify({ code: code.join(''), action });
  }, [action, code, verify]);

  /** Reqiest verification code */
  useEffect(() => {
    if (isFullCode(code)) {
      Keyboard.dismiss();
      requestVerifyCode();
    }
  }, [code, requestVerifyCode]);

  function requestNewNotifyCode() {
    clearCode();
    notify({ action });
  }

  const clearCode = () => setCode([]);
  const isCodeError = !!errors?.code;

  return (
    <Block full>
      <Block margin={[2, 0]} flex={0.25} row>
        <VerifyCodeIcon />
        <AppText margin={[0, 0, 0, 2]} header>
          Му отправили проверочный код на номер {phone}
        </AppText>
      </Block>

      <Code code={code} setCode={setCode} isError={isCodeError} />

      <Timer isError={isCodeError} sendNotify={requestNewNotifyCode} />
    </Block>
  );
};

const VerifyFormConnected = connect(
  ({ auth }: IRootState) => ({
    errors: auth.errors,
    phone: auth.currentUser?.phone!,
  }),
  {
    verify: verifyAction,
    notify: notifyAction,
  },
)(VerifyFormContainer);

export { VerifyFormConnected as VerifyForm };

//const isErrorCode = Boolean(errors?.code && errors?.code.length > 0);
//const isErrorCode = errors !== null;
//const isExistsError = !!errors?.exists;
//const isExpirationError = !!errors?.expiration;
//const isError = isExistsError || isCodeError;
