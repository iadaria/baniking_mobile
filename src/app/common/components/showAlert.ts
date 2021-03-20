import { Alert, AlertButton } from 'react-native';

export const showAlert = (
  title: string,
  message: string,
  textOk?: string,
  onOkPress?: () => void,
  cancel?: boolean,
) => {
  const buttons: AlertButton[] = [
    {
      text: textOk || 'OK',
      onPress: () => {
        onOkPress && onOkPress();
      },
      style: 'default',
    },
  ];
  if (cancel) {
    buttons.push({
      text: 'Отмена',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    });
  }
  return Alert.alert(title, message, buttons, { cancelable: !!cancel });
};
