import React from 'react';
import { AppInput, AppText, Block } from '~/src/app/common/components/UI';
import { styles } from './styles';
import { CloseFilerIcon } from '~/src/assets';
import { TouchableOpacity } from 'react-native-gesture-handler';

const RightButton = () => (
  <TouchableOpacity style={styles.toggle} onPress={() => console.log('close')}>
    <CloseFilerIcon />
  </TouchableOpacity>
);

export function BathesFilterScreen() {
  return (
    <Block full base>
      {/* Заголовок */}
      <Block style={{ justifyContent: 'space-between' }} center row>
        <AppText h1>Выбрано фильтров</AppText>
        <AppText margin={[0, 0, 0, 11]} style={styles.button} semibold h2>
          3
        </AppText>
        <Block style={[styles.element, styles.border]}>
          <CloseFilerIcon />
        </Block>
      </Block>
      {/* Стоимость */}
      <AppText margin={[4, 0, 3]}>Стоимость в час</AppText>
      <Block center row>
        <AppText margin={[0, 3, 0, 0]} tag>
          от
        </AppText>
        <AppInput style={styles.input} rightButton={<RightButton />} number />
        <AppText margin={[0, 2.5]} tag>
          до
        </AppText>
        <AppInput style={styles.input} rightButton={<RightButton />} number />
        <AppText margin={[0, 3]} tag>
          руб/час
        </AppText>
      </Block>
      {/* <AppInput /> */}
      {/* Фильтр 1 */}
      <Block margin={[5, 0]}>
        <AppText style={[styles.element]} tag>
          Русская баня
        </AppText>
        <AppText>Альпийская краксен</AppText>
      </Block>
    </Block>
  );
}
