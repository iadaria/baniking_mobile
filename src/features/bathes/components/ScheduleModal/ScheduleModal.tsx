import React from 'react';
import { TouchableOpacity } from 'react-native';
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
      <Block style={styles.modalView}>
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
          <Block margin={[1, 0]} style={styles.element}>
            <AppText primary tag>{`${schedule?.mo_hours_from} - ${schedule?.mo_hours_to}`}</AppText>
            <AppText style={styles.label} primary semibold tag>
              Понедельник
            </AppText>
          </Block>
          {/* Вторник */}
          <Block margin={[1, 0]} style={styles.element}>
            <AppText primary tag>{`${schedule?.tu_hours_from || ''} - ${schedule?.tu_hours_to || ''}`}</AppText>
            <AppText style={styles.label} primary semibold tag>
              Вторник
            </AppText>
          </Block>
          {/* Среда */}
          <Block margin={[1, 0]} style={styles.element}>
            <AppText primary tag>{`${schedule?.we_hours_from || ''} - ${schedule?.we_hours_to || ''}`}</AppText>
            <AppText style={styles.label} primary semibold tag>
              Среда
            </AppText>
          </Block>
          {/* Четверг */}
          <Block margin={[1, 0]} style={styles.element}>
            <AppText primary tag>{`${schedule?.th_hours_from || ''} - ${schedule?.th_hours_to}`}</AppText>
            <AppText style={styles.label} primary semibold tag>
              Четверг
            </AppText>
          </Block>
          {/* Пятница */}
          <Block margin={[1, 0]} style={styles.element}>
            <AppText primary tag>{`${schedule?.fr_hours_from || ''} - ${schedule?.fr_hours_to || ''}`}</AppText>
            <AppText style={styles.label} primary semibold tag>
              Пятница
            </AppText>
          </Block>
          {/* Суббота */}
          <Block margin={[1, 0]} style={styles.element}>
            <AppText primary tag>{`${schedule?.sa_hours_from || ''} - ${schedule?.sa_hours_to || ''}`}</AppText>
            <AppText style={styles.label} primary semibold tag>
              Суббота
            </AppText>
          </Block>
          {/* Воскресенье */}
          <Block margin={[1, 0]} style={styles.element}>
            <AppText primary tag>{`${schedule?.su_hours_from || ''} - ${schedule?.su_hours_to || ''}`}</AppText>
            <AppText style={styles.label} primary semibold tag>
              Воскресенье
            </AppText>
          </Block>
        </Block>
      </Block>
    </ModalWrapper>
  );
}
