import React, { FC, ForwardedRef, useState } from 'react';
import { TextInput, TextInputProps, TextStyle } from 'react-native';

import { IVerifyInputs } from '../contracts/verifyInputs';
import { colors } from '~/src/app/common/constants';
import { log, logline } from '~/src/app/utils/debug';

import { styles as s } from './styles';
import { Block } from '~/src/app/common/components/UI';

type RefInput = React.RefObject<TextInput>;

interface IDigitProps extends TextInputProps {
  prevRef?: RefInput;
  nextRef?: RefInput;
  setDigit: (newDigit: string) => void;
  digit: string;
  isError: boolean;
}

const Digit = React.forwardRef(
  (
    { prevRef, nextRef, digit, setDigit, isError, ...otherProps }: IDigitProps,
    ref: ForwardedRef<TextInput>,
  ) => {
    const [isFocus, setFocus] = useState(false);

    function handleBlur() {
      setFocus(false);
    }
    function handleFocus() {
      setFocus(true);
    }

    const color = isFocus ? 'white' : isError ? colors.errorDigit : colors.opacity;
    return (
      <TextInput
        ref={ref}
        style={[s.digit, { backgroundColor: color }]}
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
  code: string[];
  setCode: (code: string[]) => void;
  isError: boolean;
}

export const Code: FC<ICodeProps> = ({ code, setCode, isError }) => {
  const ref_one = React.createRef<TextInput>();
  const ref_two = React.createRef<TextInput>();
  const ref_three = React.createRef<TextInput>();
  const ref_four = React.createRef<TextInput>();

  //const isErrors = false;
  const color = isError ? colors.error : colors.secondary;

  function handleChangeCode(newDigit: string, at: number) {
    const newCode = [...code];
    newCode[at] = newDigit;
    setCode([...newCode]);
  }

  return (
    <Block style={[s.digits, { borderColor: color }]} row middle center>
      <Digit
        ref={ref_one}
        nextRef={ref_two}
        digit={code[0]}
        setDigit={(digit: string) => handleChangeCode(digit, 0)}
        isError={isError}
      />
      <Digit
        ref={ref_two}
        nextRef={ref_three}
        prevRef={ref_one}
        digit={code[1]}
        setDigit={(digit: string) => handleChangeCode(digit, 1)}
        isError={isError}
      />
      <Digit
        ref={ref_three}
        nextRef={ref_four}
        prevRef={ref_two}
        digit={code[2]}
        setDigit={(digit: string) => handleChangeCode(digit, 2)}
        isError={isError}
      />
      <Digit
        ref={ref_four}
        prevRef={ref_three}
        digit={code[3]}
        setDigit={(digit: string) => handleChangeCode(digit, 3)}
        isError={isError}
      />
    </Block>
  );
};