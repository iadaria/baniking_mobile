import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AppText, Block, Divider } from '~/src/app/common/components/UI';
import ModalWrapper from '~/src/app/common/modals/ModalWrapper';
import { useDispatch } from 'react-redux';
import { closeModal } from '~/src/app/common/modals/modalReducer';
import { isIos, statusBarHeight } from '~/src/app/common/constants/platform';
import { windowWidth } from '~/src/app/common/constants/platform';

export interface ISortModal {
  y: number;
}

export default function SortModal({ y }: ISortModal) {
  const dispatch = useDispatch();
  console.log('[SortModal]', y);
  let _y = !y || y < 100 ? 130 : y;
  _y = isIos ? _y + statusBarHeight : y;

  const modalStyle = { marginTop: _y + wp(13) };

  return (
    <ModalWrapper>
      <TouchableOpacity onPress={() => dispatch(closeModal())}>
        <Block style={[styles.modalView, modalStyle]}>
          <AppText primary>По возрастанию цены</AppText>
          <Divider style={styles.divider} />
          <AppText primary>По убыванию цены</AppText>
          <Divider style={styles.divider} />
          <AppText primary>По рейтингу</AppText>
          <Divider style={styles.divider} />
          <AppText primary>Без сортировки</AppText>
        </Block>
      </TouchableOpacity>
    </ModalWrapper>
  );
}

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: 'rgba(112, 112, 112, 0.5)',
    backgroundColor: 'transparent',
    opacity: isIos ? 0.5 : 1,
  },
  modalView: {
    width: windowWidth - wp(19),
    alignSelf: 'center',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: wp(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
