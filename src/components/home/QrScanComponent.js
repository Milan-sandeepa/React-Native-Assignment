import React, {useEffect} from 'react';
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
  merchantCoinRequestSaveAction,
  resetPaymentAction,
} from '../../redux/actions/paymentAction';
import {useState} from 'react';
import Loader from '../Loader';

var isDisable = true;

const QrScanComponent = ({navigation, amount}) => {
  const dispatch = useDispatch();
  const userSave = useSelector(state => state.authState.userSave);
  const [payment, setPayment] = useState({
    userEmail: '',
    merchantEmail: userSave?.email,
    chargeAmount: amount,
  });
  const [load, setLoad] = useState(false);
  const chargeFromUserSuccess = useSelector(
    state => state.paymentState.chargeFromUserSuccess,
  );
  const chargeFromUserFailed = useSelector(
    state => state.paymentState.chargeFromUserFailed,
  );
  const findCoinStatusSuccess = useSelector(
    state => state.paymentState.findCoinStatusSuccess,
  );
  useEffect(() => {
    userSave && dispatch(getRefreshCoinsAction(userSave?.email));
  }, []);

  useEffect(() => {
    if (chargeFromUserSuccess) {
      navigation.navigate('MerchantCongrateScreen', {amount: amount});
      setLoad(false);
    } else if (chargeFromUserFailed) {
      let msg = chargeFromUserFailed?.result?.toString();
      showToast({code: 500, result: msg});
    }
    dispatch(resetPaymentAction());
  }, [chargeFromUserSuccess, chargeFromUserFailed]);

  const onSuccess = e => {
    if (checkValidEmail(e.data) && amount) {
      let data = {
        userEmail: e.data,
        merchantEmail: userSave?.email,
        chargeAmount: Number(amount),
      };
      setLoad(true);
      setPayment({...payment, userEmail: e.data});

      dispatch(merchantCoinRequestSaveAction(data));
    } else {
      alert('oops! go back, something is wrong.');
      // showToast({code: -1, result: 'oops! go back, something is wrong.'});
    }
  };
  useEffect(() => {
    if (findCoinStatusSuccess) {
      showToast({code: 200, result: 'User Accepted Payment.!'});
      dispatch(chargeFromUserAction(payment));

      dispatch(resetPaymentAction());
    }
  }, [findCoinStatusSuccess]);

  return (
    <View style={styles.container}>
      <EmptyView style={{height: dimensions.heightLevel6}} />

      {/* Qr scan */}
      <View style={styles.qrContainer}>
        <QRCodeScanner
          onRead={onSuccess}
          flashMode={RNCamera.Constants.FlashMode.off}
          cameraStyle={{width: dimensions.widthLevel4, alignSelf: 'center'}}
          bottomContent={
            <View>
              <EmptyView style={{height: dimensions.heightLevel1}} />
              <Text style={styles.priceText}>Scan the QR code </Text>
            </View>
          }
        />
      </View>
      <Loader isLoading={load} />
    </View>
  );
};

export default QrScanComponent;

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
