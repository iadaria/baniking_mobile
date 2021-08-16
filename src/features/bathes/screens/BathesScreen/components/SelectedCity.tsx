import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppText } from '~/src/app/common/components/UI';
import { routes } from '~/src/navigation/helpers/routes';
import { checkCity } from '~/src/features/cities/store/cityActions';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { IRootState } from '~/src/app/store/rootReducer';
import { LocationIcon } from '~/src/assets';
import { styles as s } from '../styles';
import { capitalizeFirstLetter } from '~/src/app/utils/string';

export function SelectedCity() {
  const { loading, selectedCity } = useSelector(({ city }: IRootState) => city);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkCity());
  }, [dispatch]);

  if (loading) {
    return null;
  }

  const showName = selectedCity
    ? capitalizeFirstLetter(selectedCity.name)
    : 'Выберите город';

  return (
    <TouchableOpacity
      style={s.city}
      onPress={() => RootNavigation.navigate(routes.bathesTab.CitiesScreen)}>
      <LocationIcon />
      <AppText padding={[3]}>{showName}</AppText>
    </TouchableOpacity>
  );
}
