import React from 'react';
import { getValidatedInput } from '~/src/app/utils/validate';
import { ScrollView, LayoutChangeEvent } from 'react-native';
import { IInput } from '~/src/app/models/validate';
import { IAppInputProps } from '~/src/app/models/input';
// import { IAppInputProps } from './UI/AppInput/AppInput';

//interface IChild<T> extends JSX.Element, ITextInputProps<T> {}
interface IChild<T> extends JSX.Element, IAppInputProps<T> {}

function ValidatedElements<T extends { [key: string]: IInput }>({
  children,
  defaultInputs,
  scrollView,
  setValues,
}: {
  children?: React.ReactNode;
  defaultInputs: T;
  scrollView?: React.RefObject<ScrollView>;
  setValues: (values: {}) => void;
}): JSX.Element {
  const [inputs, setInputs] = React.useState<T>(defaultInputs);
  const [isErrors, setIsErrors] = React.useState<boolean>();
  const _scrollView = React.useRef<ScrollView>(null);

  React.useEffect(() => {
    console.log('changed inputs', JSON.stringify(inputs, null, 4));

    let _isErrors = false; // предположим - ошибок нет
    let whatError: string;
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
      scrollView?.current?.scrollTo({
        x: 0,
        y: firstInvalidCoordinate,
        animated: true,
      });
    } else {
      // pass values to user
      let values = {};
      for (const [key, input] of Object.entries(inputs)) {
        values = { ...values, [key]: input.value };
      }
      setValues(values);
    }
  }

  const isTextInput = (child: IChild<T>) => ['AppInput', 'TestTextInput'].includes(child.type.name);
  const isButton = (child: IChild<T>) => ['AppButton', 'Button'].includes(child.type.name);

  function renderChildren(): React.ReactNode {
    return React.Children.map(children as IChild<T>[], (child: IChild<T>) => {
      if (isTextInput(child)) {
        // const { id }: ITextInputProps<T> = child.props;
        const { id }: IAppInputProps<T> = child.props;
        return React.cloneElement(child, {
          onChangeText: (value: string) => handleInputChange({ id, value }),
          onLayout: ({ nativeEvent }: LayoutChangeEvent) => {
            setInputPosition({ ids: [id], value: nativeEvent.layout.y });
          },
          error: inputs[id].errorLabel,
          touched: Boolean(inputs[id].touched),
        });
      } else if (isButton(child)) {
        const { onPress } = child.props;
        return React.cloneElement(child, {
          disabled: isErrors || isErrors === undefined,
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
