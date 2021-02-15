import React from 'react';
import FlashMessage from 'react-native-flash-message';
import { statusBarHeight } from '~/src/app/common/constants';
import { InfoMessage, InfoError } from '~/src/app/common/components/ToastNotify/ToastNotify';
import styles from './styles';

export default function AppFlashMessage() {
  return (
    <FlashMessage
      position={{ top: statusBarHeight, left: 0, right: 0 }}
      // autoHide={false}
      duration={4000}
      animated={false}
      // animationDuration={500}
      hideOnPress
      titleStyle={styles.flashTitle}
      MessageComponent={(props: any) => {
        // console.log('********', props);
        switch (props.message.type) {
          case 'info':
            return <InfoMessage {...props} />;
          case 'error':
          case 'warning':
            return <InfoError {...props} />;
          default:
            return <InfoMessage {...props} />;
        }
      }}
    />
  );
}
