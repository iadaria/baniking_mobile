import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { showAlert } from './showAlert';
import { updateStateConnection } from '../../store/system/systemActions';

const Network = () => {
  const dispatch = useDispatch();
  // const [connected, setConnection] = useState(false);

  useEffect(() => {
    const connectionListener = NetInfo.addEventListener((state) => {
      const { isConnected } = state;
      if (!isConnected) {
        showAlert('Сеть', 'Подключение к интернету отсутствует');
      }
      dispatch(updateStateConnection(isConnected));
    });

    return () => {
      // remove listener
      connectionListener();
    };
  }, [dispatch]);

  return <React.Fragment />;
};

export default React.memo(Network);
