import React, { useEffect } from 'react';
import { ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { getQrCode as getQrCodeAction } from '../../store/profileActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { colors, sizes } from '~/src/app/common/constants';
import { AppInput, AppText, Block } from '~/src/app/common/components/UI';
import { styles } from './styles';
import { QrLogoIcon } from '~/src/assets';
import { getCardNumber } from '~/src/app/utils/system';

interface IProps {
  loading: boolean;
  qr?: string;
  cardNumber?: string;
  getQrCode: () => void;
}

export function QrScreenContainer({ loading, qr, getQrCode, cardNumber }: IProps) {
  useEffect(() => {
    if (!qr) {
      getQrCode();
    }
  }, [getQrCode, qr]);

  if (loading) {
    return (
      <Block full center middle>
        <ActivityIndicator size="small" color={colors.secondary} />
      </Block>
    );
  }

  return (
    <Block base full>
      <AppText h1 left>
        Qr код
      </AppText>

      <QrLogoIcon style={styles.qrLogo} />

      <AppText center size={sizes.text.label} color={colors.qr.text} height={18}>
        {'Поднесите QR-код на экране к \n считывающему устройству'}
      </AppText>

      <Image source={{ uri: qr }} style={styles.qr} />

      <AppText margin={[6, 0, 0.5]} semibold size={sizes.text.label} center>
        Номер карты
      </AppText>
      <AppInput style={styles.input} center>
        {cardNumber}
      </AppInput>
    </Block>
  );
}

const QrScreenConnected = connect(
  ({ auth, profile }: IRootState) => ({
    loading: profile.loading,
    qr: profile.currentUserQr?.qr,
    cardNumber: profile.currentUserQr?.cardNumber,
  }),
  {
    getQrCode: getQrCodeAction,
  },
)(QrScreenContainer);

export { QrScreenConnected as QrScreen };
