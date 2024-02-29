import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IMAGES} from '../assets/images';
import HeaderComponent from '../components/HeaderComponent';
import Lottie from 'lottie-react-native';
import {
  colors,
  dimensions,
  fontFamilies,
  fontSizes,
} from '../configurations/constants';
import EmptyView from '../components/EmptyView';
import {Button, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  chargeFromUserAction,
  coinRequestCancelNotifyAction,
  findCoinStatusAction,
  getRefreshCoinsAction,
  merchantCoinRequestSaveAction,
  resetPaymentAction,
} from '../redux/actions/paymentAction';
import {onBackPress} from '../utilitys/backButtonUtil';
import {TabActions, useFocusEffect} from '@react-navigation/native';
import Loader from '../components/Loader';
import {showToast} from '../configurations/ToastConfig';

const CustomOrderPaymentRequestScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const userSave = useSelector(state => state.authState.userSave);
  // ** state
  const [value, setValue] = useState('');
  const [load, setLoad] = useState(false);

  const isDisabled = value === '';

  const data = route?.params;

  const [payment, setPayment] = useState({
    userEmail: data.userEmail,
    merchantEmail: userSave?.email,
    chargeAmount: '',
  });

  const chargeFromUserSuccess = useSelector(
    state => state.paymentState.chargeFromUserSuccess,
  );
  const chargeFromUserFailed = useSelector(
    state => state.paymentState.chargeFromUserFailed,
  );
  const findCoinStatusSuccess = useSelector(
    state => state.paymentState.findCoinStatusSuccess,
  );

  const merchantCoinRequestSaveSuccess = useSelector(
    state => state.paymentState.merchantCoinRequestSaveSuccess,
  );

  const coinRequestCancelNotifySuccess = useSelector(
    state => state.paymentState.coinRequestCancelNotifySuccess,
  );

  const [requestData, setRequestData] = useState({
    id: -1,
  });

  const goNextScreenHandler = () => {
    console.log('amount ', payment);
    setLoad(true);

    dispatch(merchantCoinRequestSaveAction(payment));
    // navigation.navigate('QRScanScreen', {amount: value});
  };

  useEffect(() => {
    if (chargeFromUserSuccess) {
      navigation.navigate('MerchantCongrateScreen', {
        amount: payment.chargeAmount,
      });
      setLoad(false);
    } else if (chargeFromUserFailed) {
      let msg = chargeFromUserFailed?.result?.toString();
      showToast({code: 500, result: msg});
    }
    dispatch(resetPaymentAction());
  }, [chargeFromUserSuccess, chargeFromUserFailed]);

  useEffect(() => {
    if (findCoinStatusSuccess) {
      // showToast({code: 200, result: 'User Accepted Payment.!'});
      dispatch(chargeFromUserAction(payment));

      dispatch(resetPaymentAction());
    }
  }, [findCoinStatusSuccess]);

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

  useEffect(() => {
    dispatch(getRefreshCoinsAction(userSave.email));
  }, []);

  return (
    <View>
      <HeaderComponent navigation={navigation} />

      {/* <ScrollView> */}
      <Image source={IMAGES.whiteBackgroundIMG} style={styles.whiteBG} />

      <View style={styles.container}>
        <Lottie
          source={require('../assets/animation/qr-scan.json')}
          style={{
            position: 'absolute',
            top: dimensions.heightLevel3,
            width: 170,
            height: 170,
          }}
          colorFilters={[
            {
              keypath: 'button',
              color: '#F00000',
            },
            {
              keypath: 'Sending Loader',
              color: '#F00000',
            },
          ]}
          autoPlay
          loop={true}
        />

        <EmptyView style={{height: dimensions.heightLevel10 * 1.9}} />

        <Text style={styles.successText}>Enter Amount to Receive (RS)</Text>
        <Text style={styles.successText}>{payment.userEmail}</Text>

        {/* <Text style={styles.priceText}>INR {currencyFormat(2666777)}</Text> */}

        <EmptyView style={{height: dimensions.heightLevel1}} />

        <View style={{width: '90%'}}>
          <TextInput
            label=""
            mode="flat"
            theme={styles.textInputOutlineStyle}
            style={{
              fontStyle: 'italic',
              fontFamily: fontFamilies.InterSemiBold,
              textAlign: 'center',
              borderColor: colors.disabled,
              borderWidth: 0.5,
              backgroundColor: 'rgba(255,255,255,0.7)',
            }}
            keyboardType="number-pad"
            onChangeText={text => {
              setValue(text);

              setPayment({
                ...payment,
                chargeAmount: text,
              });
            }}
            value={value}
            // defaultValue={mobileOtp}
          />

          {/*<Text style={styles.priceText}>INR {currencyFormat(Number(value))}</Text>*/}

          <EmptyView style={{height: dimensions.heightLevel6}} />

          <Button
            mode="contained"
            onPress={goNextScreenHandler}
            textColor={'white'}
            color={colors.primary}
            style={{
              paddingVertical: 1,
              backgroundColor: value === '' ? colors.disabled : colors.primary,
            }}
            labelStyle={{
              fontSize: fontSizes.fontXLarge,
              fontFamily: fontFamilies.InterBold,
            }}
            loading={false}
            disabled={value === ''}>
            REQUEST PAYMENT
          </Button>
        </View>
      </View>
      <Loader isLoading={load} />
      {/* </ScrollView> */}
    </View>
  );
};

export default CustomOrderPaymentRequestScreen;

const styles = StyleSheet.create({
  textInputOutlineStyle: {
    colors: {
      placeholder: 'black',
      text: 'black',
      primary: 'black',
      underlineColor: 'transparent',
      background: 'white',
    },
    roundness: 5,
  },

  container: {
    width: '100%',
    position: 'absolute',
    top: 70,
    paddingHorizontal: dimensions.paddingLevel3,
    alignItems: 'center',
  },

  successText: {
    fontFamily: fontFamilies.InterMedium,
    fontSize: fontSizes.fontLarge * 0.9,
    textAlign: 'center',
    color: colors.secondary,
  },

  priceText: {
    fontFamily: fontFamilies.InterRegular,
    color: colors.black,
    fontSize: fontSizes.fontMedium,
    textTransform: 'uppercase',
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: dimensions.paddingLevel1,
    paddingHorizontal: dimensions.paddingLevel2,
  },
});
