import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AppText } from '~/src/app/common/components/UI';
import { ListIcon } from '~/src/assets';
import { styles as s } from '../styles';
import { useDispatch } from 'react-redux';
import { IModalState, openModal } from '~/src/app/common/modals/modalReducer';

export function Sorter() {
  const [yForModal, setYForModal] = useState(wp(4));
  const dispatch = useDispatch();

  function handleOpenModal(payload: IModalState) {
    dispatch(openModal(payload));
  }

  return (
    <TouchableOpacity
      style={s.sorter}
      onLayout={(event) => setYForModal(event.nativeEvent.layout.y)}
      onPress={() =>
        handleOpenModal({
          modalType: 'SortModal',
          modalProps: { y: yForModal },
        })
      }>
      <AppText>Сортировать</AppText>
      <ListIcon />
    </TouchableOpacity>
  );
}
