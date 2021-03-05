import React, { useEffect } from 'react';
import { ActivityIndicator, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getQrCode as getQrCodeAction } from '../../store/profileActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { colors, sizes } from '~/src/app/common/constants';
import { AppText, Block } from '~/src/app/common/components/UI';
import { styles } from './styles';

interface IProps {
  loading: boolean;
  qr?: string;
  getQrCode: () => void;
}

export function QrScreenContainer({ loading, qr, getQrCode }: IProps) {
  useEffect(() => {
    if (!qr) {
      // getQrCode();
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
      <AppText margin={[0, 0, 2]} h1>
        Qr код
      </AppText>

      <Block debug>
        <AppText>Daria</AppText>
        <Image source={{ uri: qr }} style={styles.qr} />
      </Block>
    </Block>
  );
}

const QrScreenConnected = connect(
  ({ auth, profile }: IRootState) => ({
    loading: profile.loading,
    qr: profile.currentUserProfile?.qr,
  }),
  {
    getQrCode: getQrCodeAction,
  },
)(QrScreenContainer);

export { QrScreenConnected as QrScreen };
