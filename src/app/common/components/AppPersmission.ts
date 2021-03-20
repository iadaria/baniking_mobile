import { Platform } from 'react-native';
import { check, PERMISSIONS, RESULTS, request, requestNotifications, Permission } from 'react-native-permissions';

const PLATFORM_PHOTO_PERMISSIONS = {
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
};

const PLATFORM_LOCATION_PERMISSIONS = {
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, // && PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
};

const PLATFORM_ACCESS_BACKGROUND_PERMISSIONS = {
  ios: null,
  android: PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
};

const REQUEST_PERMISSION_TYPE = {
  photo: PLATFORM_PHOTO_PERMISSIONS,
  location: PLATFORM_LOCATION_PERMISSIONS,
  background: PLATFORM_ACCESS_BACKGROUND_PERMISSIONS,
};

const PERMISSION_TYPE = {
  photo: 'photo',
  location: 'location',
  background: 'background',
};

class AppPermission {
  checkPermission = async (type: any): Promise<[boolean, string]> => {
    console.log('[AppPermission/checkPermission] type', type);
    const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];
    console.log('[AppPermission/checkPermission] permissions', permissions);

    if (!permissions) {
      return [true, ''];
    }

    try {
      const result = await check(permissions);
      console.log('[AppPermission/checkPermission] result', result);
      if (result === RESULTS.GRANTED) {
        return [true, ''];
      }
      return this.requestPermission(permissions);
    } catch (error) {
      console.log('[AppPermission/checkPermission] error', error);
      return [false, ''];
    }
  };

  checkPermissionWithoutRequest = async (type: any): Promise<[boolean, string]> => {
    console.log('[AppPermission/checkPermission] type', type);
    const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS];
    console.log('[AppPermission/checkPermission] permissions', permissions);

    if (!permissions) {
      return [true, ''];
    }

    try {
      const result = await check(permissions);
      console.log('[AppPermission/checkPermission] result', result);
      if (result === RESULTS.GRANTED) {
        return [true, ''];
      }
      return [false, result];
    } catch (error) {
      console.log('[AppPermission/checkPermission] error', error);
      return [false, ''];
    }
  };

  requestPermission = async (permissions: Permission): Promise<[boolean, string]> => {
    console.log('[AppPermission/requestPersmission] permission', permissions);
    try {
      const result = await request(permissions);
      console.log('[AppPermission/requestPersmission] result', result);
      return [result === RESULTS.GRANTED, result];
      // return result === RESULTS.GRANTED;
    } catch (error) {
      console.log('[AppPermission/requestPersmission] error', error);
      return [false, ''];
    }
  };

  requestNotifyPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      return true;
    }

    const { status, settings } = await requestNotifications(['alert', 'sound', 'badge']);
    console.log('[AppPermission/requestNotifyPermission] status/settings', status, settings);
    return status === RESULTS.GRANTED;
  };
}

const appPermission = new AppPermission();

export { appPermission as AppPermission, PERMISSION_TYPE };

// use can put null id don't need permission

// microphone: PLATFORM_MICROPHONE_PERMISSIONS,
// send_sms: PLATFORM_SEND_SMS_PERMISSIONS,

// microphone: 'microphone',
// send_sms: 'send_sms',

/* const PLATFORM_SEND_SMS_PERMISSIONS = {
  ios: null,
  androdi: PERMISSIONS.ANDROID.SEND_SMS,
}; */

/* const PLATFORM_MICROPHONE_PERMISSIONS = {
  ios: PERMISSIONS.IOS.MICROPHONE,
  android: PERMISSIONS.ANDROID.RECORD_AUDIO,
}; */
