import React from 'react';
import { TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { AppText, Block, Divider } from '~/src/app/common/components/UI';
import ModalWrapper from '~/src/app/common/modals/ModalWrapper';
import { closeModal } from '~/src/app/common/modals/modalReducer';
import { setFilter } from '../../store/bathActions';
import { TPartBathParams } from '~/src/app/models/bath';
import { isIos, statusBarHeight } from '~/src/app/common/constants/platform';
import { styles } from './styles';
import { ListIcon } from '~/src/assets';
import { IRootState } from '~/src/app/store/rootReducer';
import { colors } from '~/src/app/common/constants/colors';

export interface ISortModal {
  y: number;
}

export default function SortModal({ y }: ISortModal) {
  const dispatch = useDispatch();
  const { filter, sorted } = useSelector(({ bath }: IRootState) => bath);
  console.log('[SortModal]', y);
  let _y = !y || y < 100 ? 130 : y;
  _y = isIos ? _y + statusBarHeight : y;

  const modalStyle = { marginTop: _y + wp(13) };

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

          <TouchableOpacity style={[styles.item]}>
          <AppText primary medium>
            По возрастанию цены
          </AppText>
          </TouchableOpacity>
          <Divider style={styles.divider} />

          <TouchableOpacity style={[styles.item]}>
          <AppText primary medium>
            По убыванию цены
          </AppText>
          </TouchableOpacity>
          <Divider style={styles.divider} />

          <TouchableOpacity style={[styles.item]}>
            <AppText primary medium>
              По рейтингу
            </AppText>
          </TouchableOpacity>

          <Divider style={styles.divider} />

          <TouchableOpacity
            style={[styles.item, !sorted ? styles.activeStyle : {}, styles.end]}
            onPress={() => {
              if (sorted) {
                const params: TPartBathParams = {
                  page: filter.page,
                };
                dispatch(setFilter(params));
              }
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
