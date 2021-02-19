import { Alert } from 'react-native';

export const showAlert = (title: string, message: string) =>
  Alert.alert(
    title,
    message,
    [
      /* {
        text: 'Ask me later',
        onPress: () => console.log('Ask me later pressed'),
      }, */
      /* {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      }, */
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ],
    { cancelable: false },
  );
