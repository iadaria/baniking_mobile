import React from 'react';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { acceptFilter as acceptFilterAction } from '~/src/features/bathes/store/bathActions';
import { AppButton, AppText, Block } from '~/src/app/common/components/UI';
import { IRootState } from '~/src/app/store/rootReducer';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { styles as s } from '../styles';

interface IProps {
  filterLoading: boolean;
  totalCheckedBathes: number;
  acceptFilter: () => void;
}

function AcceptButtonContainer({
  filterLoading,
  totalCheckedBathes,
  acceptFilter,
}: IProps) {
  function handleAcceptFilter() {
    acceptFilter();
    RootNavigation.goBackOrToScreen('BathesScreen');
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
  ({ bath }: IRootState) => ({
    filterLoading: bath.filterLoading,
    totalCheckedBathes: bath.totalCheckedBathes,
  }),
  {
    acceptFilter: acceptFilterAction,
  },
)(AcceptButtonContainer);

export { AcceptButtonConnected as AcceptButton };
