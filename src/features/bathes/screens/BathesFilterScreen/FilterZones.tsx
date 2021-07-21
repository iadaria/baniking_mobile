import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { AppText, Block } from '~/src/app/common/components/UI';
import { BathParams } from '~/src/app/models/bath';
import { isElementExist } from '~/src/app/utils/common';
import { styles } from './styles';

interface IProps {
  zones: Map<string, string> | undefined;
  filterParams: BathParams;
  setFilterParams: (params: BathParams) => void;
  setFilterCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function FilterZones({ zones, filterParams, setFilterParams, setFilterCount }: IProps) {
  const renderItem = useCallback(
    (key: string, value: string) => {
      const { zones_ids } = filterParams;
      const [indexOf, exist] = isElementExist(zones_ids!, Number(key));

      const new_ids: number[] = zones_ids ? [...zones_ids] : [];
      //__DEV__ && console.log('[FilterScreen] indexOf/isExists/lenght', indexOf, exist, new_ids.length);
      return (
        <TouchableOpacity
          key={`item-${key}`}
          style={!exist ? styles.element : styles.elementSelected}
          onPress={() => {
            if (!exist) {
              new_ids?.push(Number(key));
              setFilterCount((prevCount: number) => prevCount + 1);
            }
            if (indexOf === 0) {
              new_ids?.shift();
              setFilterCount((prevCount: number) => prevCount - 1);
            } else if (exist && indexOf) {
              new_ids?.splice(indexOf, 1);
              setFilterCount((prevCount: number) => prevCount - 1);
            }
            setFilterParams({ ...filterParams, zones_ids: new_ids });
          }}>
          <AppText tag>{value}</AppText>
        </TouchableOpacity>
      );
    },
    [filterParams, setFilterCount, setFilterParams],
  );

  return zones ? (
    <>
      <AppText margin={[3, 0, 2]} secondary>
        Аквазоны
      </AppText>
      <Block row wrap>
        {Array.from(zones, ([key, value]) => renderItem(key, value))}
      </Block>
    </>
  ) : null;
}
