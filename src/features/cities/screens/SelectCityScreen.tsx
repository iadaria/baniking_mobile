import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { AppText, Block } from '~/src/app/common/components/UI';
import { BackButton } from '~/src/app/common/components/BackButton';
import { CitiesList } from './components/CitiesList';
import { Nearest } from './components/Nearest';
import { upFirstLetter } from '~/src/app/utils/string';
import { DetectLocation } from './components/DetectLocation';
import { persistCity as persistCityAction } from '~/src/features/persist/store/appPersistActions';
import { City } from '~/src/app/models/city';
import { MenuItem } from '~/src/assets';
import { IRootState } from '~/src/app/store/rootReducer';
import { logline } from '~/src/app/utils/debug';
import { useDebounced } from '../../filters/hooks/useDebounced';
import { styles as s } from './styles';

interface IProps {
  selectedCity?: City;
  filterCityId?: City['id'];
  persistCity: (cityName: string) => void;
}

function SelectCityScreenContainer({
  selectedCity,
  filterCityId,
  persistCity,
}: IProps) {
  const [isExpand, setExpand] = useState(false);

  const { name: cityName } = selectedCity || {};
  useEffect(() => {
    return () => {
      logline('[SelectCityScreen]', 'unmount');
      cityName && persistCity(cityName);
    };
  }, [persistCity, cityName]);

  const deg = isExpand ? 90 : 0;
  const formStyle: ViewStyle = isExpand ? { ...s.form, height: '78%' } : s.form;
  const closeList = () => setExpand(false);
  const switchList = () => setExpand(!isExpand);

  const showCity = selectedCity ? upFirstLetter(selectedCity.name) : '';
  const isNewCity = !!selectedCity && selectedCity.id !== filterCityId;

  useDebounced({
    params: { city_id: selectedCity?.id },
    deps: [selectedCity],
    shouldExecute: isNewCity,
    timeout: 0,
    isDelete: !selectedCity,
  });

  const citiesList = isExpand ? <CitiesList closeList={closeList} /> : null;

  return (
    <Block margin={6} full>
      <BackButton screen="BathesScreen" />

      <AppText margin={[4, 0]} h1>
        Город
      </AppText>

      {/* Title */}
      <View style={formStyle}>
        <AppText primary medium>
          Выберите город из списка
        </AppText>

        {/* Selected city name */}
        <TouchableOpacity style={s.item} onPress={switchList}>
          <AppText primary semibold size={4}>
            {showCity}
          </AppText>
          <MenuItem style={{ transform: [{ rotate: `${deg}deg` }] }} />
        </TouchableOpacity>

        {citiesList}

        <DetectLocation />
      </View>

      <Nearest />
    </Block>
  );
}

const SelectCityScreenConnected = connect(
  ({ city, filter }: IRootState) => ({
    selectedCity: city.selectedCity,
    filterCityId: filter.params.city_id,
  }),
  {
    persistCity: persistCityAction,
  },
)(SelectCityScreenContainer);

export { SelectCityScreenConnected as SelectCityScreen };
