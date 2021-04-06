import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppText, Block } from '~/src/app/common/components/UI';
import ModalWrapper from '~/src/app/common/modals/ModalWrapper';
import { KeyboardWrapper } from '~/src/app/common/components/KeyboardWrapper';
import { transparentHeader, nonTransparentHeader } from '~/src/app/store/system/systemActions';
import { closeModal } from '~/src/app/common/modals/modalReducer';
import { formatPhoneNumber } from '~/src/app/utils/system';
import OrderCallForm from './OrderCallForm';
import { CloseWhiteIcon } from '~/src/assets';
import { isAndroid, multiplier } from '~/src/app/common/constants';
import { styles } from './styles';

interface IProps {
  bathId: number;
  bathName: string;
  short_description: string;
  bathPhone: string;
  userName: string;
  userPhone: string;
}

export default function OrderCallModal({ bathName, short_description, bathPhone, userName, userPhone }: IProps) {
  const dispatch = useDispatch();
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollPosition, setScrollPosition] = useState<number | undefined>();

  useEffect(() => {
    dispatch(nonTransparentHeader());
    return () => {
      dispatch(transparentHeader());
    };
  }, [dispatch]);

  return (
    <ModalWrapper>
      {/* <Block style={styles.modalView}> */}
      <KeyboardWrapper>
        <ScrollView
          ref={scrollViewRef}
          style={styles.modalView}
          scrollEnabled
          //scrollToOverflowEnabled
          //showsVerticalScrollIndicator={false}
          onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) =>
            setScrollPosition(event.nativeEvent.contentOffset.y)
          }>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => {
              isAndroid && dispatch(transparentHeader());
              dispatch(closeModal());
            }}>
            <CloseWhiteIcon />
          </TouchableOpacity>
          <Block>
            <AppText
              margin={[6 * multiplier, 0, 0]}
              transform="uppercase"
              height={28 * multiplier}
              trajan
              center
              h1>
              {bathName}
            </AppText>
            <AppText margin={[1, 0, 1.5]} secondary center tag>
              {short_description && `${short_description.substring(0, 25)} ...`}
            </AppText>
            <AppText margin={[2, 0, 1]} center>
              Вы можете позвонить по номеру
            </AppText>
            <AppText margin={[0, 0, 3.5 * multiplier]} center golder h2>
              {formatPhoneNumber(bathPhone)}
            </AppText>
            <AppText center>или</AppText>
          </Block>
          {/* Форма */}
          <OrderCallForm
            name={userName}
            phone={userPhone}
            scrollViewRef={scrollViewRef}
            scrollPosition={scrollPosition}
          />
        </ScrollView>
      </KeyboardWrapper>
    </ModalWrapper>
  );
}
