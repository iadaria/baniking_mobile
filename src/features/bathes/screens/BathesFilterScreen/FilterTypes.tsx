import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { AppText, Block } from '~/src/app/common/components/UI';
import { EBathType, BathParams } from '~/src/app/models/bath';
import { isElementExist } from '~/src/app/utils/common';
import { styles } from './styles';

interface IProps {
  bathTypes: Map<string, string> | undefined;
  filterParams: BathParams;
  setFilterParams: (params: BathParams) => void;
  setFilterCount: React.Dispatch<React.SetStateAction<number>>;
}

// the types must be a number
export default function FilterTypes({ bathTypes, filterParams, setFilterParams, setFilterCount }: IProps) {
  const renderItem = useCallback(
    (key: EBathType, value: string, index: number) => {
      const { types } = filterParams;
      const [indexOf, exist] = isElementExist(types!, index);
      const new_ids: number[] = types ? [...types] : [];
      //__DEV__ && console.log('[FilterScreen] indexOf/isExists/lenght', indexOf, exist, new_ids.length);
      return (
        <TouchableOpacity
          key={`item-${key}`}
          style={!exist ? styles.element : styles.elementSelected}
          onPress={() => {
            if (!exist) {
              //new_ids?.push(key);
              new_ids?.push(index);
              setFilterCount((prevCount: number) => prevCount + 1);
            }
            if (indexOf === 0) {
              new_ids?.shift();
              setFilterCount((prevCount: number) => prevCount - 1);
            } else if (exist && indexOf) {
              new_ids?.splice(indexOf, 1);
              setFilterCount((prevCount: number) => prevCount - 1);
            }
            //setFilterParams({ ...filterParams, types: new_ids });
          }}>
          <AppText tag>{value}</AppText>
        </TouchableOpacity>
      );
    },
    [filterParams, setFilterCount, setFilterParams],
  );

  return bathTypes ? (
    <>
      <AppText margin={[3, 0, 2]} secondary>
        Уровни
      </AppText>
      <Block row wrap>
        {Array.from(bathTypes, ([key, value], index) => renderItem(key as EBathType, value, index))}
      </Block>
    </>
  ) : null;
}
