import React, { MutableRefObject, useRef, useState, RefObject, useEffect } from 'react';
import { getValidatedInput } from '~/src/app/utils/validate';
import { ScrollView, LayoutChangeEvent, TextInput, TouchableOpacity, Platform } from 'react-native';
import { IInput } from '~/src/app/models/validate';
import { IAppInputProps } from '~/src/app/models/ui';
import { Block } from '../UI';

interface IChild<T> extends JSX.Element, IAppInputProps<T> {}

interface IProps<T, V> {
  children?: React.ReactNode;
  defaultInputs: T;
  scrollView?: React.RefObject<ScrollView>;
  valuesRef: MutableRefObject<V>;
  nameForm?: string;
  initInputs?: V;
}

const SCROLL_OFFSET_TOP = 150;
const SCROLL_MAX = 50;

function ValidatedElements<T extends { [key: string]: IInput }, V>({
  children,
  defaultInputs,
  initInputs,
  scrollView,
  valuesRef,
  nameForm,
}: IProps<T, V>): JSX.Element {
  // const [initialized, setInitialized] = useState(initInputs ? false : true);
  const [inputs, setInputs] = useState<T>(defaultInputs);
  const [isErrors, setIsErrors] = useState<boolean>();
  //const [isEqual, setIsEqual] = useState<boolean>(true);
  const _scrollView = useRef<ScrollView>(null);
  const inputRefs: RefObject<TextInput>[] = [];
  const buttonRef = useRef<TouchableOpacity>();

  useEffect(() => {
    if (initInputs) {
      const newDefaultInputs = defaultInputs;
      for (const key of Object.keys(inputs)) {
        if (initInputs.hasOwnProperty(key)) {
          newDefaultInputs[key].value = initInputs[key] || '';
        }
      }
      setInputs({ ...inputs, ...newDefaultInputs });
      // setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initInputs]);

  useEffect(() => {
    console.log(`[ValidateElements/${nameForm}/useEffect]`, JSON.stringify(inputs, null, 4));

    let _isErrors = false; // предположим - ошибок нет
    let whatError: string | null = null;
    Object.values(inputs).map(({ errorLabel }: IInput) => {
      if (errorLabel) {
        // нашли первую ошибку
        setIsErrors(true);
        _isErrors = true;
        whatError = errorLabel;
        return;
      }
    });

    let _allRequired = true; // предположим все требуемые поля заполнены
    Object.values(inputs).map(({ value, require }: IInput) => {
      if (require && !value) {
        // нашли незаполненное важное поле
        _allRequired = false;
        return;
      }
    });

    !_isErrors && _allRequired && setIsErrors(false);

    console.log(
      `[ValidatedElements/searchErrors] isErrors = ${isErrors}/_isErrors = ${_isErrors} ('${whatError}')\n` +
        ` allRequire = ${_allRequired} --------- `,
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs]);

  function handleAllValidate(): T /* IInputs */ {
    const updatedInputs = { ...inputs };
    for (const [key, input] of Object.entries(inputs)) {
      updatedInputs[key as keyof typeof inputs] = getValidatedInput({
        input,
        value: input.value.toString(),
        touched: true,
      }) as T[keyof T];
    }
    setInputs(updatedInputs);
    return updatedInputs;
  }

  function getFirstInvalidInput(validatedInputs: T /* IInputs */): number | null {
    let firstInvalidCoordinate: number = Infinity;

    for (const input of Object.values(validatedInputs)) {
      if (input.errorLabel && input.yCoordinate && input.yCoordinate < firstInvalidCoordinate!) {
        firstInvalidCoordinate = input.yCoordinate;
        // Don't scrolling if input on the top
        if (firstInvalidCoordinate < SCROLL_OFFSET_TOP) {
          return SCROLL_MAX;
        }
      }
    }

    if (firstInvalidCoordinate === Infinity) {
      return null;
    }

    return Math.trunc(firstInvalidCoordinate);
  }

  function setInputPosition({ ids, value }: { ids: [keyof typeof inputs]; value: number }) {
    const updatedInputs: T /* IInputs  */ = { ...inputs };

    ids.forEach((id: keyof typeof inputs) => {
      updatedInputs[id].yCoordinate = value;
    });

    setInputs(updatedInputs);
  }

  function handleInputChange({ id, value }: { id: keyof typeof defaultInputs; value: string }) {
    setInputs({
      ...inputs,
      [id]: getValidatedInput({
        input: inputs[id],
        value,
        touched: false,
      }),
    });
  }

  function handleSubmit() {
    // Scroll to first input with error
    let firstInvalidCoordinate: number | null = null;
    const updatedInputs = handleAllValidate();
    firstInvalidCoordinate = getFirstInvalidInput(updatedInputs);

    if (firstInvalidCoordinate !== null) {
      console.log('firstInavlidCoordinate', firstInvalidCoordinate);
      scrollView?.current?.scrollTo({
        x: 0,
        y: firstInvalidCoordinate,
        animated: true,
      });
    } else {
      // pass values to user
      let _values: V = {} as V;
      for (const [key, input] of Object.entries(updatedInputs)) {
        _values = { ..._values, [key]: input.value };
      }
      valuesRef.current = _values;
      // console.log(`[ValidatedElements.tsx]/handleSubmit _values=${_values}`);
    }
  }

  const isTextInput = (child: IChild<T>) => ['AppInput', 'TestTextInput'].includes(child.type.name);
  const isButton = (child: IChild<T>) => ['AppButton', 'Button'].includes(child.type.name);

  const handleOnFocusedScroll = (id: keyof T) => {
    const yCoordinate = inputs[id]?.yCoordinate;
    // onsole.log(`[ValidateElements/handleOnFocus] id=${id} yCoordinate=${yCoordinate}`);
    if (yCoordinate && yCoordinate > 100) {
      const delay = Platform.OS === 'ios' ? 1 : 150;
      setTimeout(() => {
        scrollView?.current?.scrollTo({
          x: 0,
          y: yCoordinate! - SCROLL_OFFSET_TOP,
          animated: true,
        });
      }, delay);
    }
  };

  function renderChildren(): React.ReactNode {
    return React.Children.map(children as IChild<T>[], (child: IChild<T>) => {
      // console.log(child.type.name);
      if (isTextInput(child)) {
        const { id, onFocus }: IAppInputProps<T> = child.props;
        if (!id) {
          return child;
        } // add new
        const inputRef = React.createRef<TextInput>();
        inputRefs.push(inputRef);

        return React.cloneElement(child, {
          newRef: inputRef,
          onChangeText: (value: string) => handleInputChange({ id, value }),
          onLayout: ({ nativeEvent }: LayoutChangeEvent) => {
            setInputPosition({ ids: [id], value: nativeEvent.layout.y });
          },
          onFocusedScroll: () => handleOnFocusedScroll(id),
          /* onFocus: (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            onFocus && onFocus(e);
            handleOnFocus(id);
          }, */
          value: inputs[id].value,
          error: inputs[id].errorLabel,
          touched: Boolean(inputs[id].touched),
        });
      } else if (isButton(child)) {
        // console.log('[ValidatedElements/renderChildren', child.type.name);
        const { onPress } = child.props;
        return React.cloneElement(child, {
          newRef: buttonRef,
          disabled: isErrors || isErrors === undefined, // || (initInputs && isEqual),
          onPress: () => {
            handleSubmit();
            onPress();
          },
        });
      }
      return child;
    });
  }

  if (!scrollView) {
    return <ScrollView ref={_scrollView}>{renderChildren()}</ScrollView>;
  }

  return <>{renderChildren()}</>;
}

export default ValidatedElements;

/* const handleOnBlur = (id: keyof T) => {
  const yCoordinate = inputs[id]?.yCoordinate;
  console.log(
    `[ValidateElements/handleOnBlur] id=${id} yCoordinate=${yCoordinate} scrollView.current=${scrollView?.current}`,
  );
  if (yCoordinate && yCoordinate > 140) {
    console.log(`[ValidateElements/handleOnFocus] id=${id} yCoordinate=${yCoordinate} should be scroll`);
    scrollView?.current?.scrollTo({
      x: 1,
      y: yCoordinate! + 30,
      animated: true,
    });
  }
}; */

/*   function handleClean() {
  // Clear text inputs
  console.log(`* begin cleaning *`);
  let clearInputs = inputs;
  inputRefs.map((inputRef: RefObject<TextInput>) => inputRef.current?.clear());
  for (const key of Object.keys(inputs)) {
    clearInputs = {
      ...clearInputs,
      [key]: {
        type: inputs[key].type,
        value: '',
        touched: false,
        virgin: true,
      },
    };
  }
  setInputs({
    ...inputs,
    ...clearInputs,
  });
  // setIsErrors(false);
  console.log(`[ValidateElements/handleClean] inputs=${JSON.stringify(clearInputs, null, 2)}`);
} */

/*
const _isEqual = (): boolean => {
  let __isEqual = true;
  Object.keys(inputs).map((key: keyof T) => {
    if (
      initInputs.hasOwnProperty(key) &&
      initInputs[key]?.toString().toLowerCase() !== inputs[key].value.toString().toLowerCase()
    ) {
      __isEqual = false;
    }
  });
  return __isEqual;
}; */

/* useEffect(() => {
  if (initInputs) {
    // Проверяем изменились ли деволтные данные
    const _equal = _isEqual();
    setIsEqual(_equal);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [initInputs, inputs]); */
