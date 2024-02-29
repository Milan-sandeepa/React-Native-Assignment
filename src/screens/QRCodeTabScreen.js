import React, {useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import {IMAGES} from '../assets/images';
import HeaderComponent from '../components/HeaderComponent';
import QrCodeComponent from '../components/home/QrCodeComponent';
import {reset} from '../navigations/NavActions';
import {useDispatch, useSelector} from 'react-redux';
import {getRefreshCoinsAction} from '../redux/actions/paymentAction';
import {useFocusEffect} from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';
import {
  fcmTokenUpdateAction,
  resetUserCheckAction,
  userCheckAction,
} from '../redux/actions/authAction';
import EmptyView from '../components/EmptyView';
import {dimensions} from '../configurations/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDeviceFcmToken} from '../configurations/FcmConfig';

const QRCodeTabScreen = ({navigation}) => {
  const dispatch = useDispatch();
  // ** selector
  const userSave = useSelector(state => state.authState.userSave);
  const merchantCoinTransferSuccess = useSelector(
    state => state.paymentState.merchantCoinTransferSuccess,
  );

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getDeviceFcmToken();
      // Store the token in AsyncStorage
      await AsyncStorage.setItem('fcmToken', token);
      console.log('Device Token:', token);

      const data = {
        userEmail: userSave?.email,
        fcmToken: token,
      };
      dispatch(fcmTokenUpdateAction(data));
    };

    fetchToken();
  }, []);

  useEffect(() => {
    reset('tabNavigation');

    userSave && dispatch(getRefreshCoinsAction(userSave?.email));
  }, []);

  useEffect(() => {
    if (merchantCoinTransferSuccess) {
      dispatch(getRefreshCoinsAction(userSave?.email));
    }
  }, [merchantCoinTransferSuccess]);
  console.log('----------------------------');

  return (
    <View>
      <HeaderComponent navigation={navigation} />
      {/* <ScrollView> */}
      <Image source={IMAGES.whiteBackgroundIMG} style={styles.whiteBG} />

      <QrCodeComponent navigation={navigation} />

      {/* </ScrollView> */}
    </View>
  );
};

export default QRCodeTabScreen;

const styles = StyleSheet.create({});
