import React from 'react';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { clearBathes as clearBathesAction } from '~/src/features/bathes/store/bathActions';
import { AppButton, AppText, Block } from '~/src/app/common/components/UI';
import { IRootState } from '~/src/app/store/rootReducer';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { styles as s } from '../styles';

interface IProps {
  loading: boolean;
  count: number;
  //acceptFilter: () => void;
  clearBathes: () => void;
}

function AcceptButtonContainer({
  loading,
  count,
  //acceptFilter,
  clearBathes,
}: IProps) {
  function handleAcceptFilter() {
    RootNavigation.goBackOrToScreen('BathesScreen');
    clearBathes();
    //acceptFilter();
  }

  let status;
  status = loading && <ActivityIndicator size="small" color="white" />;
  status = !loading && (
    <AppText semibold header>
      {count}
    </AppText>
  );

  return (
    <AppButton
      style={s.filterButton}
      margin={[3, 0, 8]}
      onPress={handleAcceptFilter}>
      <AppText padding={1.5} center semibold header>
        {'Показать '}
      </AppText>
      <Block middle center>
        {status}
      </Block>
      <AppText padding={1.5} center semibold header>
        {' предложения'}
      </AppText>
    </AppButton>
  );
}

const AcceptButtonConnected = connect(
  ({ filter }: IRootState) => ({
    loading: filter.extraLoading,
    count: filter.extraCount,
  }),
  {
    //acceptFilter: acceptFilterAction,
    clearBathes: clearBathesAction,
  },
)(AcceptButtonContainer);

export { AcceptButtonConnected as AcceptButton };
