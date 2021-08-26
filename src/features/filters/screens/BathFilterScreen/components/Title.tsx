import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { AppText, Block } from '~/src/app/common/components/UI';
import { IRootState } from '~/src/app/store/rootReducer';
import { CloseFilerIcon } from '~/src/assets';
import { styles as s } from '../styles';

export function Title({ onPress }: { onPress: () => void }) {
  const { filterCount } = useSelector((state: IRootState) => state.filter);
  return (
    <Block center row space="between">
      <AppText h1>Выбрано фильтров</AppText>
      <AppText margin={[0, 0, 0, 11]} style={s.button} semibold h2>
        {filterCount}
      </AppText>
      <TouchableOpacity
        style={[s.closeIcon, s.border, { marginBottom: 0 }]}
        onPress={onPress}>
        <CloseFilerIcon />
      </TouchableOpacity>
    </Block>
  );
}