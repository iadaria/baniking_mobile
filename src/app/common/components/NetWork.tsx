import React, { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { showAlert } from './showAlert';

const Network = () => {
  // const [connected, setConnection] = useState(false);

  useEffect(() => {
    const connectionListener = NetInfo.addEventListener((state) => {
      const { isConnected } = state;
      if (!isConnected) {
        showAlert('Сеть', 'Подключение к интернету отсутствует');
      }
    });

    return () => {
      // remove listener
      connectionListener();
    };
  }, []);

  return <React.Fragment />;
};

export default React.memo(Network);
