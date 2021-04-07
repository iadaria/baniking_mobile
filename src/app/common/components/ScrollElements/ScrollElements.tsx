import React, { RefObject, ReactNode, useState, useRef, useEffect } from 'react';
import {
  ScrollView,
  LayoutChangeEvent,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleSheet,
} from 'react-native';
import { IInput } from '~/src/app/models/validate';
import { sizes } from '../../constants/sizes';

interface IChild<T> extends JSX.Element {}

interface IProps<T> {
  children?: ReactNode;
  defaultInputs: T;
}

interface IKey {
  [key: string]: any;
}

const SCROLL_OFFSET_TOP = 150;
const SCROLL_OFFSET_BOTTOM = 80; // Минимальный показатель
//const SCROLL_MAX = 50;

function ScrollElements<T extends { [key: string]: IInput }>({ children, defaultInputs }: IProps<T>): JSX.Element {
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollPosition, setScrollPosition] = useState<number | undefined>();
  const [inputs, setInputs] = useState<T>(defaultInputs);
  const inputRefs: RefObject<JSX.Element>[] = [];

  /* useEffect(() => {
    __DEV__ && console.log('[ValidateElements/useEffect]', JSON.stringify(inputs, null, 4));
  }, [inputs]); */

  const handleOnFocusedScroll = (id: keyof T) => {
    // Координата поля для ввода
    const yCoordinate = inputs[id]?.yCoordinate;
    // __DEV__ && console.log(`\n[ValidateElements/handleOnFocus] id=${id} yCooridnate=${yCoordinate} Detect need scroll?`);

    // Делаем скролл если фокус в поле,которое ниже середины экрана
    if (yCoordinate && yCoordinate > SCROLL_OFFSET_TOP) {
      // __DEV__ && console.log(`[ValidateElements/handleOnFocus] id=${id} yCoordinate=${yCoordinate}. Must be scroll!`);
      const delay = Platform.OS === 'ios' ? 10 : 150;
      setTimeout(() => {
        scrollViewRef?.current?.scrollTo({
          x: 0,
          y: yCoordinate! - SCROLL_OFFSET_TOP,
          animated: true,
        });
      }, delay);
      // Или фокус в поле которое выше середине экрана
    } else if (scrollPosition && yCoordinate && yCoordinate > 0 && scrollPosition > SCROLL_OFFSET_BOTTOM) {
      const newCoordinat = yCoordinate! - 100;
      const delay = Platform.OS === 'ios' ? 10 : 150;
      /* __DEV__ && console.log(
        `[ValidateElements/handleOnFocus] id=${id} yCoordinate=${yCoordinate}. Must be scroll to ${newCoordinat}!`,
      ); */
      setTimeout(() => {
        scrollViewRef?.current?.scrollTo({
          x: 0,
          y: newCoordinat,
          animated: true,
        });
      }, delay);
    }
  };

  /* useEffect(() => {
    __DEV__ && console.log(`[ValidateElements/useEffect/[scrollPosition]] = ${scrollPosition}`);
  }, [scrollPosition]); */

  function setInputPosition({ ids, value }: { ids: [keyof typeof inputs]; value: number }) {
    const updatedInputs: T /* IInputs  */ = { ...inputs };

    if (value === 0) {
      return;
    }

    ids.forEach((id: keyof typeof inputs) => {
      updatedInputs[id].yCoordinate = value;
    });
    // setInputs(updatedInputs);
    setInputs({ ...inputs, ...updatedInputs });
  }

  const isElement = (child: JSX.Element) => ['AppInput', 'TestTextInput'].includes(child.type.name);
  const isBlock = (child: JSX.Element) => ['Block'].includes(child.type.name);

  // Привязываем к элементу скролл при получении фокуса
  function renderSingleClone(child: IChild<T>, id: string) {
    return React.cloneElement(child, {
      onLayout: ({ nativeEvent }: LayoutChangeEvent) => {
        setInputPosition({ ids: [id], value: nativeEvent.layout.y });
      },
      onFocusedScroll: () => handleOnFocusedScroll(id),
    });
  }

  function renderChildren(_children: ReactNode, parentId?: string): React.ReactNode {
    return React.Children.map(_children as IChild<T>[], (child: IChild<T>) => {
      const { id, isScrollToFocused } = child.props;

      if (id && isBlock(child)) {
        const clonedChildren = renderChildren(child.props.children, id);
        return React.cloneElement(child, {
          onLayout: ({ nativeEvent }: LayoutChangeEvent) => {
            setInputPosition({ ids: [id], value: nativeEvent.layout.y });
          },
          children: clonedChildren,
        });
      }
      if (isElement(child) && isScrollToFocused) {
        const inputRef = React.createRef<JSX.Element>();
        inputRefs.push(inputRef);

        if (scrollViewRef && isScrollToFocused) {
          if (parentId) {
            return renderSingleClone(child, parentId);
          } else if (id) {
            return renderSingleClone(child, id);
          }
        }
      }
      return child;
    });
  }

  return (
    <ScrollView
      style={styles.scrollView}
      ref={scrollViewRef}
      scrollToOverflowEnabled
      onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) =>
        setScrollPosition(event.nativeEvent.contentOffset.y)
      }
      scrollEventThrottle={20}
      alwaysBounceHorizontal
      keyboardDismissMode="interactive"
      contentContainerStyle={styles.scrollView}>
      {renderChildren(children)}
    </ScrollView>
  );
}

export default ScrollElements;

export const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    padding: sizes.offset.base * 2,
  },
});
