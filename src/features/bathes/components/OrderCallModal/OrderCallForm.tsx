import React from 'react';
import { AppButton, AppInput, AppText, Block } from '~/src/app/common/components/UI';
import ValidatedElements from '~/src/app/common/components/ValidatedElements';
import { AuthLogoLeft, AuthLogoRight, NecessaryIcon } from '~/src/assets';
import { defaultOrderCallInputs } from '../../contracts/orderCallInputs';
import { IOrderCall } from '~/src/app/models/bath';
import { sizes } from '~/src/app/common/constants';

interface IProps {
  name: string;
  phone: string;
}

export default function OrderCallForm({ name, phone }: IProps) {
  const [recreate, setRecreate] = React.useState<boolean>(true);
  // Use ref because don't need rendering component
  const valuesRef = React.useRef<Partial<IOrderCall>>({ name, phone });

  const handleOrderCall = () => {
    if (valuesRef.current) {
    }
  };

  return (
    <ValidatedElements key={Number(recreate)} defaultInputs={defaultOrderCallInputs} valuesRef={valuesRef}>
      <Block margin={[0, 0, 3]} row middle center>
        <AuthLogoLeft />
        <AppText style={{ marginHorizontal: 15 }} h2 trajan primary>
          Заказать звонок
        </AppText>
        <AuthLogoRight />
      </Block>
      {/* Имя */}
      <AppInput id="name" label="Имя" placeholder="Введите имя" maxLength={16} />
      {/* Phone */}
      <AppInput id="phone" label="Телефон" placeholder="+7(___)___-__-__" mask="+7([000])[000]-[00]-[00]" phone />
      {/* Button */}
      <AppButton onPress={handleOrderCall}>
        <AppText center medium>
          Запросить звонок
        </AppText>
      </AppButton>
    </ValidatedElements>
  );
}
