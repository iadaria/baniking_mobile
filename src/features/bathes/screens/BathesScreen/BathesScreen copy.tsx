import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { TextInput, TouchableOpacity, FlatList } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDebouncedCallback } from 'use-debounce/lib';
import { AppText, Block } from '~/src/app/common/components/UI';
import {
  getBathes as getBathesAction,
  fetchBathes as fetchBathesAction,
} from '~/src/features/bathes/store/bathActions';
import { IRootState } from '~/src/app/store/rootReducer';
import {
  IBath,
  IBathAction,
  IMap,
  TPartBathParams,
} from '~/src/app/models/bath';
import BathItem from './BathItem';
import AppListIndicator from './AppListIndicator';
import { canLoadMore, isBegin } from '~/src/app/utils/common';
import { isIos } from '~/src/app/common/constants/platform';
import { persistImage as persistImageAction } from '~/src/features/persist/store/appPersistActions';
import {
  clearBathes as clearBathesAction,
  setFilter as setFilterAction,
  fetchMaps as fetchMapsAction,
} from '~/src/features/bathes/store/bathActions';
import { IPersistImage } from '~/src/app/models/persist';
import {
  IModalState,
  openModal as openModalAction,
} from '~/src/app/common/modals/modalReducer';
import { ListIcon, SearchIcon, SearchCancelIcon } from '~/src/assets';
import { sizes } from '~/src/app/common/constants';
import { styles } from './styles';
import NotFound from './NotFound';
import CancelLink from './CancelLink';
import UpdateRequestButton from './UpdateRequestButton';
import { routes } from '~/src/navigation/helpers/routes';
import usePermission from '~/src/app/hooks/usePermission';
import { PERMISSION_TYPE } from '~/src/app/common/components/AppPersmission';
import { useGeolocation } from '../../hooks/useGeolocation';
import FilterButton from './FilterButton';
import { ILocation } from '~/src/app/models/user';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;

  connection: boolean | null;
  loading: boolean;
  totalBathes: number;
  bathes: IBath[] | null;
  moreBathes: boolean;
  params: TPartBathParams;
  retainState: boolean;
  filtered: boolean;
  filterCount: number;
  location: ILocation | null;
  maps: IMap[];

  getBathes: () => void;
  fetchBathes: (payload: IBathAction) => void;
  fetchMaps: (bathes: IBath[]) => void;
  // updateBath: (bath: IBath) => void;
  persistImage: (image: IPersistImage) => void;
  openModal: (payload: IModalState) => void;
  clearBathes: () => void;
  setFilter: (payload: { params: TPartBathParams }) => void;
}

// TODO 1)if filter and total === 0; 2) notfound upon keyboard

export function BathesScreenContainer({
  connection,
  loading,
  totalBathes,
  bathes,
  location,
  maps,
  fetchMaps,
  filtered,
  filterCount,
  fetchBathes,
  persistImage,
  openModal,
  params,
  clearBathes,
  setFilter,
  navigation,
}: IProps) {
  const [yForModal, setYForModal] = useState(wp(4));
  const [searchName, setSearchName] = useState<string | undefined>();
  const [localPermission, setLocalPermission] = useState(false);
  // const [userLocation, setUserLocation] = useState<ILocation>();

  const { page = 0 } = params;

  useEffect(() => {
    let t = new Date();
    let v = `^^ ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()} ^^`;
    __DEV__ && console.log('[BathesScreen/useEffect (didMount)]', v);
  }, []);

  usePermission({
    permission_type: PERMISSION_TYPE.location,
    setGranted: setLocalPermission,
    alert_message:
      'Вы запретили использовать геолокацию, для дальнейшей работы приложения небходимо разрешение на определение местоположения',
    warning_message: 'У приложения нет разрешения на использование геолокации',
  });

  useGeolocation({
    permission: localPermission,
    //setUserLocation,
  });

  //Кадый раз когда изменяется локация обновляем maps
  /* useEffect(() => {
    if (location && bathes) {
      __DEV__ && console.log('****** [BathesScreen] location call update maps', location);
      fetchMaps(bathes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchMaps, location]); */

  useEffect(() => {
    __DEV__ &&
      console.log(
        '[BathesScreen/useEffect(params)] Was changed Bath params',
        params,
      );
  }, [params]);

  // TODO Test
  const handleLoadMore = useCallback(() => {
    const cv = `[BathesScreen/haldeLoadMore] params=${JSON.stringify(
      params,
    )}, page=${page}`;
    __DEV__ && console.log(cv);

    if (connection) {
      const countBathes = bathes?.length || 0;
      const canMoreBathes = canLoadMore(totalBathes, countBathes, params.page!);
      if (canMoreBathes) {
        const nextPage = params.page! + 1;
        const bathParams: TPartBathParams = {
          ...params,
          page: nextPage,
        };
        fetchBathes({ bathParams, moreBathes: canMoreBathes });
      } else {
        __DEV__ && console.log('[BathesScreen] not more Batehs');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection, params]);
  //}, [params, connection]);

  const debounced = useDebouncedCallback(
    (_params: TPartBathParams) => handleFilter(_params),
    1000,
    {
      maxWait: 2000,
    },
  );

  function handleFilter(newParams: TPartBathParams) {
    clearBathes();
    setFilter({ params: newParams });
  }

  // Вызов если только запускаем приложение - не одной записи еще не получено
  useEffect(() => {
    if (isBegin(page)) {
      handleLoadMore();
    }
  }, [handleLoadMore, page, params]);

  const isEmpty = () =>
    !searchName || (searchName && String(searchName).trim().length === 0);

  function cancelQuery() {
    setSearchName(undefined);
    //const newParams: TPartBathParams = { ...params };
    const newParams: TPartBathParams = { ...params, page: 0 };
    __DEV__ && console.log('[Bathees Screeen] cancelQuery', newParams);
    if (hasQuery(newParams)) {
      delete newParams.search_query;
    }
    handleFilter(newParams);
  }

  function switchEnter(length: number, newParams: TPartBathParams) {
    switch (length) {
      case 0:
        if (hasQuery(params)) {
          delete newParams.search_query;
          //handleFilter(newParams);
          debounced(newParams);
        }
        break;
      case 1:
      case 2:
        return;
      default:
        debounced(newParams);
    }
  }

  // for test
  const handleOpenBath = (bath: IBath, distance: number) => {
    // transparentHeader();
    navigation.navigate(routes.bathesTab.BathScreen, {
      id: bath.id,
      latitude: bath.latitude,
      longitude: bath.longitude,
      distance: distance,
    });
  };

  const keyExtractor = useCallback((item: IBath, index) => String(index), []);
  const iosStyle = isIos ? { paddingLeft: wp(5) } : {};
  const hasQuery = (checkParams: TPartBathParams) =>
    checkParams.hasOwnProperty('search_query');

  const renderItem = useCallback(
    ({ item, index }: { item: IBath; index: number }) => {
      const map = maps.find((_map: IMap) => _map.bathId === item.id);
      const distance: number = map?.distance || 0;
      return (
        <TouchableOpacity onPress={handleOpenBath.bind(null, item, distance)}>
          <BathItem
            key={`item-${index}`}
            bath={item}
            distance={distance}
            persistImage={persistImage}
          />
        </TouchableOpacity>
      );
    },
    // В зависимостях должно быть userLocation
    // т/к удаленность зависит от изменения локации пользователя
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [persistImage, /* userLocation, */ maps],
  );

  let emptyComponent = null;
  if (!loading && filtered && connection) {
    emptyComponent = <NotFound />;
  } else if (!loading && !filtered) {
    emptyComponent = (
      <UpdateRequestButton title="Обновить" handleLoadMore={handleLoadMore} />
    );
  }

  let footerComponent = null;
  if (loading) {
    footerComponent = <AppListIndicator />;
  } else if (totalBathes > 0 && totalBathes === bathes?.length) {
    footerComponent = <CancelLink cancelQuery={cancelQuery} />;
  } // Отсутствие сети, 1 запрос правильный, 2 дает сбой -> под списком повторить запрос
  else if (!connection && bathes?.length !== 0) {
    footerComponent = (
      <UpdateRequestButton
        title="Повторить запрос"
        handleLoadMore={handleLoadMore}
      />
    );
  }

  return (
    <Block full padding={[sizes.offset.base, sizes.offset.base, 0, 4]}>
      <AppText margin={[0, 0, 2, 4]} h1>
        Каталог бань
      </AppText>
      <Block padding={[0, 0, 0, 4]} center row>
        <Block style={styles.searchWrapper} center row>
          <TextInput
            style={styles.searchInput}
            placeholder="Что вы ищите?"
            onChangeText={(name: string) => {
              const newName = String(name);
              setSearchName(newName);
              const modifiedName =
                '%' + newName.toLowerCase().trim().replace(' ', '%') + '%';
              __DEV__ && console.log('[BathesScreen]', modifiedName);
              const newParams: TPartBathParams = {
                ...params,
                search_query: modifiedName,
              };
              switchEnter(newName.length, newParams);
            }}
            value={searchName}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={64}
          />
          {isEmpty() ? (
            <TouchableOpacity
              style={styles.searchIconButton}
              onPress={() => { }}>
              <SearchIcon style={styles.searchIcon} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.searchIconButton}
              onPress={cancelQuery}>
              <SearchCancelIcon style={styles.searchIcon} />
            </TouchableOpacity>
          )}
        </Block>
        <FilterButton navigation={navigation} filterCount={filterCount} />
      </Block>
      {/* Sort */}
      <TouchableOpacity
        onLayout={(event) => setYForModal(event.nativeEvent.layout.y)}
        style={styles.sort}
        onPress={() =>
          openModal({ modalType: 'SortModal', modalProps: { y: yForModal } })
        }>
        <AppText>Сортировать</AppText>
        <ListIcon />
      </TouchableOpacity>

      <Block margin={[sizes.offset.between, 0, 0]} />

      <FlatList
        data={bathes}
        style={iosStyle}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.1}
        onEndReached={handleLoadMore}
        ListEmptyComponent={emptyComponent}
        ListFooterComponent={footerComponent}
      />
    </Block>
  );
}

const BathesScreenConnected = connect(
  ({ bath, system, auth }: IRootState) => ({
    location: auth.currentUser?.location,
    connection: system.connection,
    loading: bath.loading,
    totalBathes: bath.totalBathes,
    bathes: bath.bathes,
    maps: bath.maps,
    params: bath.params,
    moreBathes: bath.moreBathes,
    retainState: bath.retainState,
    filtered: bath.filtered,
    filterCount: bath.filterCount,
  }),
  {
    getBathes: getBathesAction,
    fetchBathes: fetchBathesAction,
    //updateBath: updateBathAction,
    persistImage: persistImageAction,
    openModal: openModalAction,
    clearBathes: clearBathesAction,
    setFilter: setFilterAction,
    fetchMaps: fetchMapsAction,
  },
)(BathesScreenContainer);

export { BathesScreenConnected as BathesScreen };

// Если изменились права на локацию, то начинаем запрос заново
/* useEffect(() => {
    if (localPermission && maps.length === 0) {
      __DEV__ && console.log('[BathesScreen/useEffect(localPermission && maps === 0)]');
      const bathParams: TPartBathParams = {
        ...params,
        page: 0,
      };
      clearBathes();
      setFilter({ params: bathParams });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localPermission, maps]); */
