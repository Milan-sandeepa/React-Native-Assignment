import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import EmptyView from '../EmptyView';
import {
  colors,
  dimensions,
  fontFamilies,
  fontSizes,
} from '../../configurations/constants';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {checkValidEmail} from '../../utilitys/feildValidations';
import {showToast} from '../../configurations/ToastConfig';
import {useDispatch, useSelector} from 'react-redux';
import {
  chargeFromUserAction,
  getRefreshCoinsAction,
  resetPaymentAction,
} from '../../redux/actions/paymentAction';
import {useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {tr} from 'date-fns/locale';
import {
  findOrderDetailsAction,
  qrValidateAction,
  resetQrValidationAction,
  resetfindOrderDetailsAction,
} from '../../redux/actions/orderAction';
import Loader from '../Loader';
import HeaderComponent from '../HeaderComponent';

const QrScanOrderComponent = ({navigation}) => {
  const dispatch = useDispatch();
  const userSave = useSelector(state => state.authState.userSave);

  const findOrderDetailsLoading = useSelector(
    state => state.orderState.findOrderDetailsLoading,
  );

  const findOrderDetailsSuccess = useSelector(
    state => state.orderState.findOrderDetailsSuccess,
  );
  const findOrderDetailsFailed = useSelector(
    state => state.orderState.findOrderDetailsFailed,
  );

  const qrValidateSuccess = useSelector(
    state => state.orderState.qrValidateSuccess,
  );
  const qrValidateFailed = useSelector(
    state => state.orderState.qrValidateFailed,
  );

  var data = {
    id: '',
  };

  const [user, setUser] = useState({
    userEmail: '',
  });

  const [qrData, setQrData] = useState({
    email: '',
    id: '',
  });

  const onSuccess = e => {
    data.id = e.data;
    const [email, number] = e.data.split('-');

    setQrData(prevQrData => ({
      ...prevQrData,
      email: email,
      id: number ? number : 'Student', // Assuming you have userId in your state
    }));

    setUser({
      ...user,
      userEmail: email,
    });
    console.log('details-----', email, number);
    dispatch(findOrderDetailsAction(data));
  };

  useEffect(() => {
    if (findOrderDetailsSuccess) {
      if (
        findOrderDetailsSuccess?.result?.merchantEmail === userSave.email &&
        findOrderDetailsSuccess?.result?.qr_status === 'ACTIVE' &&
        findOrderDetailsSuccess?.result?.orderStatus === 'ACTIVE'
      ) {
        navigation.navigate(
          'OrderPaymentRequestScreen',
          findOrderDetailsSuccess?.result,
        );
      } else if (
        findOrderDetailsSuccess?.result?.merchantEmail === userSave.email &&
        findOrderDetailsSuccess?.result?.qr_status === 'DISABLE' &&
        findOrderDetailsSuccess?.result?.orderStatus === 'COMPLETED'
      ) {
        alert('This QR is Expired and Order completed.!');
      } else if (
        findOrderDetailsSuccess?.result?.merchantEmail === userSave.email &&
        findOrderDetailsSuccess?.result?.qr_status === 'DISABLE'
      ) {
        alert('This QR is Expired.!');
      } else {
        alert('This QR is Invalid.!');
      }

      // navigation.navigate(
      //   'OrderPaymentRequestScreen',
      //   findOrderDetailsSuccess?.result,
      // );

      console.log('details-----', userSave);
    } else if (findOrderDetailsFailed) {
      // alert('oops! go back, something is wrong.');
      // showToast({code: -1, result: 'oops! go back, something is wrong.'});
      // showToast({code: -1, result: 'Enter'});
      dispatch(qrValidateAction(qrData));
      console.log('qr failddata-----', qrData);
      // navigation.navigate('CustomOrderPaymentRequestScreen', user);
    }
    dispatch(resetfindOrderDetailsAction());
  }, [findOrderDetailsSuccess, findOrderDetailsFailed]);

  useEffect(() => {
    if (qrValidateSuccess) {
      // navigation.navigate('CustomOrderPaymentRequestScreen', user);
      if (qrValidateSuccess?.result === 'valid QR code') {
        // alert('This QR is valid.!');
        navigation.navigate('CustomOrderPaymentRequestScreen', user);
      } else if (qrValidateSuccess?.result === 'Student QR code') {
        navigation.navigate('StudentCustomPayment', user);
      }
      // alert('This QR is valid.!');

      console.log('logdddddddd', qrValidateSuccess?.result);
    } else if (qrValidateFailed) {
      // if (qrValidateFailed?.result === 'Expired QR code') {
      // } else {
      //   alert('This QR is Expired.!');
      // }
      alert('This QR is Expired.!');
      console.log('logdddddddd', qrValidateFailed?.result);
    }
    dispatch(resetQrValidationAction());
  }, [qrValidateSuccess, qrValidateFailed]);
  return (
    <View style={styles.container}>
      <EmptyView style={{height: dimensions.heightLevel6}} />

      {/* Qr scan */}
      <View style={styles.qrContainer}>
        <QRCodeScanner
          onRead={onSuccess}
          flashMode={RNCamera.Constants.FlashMode.off}
          cameraStyle={{width: dimensions.widthLevel4, alignSelf: 'center'}}
          // type={RNCamera.Constants.Type.back}
          reactivate={true}
          reactivateTimeout={2000}
          bottomContent={
            <View>
              <EmptyView style={{height: dimensions.heightLevel1}} />
              <Text style={styles.priceText}>Scan the QR code </Text>
            </View>
          }
        />
      </View>
      {/* <Loader isLoading={findOrderDetailsLoading} /> */}
    </View>
  );
};

export default QrScanOrderComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    top: 70,
    paddingHorizontal: dimensions.paddingLevel3,
  },

  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
    padding: dimensions.paddingLevel1,
    backgroundColor: colors.white,
    alignItems: 'flex-end',
  },

  curText: {
    color: colors.primary,
    textAlign: 'right',
    fontFamily: fontFamilies.InterRegular,
    fontSize: fontSizes.fontSmallPlus,
    paddingBottom: 2,
  },

  priceText: {
    color: colors.primary,
    textAlign: 'right',
    fontFamily: fontFamilies.InterSemiBold,
    fontSize: fontSizes.fontLarge,
  },

  qrContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
