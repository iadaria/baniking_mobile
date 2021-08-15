import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { AppText } from '~/src/app/common/components/UI';
import { IRootState } from '~/src/app/store/rootReducer';
import { PageIcon } from '~/src/assets';
import { styles as s } from '../styles';
import { useDebounced } from '~/src/features/bathes/hooks/useDebounced';
import {
  notNear as notNearAction,
  setNear as setNearAction,
} from '~/src/features/bathes/store/bathActions';
import { Location } from '~/src/app/models/map';

interface IProps {
  isNear: boolean;
  setNear: () => void;
  location: Location | null;
}

function NearestContainer({ location, isNear, setNear }: IProps) {

  useDebounced({
    param: { field: 'latitude', value: location?.lat },
    deps: [location, isNear],
    shouldExecute: true,
    isDelete: !isNear,
  });

  useDebounced({
    param: { field: 'longitude', value: location?.lng },
    deps: [location, isNear],
    shouldExecute: true,
    isDelete: !isNear,
  });

  return (
    <TouchableOpacity style={s.nealy} onPress={setNear}>
      <AppText primary medium>
        Показать все бани рядом со мной
      </AppText>
      <PageIcon />
    </TouchableOpacity>
  );
}
const NearestConnected = connect(
  ({ bath, map }: IRootState) => ({
    isNear: bath.isNear,
    location: map.location,
  }),
  {
    setNear: setNearAction,
    notNear: notNearAction,
  },
)(NearestContainer);

export { NearestConnected as Nearest };
