import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppText, Block } from '~/src/app/common/components/UI';
import { LocationIcon } from '~/src/assets';
import { styles as s } from '../styles';

export function City() {
  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch(fetchCities());
  }, [dispatch]);

  return (
    <Block style={s.city} margin={[0, 4, 2]} row center>
      <LocationIcon />
      <AppText padding={[3]}>Moscow</AppText>
    </Block>
  );
}
