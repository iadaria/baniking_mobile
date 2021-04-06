import React from 'react';
import { AppButton, AppInput, AppText, Block } from '~/src/app/common/components/UI';
import ValidatedElements from '~/src/app/common/components/ValidatedElements';
import { AuthLogoLeft, AuthLogoRight } from '~/src/assets';
import { defaultOrderCallInputs } from '../../contracts/orderCallInputs';
import { IOrderCall } from '~/src/app/models/bath';
import { ScrollView } from 'react-native';

interface IProps {
  name: string;
  phone: string;
  scrollViewRef?: React.RefObject<ScrollView>;
  scrollPosition?: number;
}

export default function OrderCallForm({ name, phone, scrollViewRef, scrollPosition }: IProps) {
  const [recreate, setRecreate] = React.useState<boolean>(true);

  const valuesRef = React.useRef<Partial<IOrderCall>>({ name, phone });

  const handleOrderCall = () => {
    if (valuesRef.current) {
    }
  };

  return (
    <ValidatedElements
      key={Number(recreate)}
      defaultInputs={defaultOrderCallInputs}
      scrollView={scrollViewRef}
      scrollPosition={scrollPosition}
      valuesRef={valuesRef}>
      <Block margin={[0, 0, 3]} row middle center>
        <AuthLogoLeft />
        <AppText style={{ marginHorizontal: 15 }} h2 trajan primary>
          Заказать звонок
        </AppText>
        <AuthLogoRight />
      </Block>
      {/* Имя */}
      <AppInput id="name" label="Имя" placeholder="Введите имя" maxLength={16} isScrollToFocused />
      {/* Phone */}
      <AppInput
        id="phone"
        label="Телефон"
        placeholder="+7(___)___-__-__"
        mask="+7([000])[000]-[00]-[00]"
        phone
        isScrollToFocused
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
