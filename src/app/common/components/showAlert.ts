import { Alert, AlertButton } from 'react-native';
import { logline } from '../../utils/debug';

export const showAlert = (
  title: string,
  message: string,
  textOk?: string,
  okPress?: () => void,
  cancelPress?: () => void,
) => {
  const buttons: AlertButton[] = [
    {
      text: textOk || 'OK',
      onPress: () => {
        okPress && okPress();
      },
      style: 'default',
    },
  ];

  if (cancelPress) {
    buttons.push({
      text: 'Отмена',
      onPress: () => {
        logline('', 'Cancel Pressed');
        cancelPress();
      },
      style: 'cancel',
    });
  }

  return Alert.alert(title, message, buttons, { cancelable: !!cancelPress });
};
