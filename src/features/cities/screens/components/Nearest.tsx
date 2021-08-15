import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { AppText } from '~/src/app/common/components/UI';
import { IRootState } from '~/src/app/store/rootReducer';
import { PageIcon } from '~/src/assets';
import { styles as s } from '../styles';
import { useDebounced } from '~/src/features/bathes/hooks/useDebounced';

export default function Nearest() {
  const [isShow, setIsShow] = useState<boolean>();
  const { location } = useSelector(({ map }: IRootState) => map);

  useDebounced({
    param: { field: 'latitude', value: location?.lat },
    deps: [location, isShow],
    shouldExecute: isShow === true,
    isDelete: !location,
  });

  useDebounced({
    param: { field: 'longitude', value: location?.lng },
    deps: [location, isShow],
    shouldExecute: isShow === true,
    isDelete: !location,
  });

  return (
    <TouchableOpacity style={s.nealy} onPress={() => setIsShow(true)}>
      <AppText primary medium>
        Показать все бани рядом со мной
      </AppText>
      <PageIcon />
    </TouchableOpacity>
  );
}
