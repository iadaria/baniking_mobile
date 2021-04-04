import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { AppText, Block } from '~/src/app/common/components/UI';
import { closeModal } from '~/src/app/common/modals/modalReducer';
import ModalWrapper from '~/src/app/common/modals/ModalWrapper';
import { ISchedule } from '~/src/app/models/bath';
import { AuthLogoLeft, AuthLogoRight, CloseWhiteIcon } from '~/src/assets';
import { styles } from './styles';

interface IProps {
  schedule?: Partial<ISchedule>;
}

export default function ScheduleModal({ schedule }: IProps) {
  const dispatch = useDispatch();

  return (
    <ModalWrapper>
      <Block style={styles.modalView} debug>
        <TouchableOpacity style={styles.closeIcon} onPress={() => dispatch(closeModal())}>
          <CloseWhiteIcon />
        </TouchableOpacity>
        <Block style={styles.modal}>
          {/* Заголовок */}
          <Block margin={[0, 0, 3]} row middle center>
            <AuthLogoLeft />
            <AppText style={{ marginHorizontal: 15 }} h2 trajan primary>
              Расписание
            </AppText>
            <AuthLogoRight />
          </Block>
          {/* Понедельник */}
          <Block style={styles.element}>
            <AppText primary tag>{`${schedule?.mo_hours_from} - ${schedule?.mo_hours_to}`}</AppText>
            <AppText style={styles.label} primary medium tag>
              Понедельник
            </AppText>
          </Block>
        </Block>
      </Block>
    </ModalWrapper>
  );
}
