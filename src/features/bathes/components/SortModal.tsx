import React from 'react';
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AppText, Block } from '~/src/app/common/components/UI';
import ModalWrapper from '~/src/app/common/modals/ModalWrapper';
import { useDispatch } from 'react-redux';
import { closeModal } from '~/src/app/common/modals/modalReducer';

export interface ISortModal {
  y: number;
}

export default function SortModal({ y }: ISortModal) {
  const dispatch = useDispatch();
  console.log('[SortModal]', y);
  const _y = !y || y < 100 ? 130 : y;

  const modalStyle = { marginTop: _y + wp(13) };

  return (
    <ModalWrapper>
      <TouchableOpacity style={[styles.modalView, modalStyle]} onPress={() => dispatch(closeModal())}>
        <AppText primary>Test</AppText>
      </TouchableOpacity>
    </ModalWrapper>
  );
}

const styles = StyleSheet.create({
  modalView: {
    alignSelf: 'center',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
