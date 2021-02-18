import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IUiText } from '~/src/app/models/ui';
import { colors, sizes } from '~/src/app/common/constants';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface IProps<T> extends IUiText {
  isFocused: boolean;
  isTouched: boolean;
  isVirgin?: boolean;
  error?: string;
  id?: keyof T;
}

/** Как только пользователь начал исправлять значение, красная подсветка поля исчезает,
 * и цвет текста ошибки меняется на черный.Текст ошибки пропадает по потере фокуса и больше
 * не появляется, если поле заново получает фокус.
 */

export default function AppInputError<T>(props: IProps<T>) {
  const { error, isFocused, isTouched, isVirgin, id } = props;
  const errorColor = { color: isFocused ? colors.primary : colors.error };

  // console.log(`[AppInputError: id='${id}' error='${!!error}'], isVirgin=${isVirgin}, isFocused=${isFocused}`);
  // Не показывать ошибку если это первый вводй и поля еще ниразу не touched
  if (!!error && isVirgin && isFocused) {
    // console.log(`[AppInputError/if: error='${!!error}'], isVirgin=${isVirgin}, isFocused=${isFocused}`);
    return null;
  }

  return (
    <>
      {!!error && (isTouched || isFocused) ? (
        <View>
          <Text style={[styles.error, errorColor]}>{error}</Text>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  error: {
    color: colors.error,
    textAlign: 'center',
    fontSize: wp(sizes.input.label),
  },
});
