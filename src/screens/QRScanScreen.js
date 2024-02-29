import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {IMAGES} from '../assets/images';
import HeaderComponent from '../components/HeaderComponent';
import QrScanComponent from '../components/home/QrScanComponent';

import {useDispatch, useSelector} from 'react-redux';
import {showToast} from '../configurations/ToastConfig';
import Loader from '../components/Loader';
import {useFocusEffect} from '@react-navigation/native';
import {
  coinRequestCancelNotifyAction,
  findCoinStatusAction,
  resetPaymentAction,
} from '../redux/actions/paymentAction';

const QRScanScreen = ({navigation, route}) => {
  const {amount} = route?.params;
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const merchantCoinRequestSaveSuccess = useSelector(
    state => state.paymentState.merchantCoinRequestSaveSuccess,
  );

  const findCoinStatusSuccess = useSelector(
    state => state.paymentState.findCoinStatusSuccess,
  );

  const coinRequestCancelNotifySuccess = useSelector(
    state => state.paymentState.coinRequestCancelNotifySuccess,
  );

  const [requestData, setRequestData] = useState({
    id: -1,
  });

  useFocusEffect(
    React.useCallback(() => {
      if (merchantCoinRequestSaveSuccess) {
        // requestData.id = orderPaymentRequestSuccess?.result?.id;
        setRequestData({
          id: merchantCoinRequestSaveSuccess?.result?.id,
        });
        console.log('requ id ' + requestData.id);
        dispatch(resetPaymentAction());
      }

      if (findCoinStatusSuccess) {
        showToast({code: 200, result: 'User Accepted Payment.!'});
        // dispatch(orderPaymentChargeAction(payment));
        setRequestData({
          id: -1,
        });

        dispatch(resetPaymentAction());
      }

      if (coinRequestCancelNotifySuccess) {
        showToast({code: 500, result: 'User Rejected Payment.!'});
        navigation.navigate('MerchantScanScreen');
        setLoad(false);
        setRequestData({
          id: -1,
        });
        dispatch(resetPaymentAction());
      }

      // //Requesting Start part
      const proccess = setInterval(() => {
        console.log('Request Sent Merchant ');
        // console.log(requestData);
        dispatch(findCoinStatusAction(requestData));

        dispatch(coinRequestCancelNotifyAction(requestData));
      }, 2000);

      //Screen move Requesting Stop part
      return () => {
        console.log('Request Stopped');
        clearInterval(proccess);
      };
    }, [
      merchantCoinRequestSaveSuccess,
      findCoinStatusSuccess,
      coinRequestCancelNotifySuccess,
    ]),
  );

  return (
    <View>
      <HeaderComponent navigation={navigation} />

      {/* <ScrollView> */}
      <Image source={IMAGES.whiteBackgroundIMG} style={styles.whiteBG} />

      <QrScanComponent navigation={navigation} amount={amount} />
      {/* <QrScan navigation={navigation} /> */}

      {/* <Loader isLoading={load} /> */}
      {/* </ScrollView> */}
    </View>
  );
};

export default QRScanScreen;

const styles = StyleSheet.create({});
