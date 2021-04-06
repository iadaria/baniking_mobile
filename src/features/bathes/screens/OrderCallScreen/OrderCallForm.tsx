import React, { useEffect } from 'react';
import { AppButton, AppInput, AppText, Block } from '~/src/app/common/components/UI';
import ValidatedElements from '~/src/app/common/components/ValidatedElements';
import { AuthLogoLeft, AuthLogoRight } from '~/src/assets';
import { defaultOrderCallInputs } from '../../contracts/orderCallInputs';
import { IOrderCall } from '~/src/app/models/bath';
import { ScrollView } from 'react-native';

interface IProps {
  name: string;
  phone: string;
  scrollViewRef: React.RefObject<ScrollView>;
  blockPosition: number;
  scrollPosition?: number;
}

export default function OrderCallForm({ name, phone, scrollViewRef, blockPosition }: IProps) {
  const [recreate, setRecreate] = React.useState<boolean>(true);

  const valuesRef = React.useRef<Partial<IOrderCall>>({ name: 'Daria', phone: phone });

  const handleOrderCall = () => {
    if (valuesRef.current) {
    }
  };

  __DEV__ && console.log('[OrderCallForm] name', name);

  const scrollToBlock = (plus: number) => {
    __DEV__ && console.log('to', blockPosition);
    setTimeout(() => {
      scrollViewRef?.current?.scrollTo({
        x: 0,
        y: blockPosition + plus,
        animated: true,
      });
    }, 300);
  };

  return (
    <ValidatedElements
      key={Number(recreate)}
      defaultInputs={defaultOrderCallInputs}
      scrollView={scrollViewRef}
      //scrollPosition={scrollPosition}
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
