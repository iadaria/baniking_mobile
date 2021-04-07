import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { AppText, Block } from '~/src/app/common/components/UI';
import { TPartBathParams } from '~/src/app/models/bath';
import { isElementExist } from '~/src/app/utils/common';
import { styles } from './styles';

interface IProps {
  services: Map<string, string> | undefined;
  filterParams: TPartBathParams;
  setFilterParams: (params: TPartBathParams) => void;
  setFilterCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function FilterServices({ services, filterParams, setFilterParams, setFilterCount }: IProps) {
  const renderItem = useCallback(
    (key: string, value: string) => {
      const { services_ids } = filterParams;
      const [indexOf, exist] = isElementExist(services_ids!, Number(key));

      const new_ids: number[] = services_ids ? [...services_ids] : [];
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
            setFilterParams({ ...filterParams, services_ids: new_ids });
          }}>
          <AppText tag>{value}</AppText>
        </TouchableOpacity>
      );
    },
    [filterParams, setFilterCount, setFilterParams],
  );

  return services ? (
    <>
      <AppText margin={[3, 0, 2]} secondary>
        Сервис
      </AppText>
      <Block row wrap>
        {Array.from(services, ([key, value]) => renderItem(key, value))}
      </Block>
    </>
  ) : null;
}
