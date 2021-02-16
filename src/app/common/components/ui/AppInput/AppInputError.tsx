import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IUiInput } from '~/src/app/models/ui';
import { colors, sizes } from '~/src/app/common/constants';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface IProps extends IUiInput {
  isFocused: boolean;
  isTouched: boolean;
}

/** Как только пользователь начал исправлять значение, красная подсветка поля исчезает,
 * и цвет текста ошибки меняется на черный.Текст ошибки пропадает по потере фокуса и больше
 * не появляется, если поле заново получает фокус.
 */

export default function AppInputError(props: IProps) {
  const { error, isFocused, isTouched } = props;
  const errorColor = { color: isFocused ? colors.primary : colors.error };
  return (
    <>
      {error /* && !isFocused */ && (isTouched || isFocused) ? (
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
