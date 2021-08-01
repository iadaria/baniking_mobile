import React from 'react';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { acceptFilter as acceptFilterAction } from '~/src/features/bathes/store/bathActions';
import { AppButton, AppText, Block } from '~/src/app/common/components/UI';
import { IRootState } from '~/src/app/store/rootReducer';
import { styles as s } from './styles';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  //filterParams: BathParams;
  //filterCount: number;

  filterLoading: boolean;
  totalCheckedBathes: number;
  getBathFilterParams: () => void;
  acceptFilter: () => void;
}

function FilterAcceptButtonContainer({
  //navigation,
  //filterParams,
  //filterCount,
  filterLoading,
  totalCheckedBathes,
}: //acceptFilter,
  IProps) {
  function handleAcceptFilter() {
    //acceptFilter({ filterParams, filterCount });
    //navigation.navigate(prevScreen);
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

const FilterAcceptButtonConnected = connect(
  ({ bath }: IRootState) => ({
    filterLoading: bath.filterLoading,
    totalCheckedBathes: bath.totalCheckedBathes,
  }),
  {
    acceptFilter: acceptFilterAction,
  },
)(FilterAcceptButtonContainer);

export { FilterAcceptButtonConnected as FilterAcceptButton };
