import React, {useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import DeviceInfo from 'react-native-device-info';
import {
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';

export const getDeviceFcmToken = async () => {
  return await messaging().getToken();
};

const FcmConfig = () => {
  useEffect(() => {
    requestPermissions();
    subscribeToBackgroundPushNotifications();
    const unsubscribe = subscribeToForegroundPushNotifications();

    return () => unsubscribe;
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android' && DeviceInfo.getApiLevelSync() >= 33) {
      checkNotifications().then(({status, settings}) => {
        console.log('Notification permission current status: ' + status);
        if (status === 'denied') {
          requestNotifications(['alert', 'sound'])
            .then(({status, settings}) => {
              console.log('Notification permission status: ' + status);
            })
            .catch(err =>
              console.log('Notification permission error: ' + error),
            );
        } else {
          console.log(status);
        }
      });
    }
  };

  // use to subscribe the foreground running app
  const subscribeToForegroundPushNotifications = () => {
    return messaging().onMessage(async remoteMessage => {
      Toast.show({
        type: 'success',
        text1: remoteMessage?.notification?.title,
        text2: remoteMessage?.notification?.body,
      });
    });
  };

  // use to subscribe the quite state app for background notifications
  const subscribeToBackgroundPushNotifications = () => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('=================================================');
      console.log(remoteMessage);
    });
  };

  return <></>;
};

export default FcmConfig;
