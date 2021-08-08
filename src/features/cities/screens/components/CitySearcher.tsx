import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AppInput, Block } from '~/src/app/common/components/UI';
import { SearchCancelIcon, SearchIcon } from '~/src/assets';
import { styles as s } from '../styles';

interface IProps {
  searched: string | undefined;
  setSearched: (text?: string) => void;
}

export function CitySearcher({ searched, setSearched }: IProps) {
  function handleChangeText(text: string) {
    let searchedText = text.trim();
    if (searchedText.length > 0) {
      setSearched(searchedText);
    } else {
      clearSearch();
    }
  }

  function clearSearch() {
    setSearched(undefined);
  }

  const Icon = searched ? SearchCancelIcon : SearchIcon;
  const onPressIcon = searched ? clearSearch : () => { };

  return (
    <Block middle>
      <AppInput
        value={searched}
        onChangeText={handleChangeText}
        placeholder="Введите город"
      />
      <TouchableOpacity style={s.icon} onPress={onPressIcon}>
        <Icon />
      </TouchableOpacity>
    </Block>
  );
}
