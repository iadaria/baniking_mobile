import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { AppText } from '~/src/app/common/components/UI';
import { upFirstLetter } from '~/src/app/utils/string';
import { City } from '~/src/app/models/city';
import { checkCity as checkCityAction } from '~/src/features/cities/store/cityActions';
import { useDebounced } from '~/src/features/filters/hooks/useDebounced';
import { IRootState } from '~/src/app/store/rootReducer';
import { routes } from '~/src/navigation/helpers/routes';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { LocationIcon } from '~/src/assets';
import { styles as s } from '../styles';
import { useIsFocused } from '@react-navigation/native';
import { logline } from '~/src/app/utils/debug';

interface IProps {
  loading: boolean;
  city?: City;
  checkCity: () => void;
}

function SelectedCityContainer({ loading, city, checkCity }: IProps) {
  useEffect(() => {
    checkCity();
  }, [checkCity]);

  const isFocused = useIsFocused();

  useEffect(() => {
    logline('[SelectedCity', { isFocused });
  }, [isFocused]);

  useDebounced({
    params: { city_id: city?.id },
    deps: [city],
    shouldExecute: !!city && isFocused,
    timeout: 0,
    isDelete: !city,
  });

  if (loading) {
    return null;
  }

  const showName = city ? upFirstLetter(city?.name) : 'Выберите город';

  return (
    <TouchableOpacity
      style={s.city}
      onPress={() => RootNavigation.navigate(routes.bathesTab.SelectCity)}>
      <LocationIcon />
      <AppText padding={[3]}>{showName}</AppText>
    </TouchableOpacity>
  );
}

const SelectedCityConnected = connect(
  ({ city }: IRootState) => ({
    loading: city.loading,
    city: city.selectedCity,
  }),
  {
    checkCity: checkCityAction,
  },
)(SelectedCityContainer);

export { SelectedCityConnected as SelectedCity };
