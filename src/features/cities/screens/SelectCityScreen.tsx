import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { AppText, Block } from '~/src/app/common/components/UI';
import { BackButton } from '~/src/app/common/components/BackButton';
import { CitiesList } from './components/CitiesList';
//import { Nearest } from './components/Nearest';
import { capitalizeFirstLetter } from '~/src/app/utils/string';
import { DetectLocation } from './components/DetectLocation';
import { persistCity as persistCityAction } from '~/src/features/persist/store/appPersistActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { City } from '~/src/app/models/city';
import { MenuItem } from '~/src/assets';
import { styles as s } from './styles';
import { logline } from '~/src/app/utils/debug';

interface IProps {
  selectedCity?: City;
  persistCity: (cityName: string) => void;
}

function SelectCityScreenContainer({ selectedCity, persistCity }: IProps) {
  const [isExpand, setExpand] = useState(false);

  useEffect(() => {
    return () => {
      logline('[SelectCityScreen]', 'unmount');
      persistCity(selectedCity!.name);
    };
  }, [persistCity, selectedCity]);

  const deg = isExpand ? 90 : 0;
  const formStyle: ViewStyle = isExpand ? { ...s.form, height: '78%' } : s.form;
  const closeList = () => setExpand(false);
  const switchList = () => setExpand(!isExpand);

  const showCity = selectedCity ? capitalizeFirstLetter(selectedCity.name) : '';

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

      {/* <Nearest /> */}
    </Block>
  );
}

const SelectCityScreenConnected = connect(
  ({ city }: IRootState) => ({
    selectedCity: city.selectedCity,
  }),
  {
    persistCity: persistCityAction,
  },
)(SelectCityScreenContainer);

export { SelectCityScreenConnected as SelectCityScreen };
