import React from 'react';
import { AppButton, AppInput, AppText, Block } from '~/src/app/common/components/UI';
import { multiplier, sizes } from '~/src/app/common/constants';
import { TextInput } from 'react-native';

export function HelpScreen() {
  return (
    <Block padding={[sizes.offset.base * multiplier, sizes.offset.base, 0]}>
      <AppText h1>Помощь</AppText>
      <AppText margin={[6 * multiplier, 0, 0]} medium>
        Вопрос который вас интересует
      </AppText>
      <AppText margin={[2, 0]} height={18} tag>
        Опишите подробно свой вопрос касательно работы приложения, и мы постараемся дать на него ответ в кратчайшие
        сроки.
      </AppText>
      <TextInput style={{ backgroundColor: 'white', borderRadius: 8}} multiline={true} numberOfLines={15} />
      <AppButton margin={[3, 0]}>
        <AppText center>Задать вопрос</AppText>
      </AppButton>
    </Block>
  );
}

// const styles = StyleSheet.create({});
