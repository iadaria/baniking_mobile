import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDebouncedCallback } from 'use-debounce/lib';
import { AppInput, Block } from '~/src/app/common/components/UI';
import { City } from '~/src/app/models/city';
import { SearchCancelIcon, SearchIcon } from '~/src/assets';
import { styles as s } from '../styles';

interface IProps {
  allCities: City[];
  setCities: (cities: City[]) => void;
}

export function CitySearcher({ allCities, setCities }: IProps) {
  const [searched, setSearched] = useState<string | undefined>();

  const debouncedFilter = useDebouncedCallback(
    (what?: string) => {
      if (what) {
        const filteredCities = allCities.filter((c) => compare(c.name, what));
        setCities(filteredCities);
      } else {
        setCities(allCities);
      }
    },
    1000,
    { maxWait: 2000 },
  );

  useEffect(() => {
    debouncedFilter(searched);
  }, [debouncedFilter, searched]);

  function compare(where: string, what: string) {
    return where.toLowerCase().includes(what.toLowerCase());
  }

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
