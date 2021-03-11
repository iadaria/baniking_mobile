import React, { useEffect } from 'react';
import { ActivityIndicator, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { AppText, Block } from '~/src/app/common/components/UI';
import { getBathes as getBathesAction } from '~/src/features/bathes/store/bathActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { IBath } from '~/src/app/models/bath';
import { FilterIcon, ListIcon, SearchIcon, StarIcon, StarPartIcon } from '~/src/assets';
import { styles } from './styles';
import { colors } from '~/src/app/common/constants';
import Star from '~/src/app/common/components/Stars/Star';
import { Stars } from '~/src/app/common/components/Stars';

interface IProps {
  loading: boolean;
  bathes: Partial<IBath>[] | null;
  getBathes: () => void;
}

export function BathesScreenContainer({ loading, bathes, getBathes }: IProps) {
  /* useEffect(() => {
    if (getBathes && getBathes.length < 8) {
      getBathes();
    }
  }, [getBathes]); */

  if (loading) {
    return (
      <Block full center middle>
        <ActivityIndicator size="small" color={colors.secondary} />
      </Block>
    );
  }
  // rating
  const testRating = 3.1;

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

      <Block key={1} margin={[5, 0]} card>
        <AppText trajan header transform="uppercase" height={27}>
          Nordik spa & Lounge
        </AppText>
        <AppText secondary tag>
          Нордская баня с лаунтджем
        </AppText>

        
        {/* <Stars rating={testRating} /> */}
      </Block>

      {/* {bathes?.map(({ name }: Partial<IBath>, index: number) => {
        return (
          <Block key={`key-${index}`} margin={[5, 0]} card>
            <AppText trajan header transform="uppercase" height={6}>
              {name}
            </AppText>
          </Block>
        );
      })} */}
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
