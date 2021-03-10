import React, { useEffect } from 'react';
import { ActivityIndicator, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { AppText, Block } from '~/src/app/common/components/UI';
import { getBathes as getBathesAction } from '~/src/features/bathes/store/bathActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { IBath } from '~/src/app/models/bath';
import { FilterIcon, ListIcon, SearchIcon } from '~/src/assets';
import { styles } from './styles';
import { colors } from '~/src/app/common/constants';

interface IProps {
  loading: boolean;
  bathes: Partial<IBath>[] | null;
  getBathes: () => void;
}

export function BathesScreenContainer({ loading, bathes, getBathes }: IProps) {
  useEffect(() => {
    getBathes();
  }, [getBathes]);

  if (loading) {
    return (
      <Block full center middle>
        <ActivityIndicator size="small" color={colors.secondary} />
      </Block>
    );
  }

  return (
    <Block full base>
      <AppText margin={[0, 0, 2]} h1>
        Каталог бань
      </AppText>

      <Block center row>
        <Block style={styles.searchWrapper} center row>
          <TextInput style={styles.searchInput} placeholder="Что вы ищите?" />
          <TouchableOpacity style={styles.searchIconButton} onPress={() => console.log('search')}>
            <SearchIcon style={styles.searchIcon} />
          </TouchableOpacity>
        </Block>
        <TouchableOpacity style={styles.filter} onPress={() => console.log('filter open')}>
          <FilterIcon />
        </TouchableOpacity>
      </Block>
      <Block style={styles.sort} center row>
        <AppText>Сортировать</AppText>
        <ListIcon />
      </Block>

      {bathes?.map(({ name }: IBath) => {
        return (
          <Block margin={[5, 0]} card>
            <AppText trajan header transform="uppercase">
              {name}
            </AppText>
          </Block>
        );
      })}
    </Block>
  );
}

const BathesScreenConnected = connect(
  ({ bath }: IRootState) => ({
    loading: bath.loading,
    bathes: bath.bathes,
  }),
  {
    getBathes: getBathesAction,
  },
)(BathesScreenContainer);

export { BathesScreenConnected as BathesScreen };
