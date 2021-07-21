import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { TouchableOpacity, FlatList, Text } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppText, Block } from '~/src/app/common/components/UI';
import { fetchBathes as fetchBathesAction } from '~/src/features/bathes/store/bathActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { Bath, BathParams } from '~/src/app/models/bath';
import { Header } from '~/src/app/common/components/Header';
import { isIos } from '~/src/app/common/constants';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  bathes: Bath[] | null;
  params: BathParams;
  fetchBathes: () => void;
}

function BathesList() {
  const bathes = [];
  const keyExtractor = useCallback((item: Bath, index) => String(index), []);
  const iosStyle = isIos ? { paddingLeft: wp(5) } : {};

  const renderItem = useCallback(
    ({ item, index }: { item: Bath; index: number }) => {
      return (
        <TouchableOpacity onPress={() => { }}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      );
    },
    [],
  );
  return (
    <FlatList
      data={bathes}
      style={iosStyle}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReachedThreshold={0.1}
    //onEndReached={handleLoadMore}
    //ListEmptyComponent={emptyComponent}
    //ListFooterComponent={footerComponent}
    />
  );
}

export function BathesScreenContainer({ params, fetchBathes }: IProps) {

  useEffect(() => {
    fetchBathes();
  }, [fetchBathes, params]);

  return (
    <>
      <Block margin={[4, 8, 0]}>
        <Header />
      </Block>
      <Block full padding={[0, 8, 0, 4]}>
        <AppText margin={[0, 0, 2, 4]} h1>
          Каталог бань
        </AppText>
      </Block>
      <BathesList />
    </>
  );
}

const BathesScreenConnected = connect(
  ({ bath }: IRootState) => ({
    bathes: bath.bathes,
    params: bath.params,
  }),
  {
    fetchBathes: fetchBathesAction,
  },
)(BathesScreenContainer);

export { BathesScreenConnected as BathesScreen };
