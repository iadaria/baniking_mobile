import React from 'react';
import { useSelector } from 'react-redux';
import { AppText, Block } from '~/src/app/common/components/UI';
import { LocationIcon } from '~/src/assets';
import { styles as s } from '../styles';
import { IRootState } from '~/src/app/store/rootReducer';

export function City() {
  const { selectedCity } = useSelector(({ city }: IRootState) => city);

  if (!selectedCity) return null;

  return (
    <Block style={s.city} margin={[0, 4, 2]} row center>
      <LocationIcon />
      <AppText padding={[3]}>{selectedCity.name}</AppText>
    </Block>
  );
}
