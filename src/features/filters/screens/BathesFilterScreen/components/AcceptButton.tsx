import React from 'react';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { clearBathes as clearBathesAction } from '~/src/features/bathes/store/bathActions';
import { acceptFilter as acceptFilterAction } from '~/src/features/filters/store/filterActions';
import { AppButton, AppText, Block } from '~/src/app/common/components/UI';
import { IRootState } from '~/src/app/store/rootReducer';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { styles as s } from '../styles';

interface IProps {
  filterLoading: boolean;
  totalCheckedBathes: number;
  acceptFilter: () => void;
  clearBathes: () => void;
}

function AcceptButtonContainer({
  filterLoading,
  totalCheckedBathes,
  acceptFilter,
  clearBathes,
}: IProps) {
  function handleAcceptFilter() {
    RootNavigation.goBackOrToScreen('BathesScreen');
    clearBathes();
    acceptFilter();
  }

  return (
    <AppButton
      style={s.filterButton}
      margin={[3, 0, 8]}
      onPress={handleAcceptFilter}>
      <AppText padding={1.5} center semibold header>
        {'Показать '}
      </AppText>
      <Block middle center>
        {filterLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <AppText semibold header>
            {totalCheckedBathes}
          </AppText>
        )}
      </Block>
      <AppText padding={1.5} center semibold header>
        {' предложения'}
      </AppText>
    </AppButton>
  );
}

const AcceptButtonConnected = connect(
  ({ filter }: IRootState) => ({
    filterLoading: filter.filterLoading,
    totalCheckedBathes: filter.totalCheckedBathes,
  }),
  {
    acceptFilter: acceptFilterAction,
    clearBathes: clearBathesAction,
  },
)(AcceptButtonContainer);

export { AcceptButtonConnected as AcceptButton };
