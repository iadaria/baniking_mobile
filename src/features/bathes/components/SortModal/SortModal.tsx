import React, { FC, useState } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { AppText, Block, Divider } from '~/src/app/common/components/UI';
import ModalWrapper from '~/src/app/common/modals/ModalWrapper';
import { closeModal } from '~/src/app/common/modals/modalReducer';
import { BathSort } from '~/src/app/models/bath';
import { useDebounced } from '~/src/features/filters/hooks/useDebounced';
import { bathSortParams } from '~/src/app/models/filter';
import { isIos, statusBarHeight } from '~/src/app/common/constants/platform';
import { IRootState } from '~/src/app/store/rootReducer';
import { ListIcon } from '~/src/assets';
import { styles as s } from './styles';

interface ISortItem {
  title: string;
  activeStyle: StyleProp<ViewStyle>;
  onItemPress: () => void;
}

const TIMEOUT = 0;

const SortItem: FC<ISortItem> = ({ title, activeStyle, onItemPress }) => {
  return (
    <TouchableOpacity style={[s.item, activeStyle]} onPress={onItemPress}>
      <AppText primary medium>
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

export interface ISortModal {
  y: number;
}

export default function SortModal({ y }: ISortModal) {
  const { sort } = useSelector(({ baseFilter }: IRootState) => baseFilter);
  const [currentSort, setCurrentSort] = useState<BathSort>(sort);
  const dispatch = useDispatch();

  useDebounced({
    params: bathSortParams[currentSort!],
    deps: [currentSort, sort],
    shouldExecute: sort !== currentSort,
    timeout: TIMEOUT,
    unmount: () => dispatch(closeModal()),
  });

  let _y = !y || y < 100 ? 130 : y;
  _y = isIos ? _y + statusBarHeight : y;

  const modalStyle = { marginTop: _y + wp(13) };

  const itemColor = (as: BathSort) => (currentSort === as ? s.activeStyle : {});

  return (
    <ModalWrapper>
      <TouchableOpacity onPress={() => dispatch(closeModal())}>
        <Block style={[s.modalView, modalStyle]}>
          <Block row center style={s.item} space="between">
            <AppText primary medium>
              Сортировать
            </AppText>
            <ListIcon style={{ transform: [{ rotate: '180deg' }] }} />
          </Block>

          <Divider style={s.divider} height={1} />

          <SortItem
            title="По возрастанию цены"
            activeStyle={itemColor(BathSort.PriceAsc)}
            onItemPress={() => setCurrentSort(BathSort.PriceAsc)}
          />

          <Divider style={s.divider} />

          <SortItem
            title="По убыванию цены"
            activeStyle={itemColor(BathSort.PriceDesc)}
            onItemPress={() => setCurrentSort(BathSort.PriceDesc)}
          />

          <Divider style={s.divider} />

          <SortItem
            title="По рейтингу"
            activeStyle={itemColor(BathSort.RatingDesc)}
            onItemPress={() => setCurrentSort(BathSort.RatingDesc)}
          />

          <Divider style={s.divider} />

          <SortItem
            title="Без сортировки"
            activeStyle={[itemColor(BathSort.None), s.end]}
            onItemPress={() => setCurrentSort(BathSort.None)}
          />
        </Block>
      </TouchableOpacity>
    </ModalWrapper>
  );
}
