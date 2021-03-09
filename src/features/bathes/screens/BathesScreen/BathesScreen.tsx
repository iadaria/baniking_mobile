import React from 'react';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppText, Block } from '~/src/app/common/components/UI';
import { FilterIcon, ListIcon, MenuItem, SearchIcon } from '~/src/assets';
import { styles } from './styles';

export function BathesScreen() {
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
    </Block>
  );
}
