import React from 'react';
import { TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { AppText, Block, Divider } from '~/src/app/common/components/UI';
import ModalWrapper from '~/src/app/common/modals/ModalWrapper';
import { closeModal } from '~/src/app/common/modals/modalReducer';
import { clearBathes, setSort } from '../../store/bathActions';
import { EBathSort, EBathSortField, EBathSortType, TPartBathParams } from '~/src/app/models/bath';
import { isIos, statusBarHeight } from '~/src/app/common/constants/platform';
import { styles } from './styles';
import { ListIcon } from '~/src/assets';
import { IRootState } from '~/src/app/store/rootReducer';

export interface ISortModal {
  y: number;
}

export default function SortModal({ y }: ISortModal) {
  const dispatch = useDispatch();
  const { params, sort } = useSelector(({ bath }: IRootState) => bath);
  // __DEV__ && console.log('[SortModal]', y);
  let _y = !y || y < 100 ? 130 : y;
  _y = isIos ? _y + statusBarHeight : y;

  const modalStyle = { marginTop: _y + wp(13) };

  function handleSort(newParams: TPartBathParams, newSort: EBathSort) {
    if (sort !== newSort) {
      dispatch(clearBathes());
      dispatch(setSort({ params: newParams, sort: newSort }));
    }
    dispatch(closeModal());
  }

  return (
    <ModalWrapper>
      <TouchableOpacity onPress={() => dispatch(closeModal())}>
        <Block style={[styles.modalView, modalStyle]}>
          <Block row center style={[styles.item, { justifyContent: 'space-between' }]}>
            <AppText primary medium>
              Сортировать
            </AppText>
            <ListIcon style={{ transform: [{ rotate: '180deg' }] }} />
          </Block>

          <Divider style={styles.divider} height={1} />

          <TouchableOpacity
            style={[styles.item, sort === EBathSort.PriceAsc ? styles.activeStyle : {}]}
            onPress={() => {
              const newParams: TPartBathParams = {
                ...params,
                sort_field: EBathSortField.Price,
                sort_type: EBathSortType.Asc,
              };
              handleSort(newParams, EBathSort.PriceAsc);
            }}>
            <AppText primary medium>
              По возрастанию цены
            </AppText>
          </TouchableOpacity>
          <Divider style={styles.divider} />

          <TouchableOpacity
            style={[styles.item, sort === EBathSort.PriceDesc ? styles.activeStyle : {}]}
            onPress={() => {
              const newParams: TPartBathParams = {
                ...params,
                sort_field: EBathSortField.Price,
                sort_type: EBathSortType.Desc,
              };
              handleSort(newParams, EBathSort.PriceDesc);
            }}>
            <AppText primary medium>
              По убыванию цены
            </AppText>
          </TouchableOpacity>
          <Divider style={styles.divider} />

          <TouchableOpacity
            style={[styles.item, sort === EBathSort.RatingDesc ? styles.activeStyle : {}]}
            onPress={() => {
              const newParams: TPartBathParams = {
                ...params,
                sort_field: EBathSortField.Rating,
                sort_type: EBathSortType.Desc,
              };
              handleSort(newParams, EBathSort.RatingDesc);
            }}>
            <AppText primary medium>
              По рейтингу
            </AppText>
          </TouchableOpacity>

          <Divider style={styles.divider} />

          <TouchableOpacity
            style={[styles.item, sort === EBathSort.None ? styles.activeStyle : {}, styles.end]}
            onPress={() => {
              const newParams: TPartBathParams = { ...params };
              delete newParams.sort_field;
              delete newParams.sort_type;
              handleSort(newParams, EBathSort.None);
            }}>
            <AppText primary medium>
              Без сортировки
            </AppText>
          </TouchableOpacity>
        </Block>
      </TouchableOpacity>
    </ModalWrapper>
  );
}
