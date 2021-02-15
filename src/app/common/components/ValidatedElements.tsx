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
}: {
  children?: React.ReactNode;
  scrollView?: React.RefObject<ScrollView>;
  defaultInputs: T;
}): JSX.Element {
  const [inputs, setInputs] = React.useState<T>(defaultInputs);
  const [isErrors, setIsErrors] = React.useState<boolean>(false);
  const _scrollView = React.useRef<ScrollView>(null);

  React.useEffect(() => {
    console.log('changed inputs', JSON.stringify(inputs, null, 4));
    searchErrors();
  }, [inputs]);

  const searchErrors = React.useCallback(() => {
    let _isErrors = false;
    Object.values(inputs).map(({ errorLabel }: IInput) => {
      if (errorLabel) {
        setIsErrors(true);
        _isErrors = true;
      }
    });
    !_isErrors && setIsErrors(false);
  }, [inputs]);

  function handleAllValidate(): T /* IInputs */ {
    console.log('[handleAllValidate]');
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
    let firstInvalidCoordinate: number | null = null;
    const updatedInputs = handleAllValidate();
    firstInvalidCoordinate = getFirstInvalidInput(updatedInputs);

    if (firstInvalidCoordinate !== null) {
      scrollView?.current?.scrollTo({
        x: 0,
        y: firstInvalidCoordinate,
        animated: true,
      });
    }
  }

  const isTextInput = (child: IChild<T>) => ['AppInput', 'TestTextInput'].includes(child.type.name);
  const isButton = (child: IChild<T>) => ['AppButton', 'Button'].includes(child.type.name);

  function renderChildren(): React.ReactNode {
    return React.Children.map(children as IChild<T>[], (child: IChild<T>) => {
      console.log('***** App Input', child.type.name);
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
          disabled: isErrors,
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
