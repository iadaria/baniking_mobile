import React from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { AppText } from '~/src/app/common/components/UI';
import { useDebounced } from '~/src/features/bathes/hooks/useDebounced';
import { setNear as setNearAction } from '~/src/features/bathes/store/bathActions';
import { Location } from '~/src/app/models/map';
import { IRootState } from '~/src/app/store/rootReducer';
import { PageIcon } from '~/src/assets';
import { styles as s } from '../styles';

interface IProps {
  isNear: boolean;
  isCityId: boolean;
  setNear: () => void;
  location: Location | null;
}

function NearestContainer({ location, isNear, isCityId, setNear }: IProps) {
  const { lat, lng } = location || {};

  const isnotNear = !isNear;

  useDebounced({
    param: { field: 'latitude', value: lat },
    deps: [lat, isNear],
    shouldExecute: location !== null,
    isDelete: isnotNear,
  });

  useDebounced({
    param: { field: 'longitude', value: lng },
    deps: [lng, isNear],
    shouldExecute: location !== null,
    isDelete: isnotNear,
  });

  useDebounced({
    param: { field: 'city_id', value: undefined },
    deps: [isNear, isCityId],
    shouldExecute: isNear && isCityId,
    isDelete: isNear,
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
    isCityId: bath.params.city_id,
    location: map.location,
  }),
  {
    setNear: setNearAction,
  },
)(NearestContainer);

export { NearestConnected as Nearest };
