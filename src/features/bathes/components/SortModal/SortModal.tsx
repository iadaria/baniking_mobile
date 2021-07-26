import React, { FC, useEffect, useState } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { AppText, Block, Divider } from '~/src/app/common/components/UI';
import ModalWrapper from '~/src/app/common/modals/ModalWrapper';
import { closeModal } from '~/src/app/common/modals/modalReducer';
import { clearBathes, setSort } from '../../store/bathActions';
import { BathSort } from '~/src/app/models/bath';
import { isIos, statusBarHeight } from '~/src/app/common/constants/platform';
import { ListIcon } from '~/src/assets';
import { IRootState } from '~/src/app/store/rootReducer';
import { styles as s } from './styles';

interface ISortItem {
  title: string;
  activeStyle: StyleProp<ViewStyle>;
  onItemPress: () => void;
}

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
  const { sort } = useSelector(({ bath }: IRootState) => bath);
  const [currentSort, setCurrentSort] = useState<BathSort>(sort);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sort !== currentSort) {
      dispatch(clearBathes());
      dispatch(setSort(currentSort));
      dispatch(closeModal());
    }
  }, [currentSort, dispatch, sort]);

  let _y = !y || y < 100 ? 130 : y;
  _y = isIos ? _y + statusBarHeight : y;

  const modalStyle = { marginTop: _y + wp(13) };

  const itemColor = (as: BathSort) => (currentSort === as ? s.activeStyle : {});

  function handleItemPress(bs: BathSort) {
    if (sort === bs) {
      dispatch(closeModal());
      return;
    }
    setCurrentSort(bs);
  }

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
            onItemPress={() => handleItemPress(BathSort.PriceAsc)}
          />

          <Divider style={s.divider} />

          <SortItem
            title="По убыванию цены"
            activeStyle={itemColor(BathSort.PriceDesc)}
            onItemPress={() => handleItemPress(BathSort.PriceDesc)}
          />

          <Divider style={s.divider} />

          <SortItem
            title="По рейтингу"
            activeStyle={itemColor(BathSort.RatingDesc)}
            onItemPress={() => handleItemPress(BathSort.RatingDesc)}
          />

          <Divider style={s.divider} />

          <SortItem
            title="Без сортировки"
            activeStyle={[itemColor(BathSort.None), s.end]}
            onItemPress={() => handleItemPress(BathSort.None)}
          />
        </Block>
      </TouchableOpacity>
    </ModalWrapper>
  );
}
