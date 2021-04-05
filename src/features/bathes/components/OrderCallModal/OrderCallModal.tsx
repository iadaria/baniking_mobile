import React from 'react';
import { Block } from '~/src/app/common/components/UI';
import ModalWrapper from '~/src/app/common/modals/ModalWrapper';
import { styles } from './styles';
import { useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { transparentHeader } from '~/src/app/store/system/systemActions';
import { isAndroid } from '~/src/app/common/constants';
import { closeModal } from '~/src/app/common/modals/modalReducer';
import { CloseWhiteIcon } from '~/src/assets';

interface IProps {
  bathName: string;
  bathPhone: string;
  userName: string;
  userPhone: string;
}

export default function OrderCallModal({ bathName, bathPhone, userName, userPhone }: IProps) {
  const dispatch = useDispatch();

  return (
    <ModalWrapper>
      <Block style={styles.modalView}>
        <TouchableOpacity
          style={styles.closeIcon}
          onPress={() => {
            isAndroid && dispatch(transparentHeader());
            dispatch(closeModal());
          }}>
          <CloseWhiteIcon />
        </TouchableOpacity>
        <Block style={styles.modal} />
      </Block>
    </ModalWrapper>
  );
}
