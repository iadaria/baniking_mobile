import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IUiInput } from '~/src/app/models/input';
import { colors, sizes } from '~/src/app/common/constants';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface IProps extends IUiInput {
  isFocused: boolean;
}

export default function AppInputError(props: IProps) {
  const { error, isFocused } = props;
  return (
    <>
      {error && !isFocused ? (
        <View>
          <Text style={styles.error}>{error}</Text>
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
