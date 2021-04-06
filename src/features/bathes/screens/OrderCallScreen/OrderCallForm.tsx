import React, { useEffect, useState } from 'react';
import { AppButton, AppInput, AppText, Block } from '~/src/app/common/components/UI';
import ValidatedElements from '~/src/app/common/components/ValidatedElements';
import { AuthLogoLeft, AuthLogoRight } from '~/src/assets';
import { defaultOrderCallInputs, IOrderCallInputs } from '../../contracts/orderCallInputs';
import { IOrderCall } from '~/src/app/models/bath';
import { ScrollView } from 'react-native';
import { Node } from 'react-native-reanimated';

interface IProps {
  name: string;
  phone: string;
  scrollViewRef: React.RefObject<ScrollView>;
  blockPosition: number;
  scrollPosition?: number;
  defaultInputs: IOrderCallInputs;
}

export default function OrderCallForm({ name, phone, scrollViewRef, blockPosition, defaultInputs }: IProps) {
  const [recreate, setRecreate] = React.useState<boolean>(true);
  const valuesRef = React.useRef<Partial<IOrderCall>>({ name: 'Daria', phone: phone });
  const timeIds: NodeJS.Timeout[] = [];

  useEffect(() => {
    return () => {
      __DEV__ && console.log('[OrderCallForm/useEffect/timeIds change]', timeIds);
      timeIds.forEach((timeId: NodeJS.Timeout) => clearTimeout(timeId));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOrderCall = () => {
    if (valuesRef.current) {
    }
  };

  const scrollToBlock = (plus: number) => {
    __DEV__ && console.log('to', blockPosition);
    const timeId = setTimeout(() => {
      scrollViewRef?.current?.scrollTo({
        x: 0,
        y: blockPosition + plus,
        animated: true,
      });
    }, 300);
    __DEV__ && console.log('[OrderCallForm/timeId]', timeId);
    timeIds.push(timeId);
  };

  return (
    <ValidatedElements
      key={Number(recreate)}
      defaultInputs={defaultOrderCallInputs}
      scrollView={scrollViewRef}
      checkAfterInit={true}
      valuesRef={valuesRef}>
      <Block margin={[0, 0, 3]} row middle center>
        <AuthLogoLeft />
        <AppText style={{ marginHorizontal: 15 }} h2 trajan primary>
          Заказать звонок
        </AppText>
        <AuthLogoRight />
      </Block>
      {/* Имя */}
      <AppInput
        id="name"
        label="Имя"
        placeholder="Введите имя"
        defaultValue="Daria"
        maxLength={16}
        onFocus={scrollToBlock.bind(null, 100)}
      />
      {/* Phone */}
      <AppInput
        id="phone"
        label="Телефон"
        placeholder="+7(___)___-__-__"
        defaultValue={phone}
        mask="+7([000])[000]-[00]-[00]"
        onFocus={scrollToBlock.bind(null, 150)}
        phone
      />
      {/* Button */}
      <AppButton onPress={handleOrderCall}>
        <AppText center medium>
          Запросить звонок
        </AppText>
      </AppButton>
    </ValidatedElements>
  );
}
