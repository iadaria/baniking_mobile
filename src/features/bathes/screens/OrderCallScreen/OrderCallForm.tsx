import React, { useEffect } from 'react';
import { AppButton, AppInput, AppText, Block } from '~/src/app/common/components/UI';
import ValidatedElements from '~/src/app/common/components/ValidatedElements';
import { AuthLogoLeft, AuthLogoRight } from '~/src/assets';
import { IOrderCallInputs } from '../../contracts/orderCallInputs';
import { IOrderCall, IOrderCallParams } from '~/src/app/models/bath';
import { ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import routes from '~/src/navigation/helpers/routes';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  bathId: number;
  scrollViewRef: React.RefObject<ScrollView>;
  blockPosition: number;
  scrollPosition?: number;
  defaultInputs: IOrderCallInputs;
  orderCall: (orderCallParams: IOrderCallParams) => void;
}

export default function OrderCallForm({
  navigation,
  bathId,
  scrollViewRef,
  blockPosition,
  defaultInputs,
  orderCall,
}: IProps) {
  //const [recreate, setRecreate] = React.useState<boolean>(true);
  const valuesRef = React.useRef<IOrderCall>({ name: defaultInputs.name, phone: defaultInputs.phone });
  const timeIds: NodeJS.Timeout[] = [];

  useEffect(() => {
    return () => {
      // __DEV__ && console.log('[OrderCallForm/useEffect/timeIds change]', timeIds);
      timeIds.forEach((timeId: NodeJS.Timeout) => clearTimeout(timeId));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOrderCall = () => {
    if (valuesRef.current) {
      const orderCallParams = {
        bathId,
        name: valuesRef.current.name!,
        phone: valuesRef.current.phone!,
      };
      orderCall(orderCallParams);
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate(routes.bathesTab.BathScreen);
      }
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
    }, 500);
    __DEV__ && console.log('[OrderCallForm/timeId]', timeId);
    timeIds.push(timeId);
  };

  return (
    <ValidatedElements
      //key={Number(recreate)}
      defaultInputs={defaultInputs}
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
        maxLength={16}
        onFocus={scrollToBlock.bind(null, 100)}
      />
      {/* Phone */}
      <AppInput
        id="phone"
        label="Телефон"
        placeholder="+7(___)___-__-__"
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
