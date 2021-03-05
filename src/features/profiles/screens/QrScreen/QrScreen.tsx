import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { getQrCode as getQrCodeAction } from '../../store/profileActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { AppText, Block } from '~/src/app/common/components/UI';
import { colors } from '~/src/app/common/constants';
import RNQRGenerator from 'rn-qr-generator';
import RNFS, { downloadFile } from 'react-native-fs';

interface IProps {
  loading: boolean;
  qr?: string;
  getQrCode: () => void;
}

export function QrScreenContainer({ loading, qr, getQrCode }: IProps) {
  const [state, setState] = useState({
    source: null,
    path: '',
    imageUri: null,
    values: {},
  });
  const [qrImg, setQrImg] = useState('');

  useEffect(() => {
    console.log('[QrScreen/useEffect]', !!qr);
    if (!qr) {
      getQrCode();
    } else {
    }
  }, [getQrCode, qr]);

  function loadFile(file: string) {
    console.log('[QrScreen]/loadFile', file);
    setState({
      ...state,
      source: { uri: file },
    });
  }

  function hnadleGetDataFromQr() {
    if (qr) {
      var image_data = qr.split('data:image/png;base64,');
      image_data = image_data[1];
      RNFS.writeFile(RNFS.CachesDirectoryPath + '/some-name.png', image_data, 'base64')
        .then((/** succcess */) => {
          const file = 'file://' + RNFS.CachesDirectoryPath + '/some-name.png';
          RNFS.exists(file).then((exists: boolean) => {
            if (exists) {
              loadFile(file);
            }
          });

          RNQRGenerator.detect({
            uri: file,
          })
            .then((response) => {
              const { values } = response; // Array of detected QR code values. Empty if nothing found.
              setState({
                ...state,
                value: values,
              });
              console.log(values);
            })
            .catch((error) => console.log('Cannot detect QR code in image', error));

          RNQRGenerator.generate({
            value: JSON.stringify(state.values),
            backgroundColor: colors.primary,
            color: colors.secondary,
            height: 100,
            width: 100,
          })
            .then((response) => {
              const { uri, width, height, base64 } = response;
              setState({ imageUri: { uri: uri } });
            })
            .catch((error) => console.log('Cannot create QR code', error));
        })
        .then(() => {
          ToastAndroid.show('Saved to gallery !!', ToastAndroid.SHORT);
        });

      // Image.getSize(qr, (width, height) => {
      //   console.log(width, height);
      // });
      // const result = Image.resolveAssetSource({
      //   uri: qr
      // });
      // console.log(result);
      // const result = decodeBase64Image(qr);
      // console.log(JSON.stringify(result, null, 4));
    }
  }

  if (loading) {
    return (
      <Block full center middle>
        <ActivityIndicator size="small" color={colors.secondary} />
      </Block>
    );
  }

  return (
    <View>
      <Text>QR screen</Text>
      <TouchableOpacity style={{ backgroundColor: 'green' }} onPress={hnadleGetDataFromQr}>
        <AppText white>Test</AppText>
      </TouchableOpacity>
      {state.source && (
        <Block debug>
          <Text>Daria</Text>
          <Image source={state.source!} style={styles.qr} />
        </Block>
      )}
      {!!state.imageUri && (
        <Block debug>
          <Text>Daria</Text>
          <Image source={state.imageUri!} style={{ width: 100, height: 100}} />
        </Block>
      )}
    </View>
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

const styles = StyleSheet.create({
  qr: {
    height: 200,
    width: 200,
    backgroundColor: colors.primary,
  },
});
