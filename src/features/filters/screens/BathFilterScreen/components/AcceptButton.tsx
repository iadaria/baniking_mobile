import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { AppButton, AppText, Block } from '~/src/app/common/components/UI';
import { clearBathes as clearBathesAction } from '~/src/features/bathes/store/bathActions';
import { acceptExtraParams as acceptExtraParamsAction } from '../../../store/flterActions';
import { IRootState } from '~/src/app/store/rootReducer';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { styles as s } from '../styles';

interface IProps {
  loading: boolean;
  count: number;
  acceptExtraParams: () => void;
  clearBathes: () => void;
}

function AcceptButtonContainer({
  loading,
  count,
  acceptExtraParams,
  clearBathes,
}: IProps) {
  function handleAcceptFilter() {
    clearBathes();
    acceptExtraParams();
    RootNavigation.goBackOrToScreen('BathesScreen');
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
    acceptExtraParams: acceptExtraParamsAction,
    clearBathes: clearBathesAction,
  },
)(AcceptButtonContainer);

export { AcceptButtonConnected as AcceptButton };
