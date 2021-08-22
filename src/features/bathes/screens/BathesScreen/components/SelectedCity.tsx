import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { AppText } from '~/src/app/common/components/UI';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { capitalizeFirstLetter } from '~/src/app/utils/string';
import { City } from '~/src/app/models/city';
import { checkCity as checkCityAction } from '~/src/features/cities/store/cityActions';
import { useDebounced } from '~/src/features/filters/hooks/useDebounced';
import { IRootState } from '~/src/app/store/rootReducer';
import { routes } from '~/src/navigation/helpers/routes';
import { LocationIcon } from '~/src/assets';
import { styles as s } from '../styles';

interface IProps {
  loading: boolean;
  city?: City;
  checkCity: () => void;
}

function SelectedCityContainer({ loading, city, checkCity }: IProps) {
  useEffect(() => {
    checkCity();
  }, [checkCity]);

  useDebounced({
    params: { city_id: city?.id },
    deps: [city],
    shouldExecute: !!city,
    isClearBathes: true,
    isDelete: !city,
  });

  if (loading) {
    return null;
  }

  const showName = city ? capitalizeFirstLetter(city?.name) : 'Выберите город';

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
