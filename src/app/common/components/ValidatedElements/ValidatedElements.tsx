import React, { MutableRefObject, useRef, useState, RefObject, useEffect, ReactNode } from 'react';
import { getValidatedInput } from '~/src/app/utils/validate';
import { ScrollView, LayoutChangeEvent, TextInput, TouchableOpacity, Platform } from 'react-native';
import { IInput } from '~/src/app/models/validate';
import { IAppInputProps } from '~/src/app/models/ui';
import { IErrors } from '~/src/app/utils/error';

interface IChild<T> extends JSX.Element, IAppInputProps<T> {}

interface IProps<T, V> {
  children?: ReactNode;
  defaultInputs: T;
  scrollView?: RefObject<ScrollView>;
  scrollPosition?: number;
  valuesRef: MutableRefObject<V>;
  nameForm?: string;
  // initInputs?: V;
  errors?: IErrors | null;
}

const SCROLL_OFFSET_TOP = 150;
const SCROLL_OFFSET_BOTTOM = 80; // Минимальный показатель
const SCROLL_MAX = 50;

function ValidatedElements<T extends { [key: string]: IInput }, V>({
  children,
  defaultInputs,
  scrollView,
  scrollPosition,
  valuesRef,
  nameForm,
  errors,
}: IProps<T, V>): JSX.Element {
  const [inputs, setInputs] = useState<T>(defaultInputs);
  const [isErrors, setIsErrors] = useState<boolean>();
  const inputRefs: RefObject<TextInput>[] = [];
  const buttonRef = useRef<TouchableOpacity>();

  useEffect(() => {
    // console.log(`[ValidateElements/${nameForm}/useEffect]`, JSON.stringify(inputs, null, 4));

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

    /* console.log(
      `[ValidatedElements/searchErrors] isErrors = ${isErrors}/_isErrors = ${_isErrors} ('${whatError}')\n` +
        ` allRequire = ${_allRequired} --------- `,
    ); */

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs]);

  useEffect(() => {
    // Если после submit со стороны сервера пришли ошибки - отображаем их
    if (errors) {
      const inputsWithErrors = { ...inputs };
      for (const key of Object.keys(inputs)) {
        if (errors.hasOwnProperty(key)) {
          inputsWithErrors[key].errorLabel = errors[key];
        }
      }
      setInputs({ ...inputs, ...inputsWithErrors });

      // Делаем скролл на первую ошибку если она присутствует
      const firstInvalidCoordinate = getFirstInvalidInput(inputsWithErrors);

      if (firstInvalidCoordinate !== null) {
        scrollToFirstInvalidInput(firstInvalidCoordinate);
      }
    }
    console.log('[ValidateElements/useEffect/errors] errors', { errors });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  /* useEffect(() => {
    console.log(`[ValidateElements/useEffect/[scrollPosition]] = ${scrollPosition}`);
  }, [scrollPosition]); */

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
    if (!scrollView) {
      return null;
    }

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
    // setInputs({ ...inputs, ...updatedInputs });
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
      scrollToFirstInvalidInput(firstInvalidCoordinate);
      /* console.log('firstInavlidCoordinate', firstInvalidCoordinate);
      scrollView?.current?.scrollTo({
        x: 0,
        y: firstInvalidCoordinate,
        animated: true,
      }); */
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

  function scrollToFirstInvalidInput(firstInvalidCoordinate: number) {
    if (firstInvalidCoordinate !== null) {
      console.log('firstInavlidCoordinate', firstInvalidCoordinate);
      scrollView?.current?.scrollTo({
        x: 0,
        y: firstInvalidCoordinate,
        animated: true,
      });
    }
  }

  const isTextInput = (child: IChild<T>) => ['AppInput', 'TestTextInput'].includes(child.type.name);
  const isButton = (child: IChild<T>) => ['AppButton', 'Button'].includes(child.type.name);

  const handleOnFocusedScroll = (id: keyof T) => {
    // Координата поля для ввода
    const yCoordinate = inputs[id]?.yCoordinate;
    console.log(`\n[ValidateElements/handleOnFocus] id=${id} yCooridnate=${yCoordinate} Detect need scroll?`);

    // Делаем скролл если фокус в поле,которое ниже середины экрана
    // Или фокус в поле которое выше середине экрана
    if (
      yCoordinate &&
      (yCoordinate > SCROLL_OFFSET_TOP || yCoordinate > SCROLL_OFFSET_BOTTOM)
      // (scrollPosition && scrollPosition > SCROLL_OFFSET_BOTTOM)
    ) {
      console.log(`[ValidateElements/handleOnFocus] id=${id} yCoordinate=${yCoordinate}. Must be scroll!`);
      const delay = Platform.OS === 'ios' ? 10 : 150;
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
        const { id /* onFocus */ }: IAppInputProps<T> = child.props;
        if (!id) {
          return child;
        } // add new
        const inputRef = React.createRef<TextInput>();
        inputRefs.push(inputRef);

        const _child = React.cloneElement(child, {
          newRef: inputRef,
          onChangeText: (value: string) => handleInputChange({ id, value }),
          value: inputs[id].value,
          error: inputs[id].errorLabel,
          touched: Boolean(inputs[id].touched),
        });

        if (scrollView) {
          return React.cloneElement(_child, {
            onLayout: ({ nativeEvent }: LayoutChangeEvent) => {
              setInputPosition({ ids: [id], value: nativeEvent.layout.y });
            },
            onFocusedScroll: () => handleOnFocusedScroll(id),
          });
        }

        return _child;
      } else if (isButton(child)) {
        // Поведене для кнопки
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

  return <>{renderChildren()}</>;
}

export default ValidatedElements;

/* onLayout: ({ nativeEvent }: LayoutChangeEvent) => {
  setInputPosition({ ids: [id], value: nativeEvent.layout.y });
},
onFocusedScroll: () => handleOnFocusedScroll(id),
*/
/* onFocus: (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
  onFocus && onFocus(e);
  handleOnFocus(id);
}, */

/* if (!scrollView) {
    return <ScrollView ref={_scrollView}>{renderChildren()}</ScrollView>;
  } */
