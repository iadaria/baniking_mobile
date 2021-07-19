import React from 'react';
import { AppButton, AppText, Block } from '~/src/app/common/components/UI';
import { multiplier } from '~/src/app/common/constants';
import { TextInput } from 'react-native';
import { Header } from '~/src/app/common/components/Header';

export function HelpScreen() {
  return (
    <Block full base>
      <Header iconKind="backward" />
      <AppText h1>Помощь</AppText>
      <AppText margin={[6 * multiplier, 0, 0]} medium>
        Вопрос который вас интересует
      </AppText>
      <AppText margin={[2, 0]} height={18} tag>
        Опишите подробно свой вопрос касательно работы приложения, и мы
        постараемся дать на него ответ в кратчайшие сроки.
      </AppText>
      <TextInput
        style={{ backgroundColor: 'white', borderRadius: 8 }}
        multiline={true}
        numberOfLines={15}
      />
      <AppButton margin={[3, 0]}>
        <AppText center>Задать вопрос</AppText>
      </AppButton>
    </Block>
  );
}
