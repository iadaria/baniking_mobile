import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppText, Block } from '~/src/app/common/components/UI';
import { ISchedule } from '~/src/app/models/bath';
import { SchedulerIcon } from '~/src/assets';
import { getScheduleCurrentWeek } from '~/src/app/utils/bathUtility';
import { styles } from './styles';
import { useDispatch } from 'react-redux';
import { openModal } from '~/src/app/common/modals/modalReducer';
import { nonTransparentHeader, transparentHeader } from '~/src/app/store/system/systemActions';
import { isAndroid } from '~/src/app/common/constants';

interface IProps {
  schedule?: Partial<ISchedule>;
}

export default function BathSchedule({ schedule }: IProps) {
  const dispatch = useDispatch();

  if (!schedule) {
    return null;
  }
  const { is_round_the_clock } = schedule;
  const [dayName, daySchedule] = getScheduleCurrentWeek(schedule);

  return is_round_the_clock ? (
    <Block style={styles.goldBorder} center row>
      <SchedulerIcon />
      {is_round_the_clock && (
        <AppText golder medium tag>
          {'  круглосуточно'}
        </AppText>
      )}
    </Block>
  ) : (
    <Block margin={[0.5, 0, 0]} center row>
      <Block margin={[0, 3, 0, 0]} style={styles.goldBorder} center row>
        <SchedulerIcon />
        {daySchedule && (
          <>
            <AppText margin={[0, 2.5]} golder medium tag>
              {dayName}
            </AppText>
            <AppText medium tag>
              {daySchedule}
            </AppText>
          </>
        )}
      </Block>
      <TouchableOpacity
        style={styles.schedule}
        onPress={() => {
          isAndroid && dispatch(nonTransparentHeader());
          dispatch(openModal({ modalType: 'ScheduleModal', modalProps: { schedule } }));
        }}>
        <AppText>расписание</AppText>
      </TouchableOpacity>
    </Block>
  );
}
