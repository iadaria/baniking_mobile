import React, { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Block } from '~/src/app/common/components/UI';
import { IRootState } from '~/src/app/store/rootReducer';
import { searchName } from '~/src/features/bathes/store/bathActions';
import { SearchCancelIcon, SearchIcon } from '~/src/assets';
import { styles as s } from '../styles';

export function Searcher() {
  const { search_query } = useSelector(({ bath }: IRootState) => bath.params);
  const [searched, setSearched] = useState<string | undefined>(search_query);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searched !== search_query) {
      dispatch(searchName(searched));
    }
  }, [dispatch, search_query, searched]);

  function handleChangeText(text: string) {
    let formatedText = String(text).trim();
    if (formatedText.length > 0) {
      formatedText = `%${formatedText.toLowerCase().replace(' ', '%')}%`;
      setSearched(formatedText);
    } else {
      clearSearch();
    }
  }

  function clearSearch() {
    setSearched(undefined);
  }

  //const isEmpty = () => !searched || (searched && searched.length === 0);

  return (
    <Block padding={[0, 0, 0, 4]} center row>
      <Block style={s.searchWrapper} center row>
        <TextInput
          style={s.searchInput}
          placeholder="Что вы ищите?"
          onChangeText={handleChangeText}
          value={searched}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={64}
        />
        {!searched ? (
          <TouchableOpacity style={s.searchIconButton} onPress={() => { }}>
            <SearchIcon style={s.searchIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={s.searchIconButton} onPress={clearSearch}>
            <SearchCancelIcon style={s.searchIcon} />
          </TouchableOpacity>
        )}
      </Block>
      {/* <FilterButton navigation={navigation} filterCount={filterCount} /> */}
    </Block>
  );
}
