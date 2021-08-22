import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { AppText } from '~/src/app/common/components/UI';
import { PageIcon } from '~/src/assets';
import { styles as s } from '../styles';
import { useDebounced } from '~/src/features/filters/hooks/useDebounced';
import { IRootState } from '~/src/app/store/rootReducer';
import { Location } from '~/src/app/models/map';

const lat = 'latitude';
const lng = 'longitude';
type Coords = { [lat]: number;[lng]: number };

interface IProps {
  filterloc?: Coords;
  maploc: Location | null;
}

function NearestContainer({ maploc, filterloc }: IProps) {
  const [isNearby, setNearby] = useState(!!filterloc);

  const turnOnNearby = !!maploc && !filterloc && isNearby;
  const turnOffNearby = !!filterloc && !isNearby;

  useDebounced({
    params: { latitude: maploc?.lat, longitude: maploc?.lng },
    deps: [isNearby],
    shouldExecute: turnOnNearby || turnOffNearby,
    isDelete: turnOffNearby,
  });

  const switchNearby = () => setNearby(!isNearby);
  const title = isNearby
    ? "Отменить 'рядом со мной' \nПоказать все бани города"
    : 'Показать все бани рядом со мной';

  return (
    <TouchableOpacity style={s.nealy} onPress={switchNearby}>
      <AppText primary medium>
        {title}
      </AppText>
      <PageIcon />
    </TouchableOpacity>
  );
}

export const NearestConnected = connect(
  ({ map, baseFilter: { params } }: IRootState) => ({
    maploc: map.location,
    filterloc: params[lat]
      ? { [lat]: params[lat]!, [lng]: params[lng]! }
      : undefined,
  }),
  {},
)(NearestContainer);

export { NearestConnected as Nearest };
