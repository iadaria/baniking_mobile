import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { AppText, Block } from '~/src/app/common/components/UI';
import { TPartBathParams } from '~/src/app/models/bath';
import { isElementExist } from '~/src/app/utils/common';
import { styles } from './styles';

interface IProps {
  steamRooms: Map<string, string> | undefined;
  filterParams: TPartBathParams;
  setFilterParams: (params: TPartBathParams) => void;
  setFilterCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function FilterRooms({ steamRooms, filterParams, setFilterParams, setFilterCount }: IProps) {
  const renderSteamRoom = useCallback(
    (key: string, value: string) => {
      const { steam_rooms_ids } = filterParams;
      const [indexOf, exist] = isElementExist(steam_rooms_ids!, Number(key));

      const new_steams: number[] = steam_rooms_ids ? [...steam_rooms_ids] : [];
      //__DEV__ && console.log('[FilterScreen] indexOf/isExists/lenght', indexOf, exist, new_steams.length);
      return (
        <TouchableOpacity
          key={`item-${key}`}
          style={!exist ? styles.element : styles.elementSelected}
          onPress={() => {
            if (!exist) {
              new_steams?.push(Number(key));
              setFilterCount((prevCount: number) => prevCount + 1);
            }
            if (indexOf === 0) {
              new_steams?.shift();
              setFilterCount((prevCount: number) => prevCount - 1);
            } else if (exist && indexOf) {
              new_steams?.splice(indexOf, 1);
              setFilterCount((prevCount: number) => prevCount - 1);
            }
            setFilterParams({ ...filterParams, steam_rooms_ids: new_steams });
          }}>
          <AppText tag>{value}</AppText>
        </TouchableOpacity>
      );
    },
    [filterParams, setFilterCount, setFilterParams],
  );

  return steamRooms ? (
    <>
      <AppText margin={[3, 0, 2]} secondary>
        Виды парной
      </AppText>
      <Block row wrap>
        {Array.from(steamRooms, ([key, value]) => renderSteamRoom(key, value))}
      </Block>
    </>
  ) : null;
}
