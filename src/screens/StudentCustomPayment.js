import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
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
  chargeFromStudentAction,
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
import {
  resetUserCheckAction,
  userCheckAction,
} from '../redux/actions/authAction';
import AwesomeAlert from 'react-native-awesome-alerts';

const StudentCustomPayment = ({navigation, route}) => {
  const dispatch = useDispatch();
  const userSave = useSelector(state => state.authState.userSave);
  // ** state
  const [value, setValue] = useState('');
  const [pin, setPin] = useState('');
  const [load, setLoad] = useState(false);

  const isDisabled = value === '';

  const data = route?.params;

  const [payment, setPayment] = useState({
    userEmail: data.userEmail,
    merchantEmail: userSave?.email,
    chargeAmount: '',
  });

  const chargeFromStudentLoading = useSelector(
    state => state.paymentState.chargeFromStudentLoading,
  );
  const chargeFromStudentSuccess = useSelector(
    state => state.paymentState.chargeFromStudentSuccess,
  );
  const chargeFromStudentFailed = useSelector(
    state => state.paymentState.chargeFromStudentFailed,
  );
  const userCheckLoading = useSelector(
    state => state.authState.userCheckLoading,
  );

  const userCheckSuccess = useSelector(
    state => state.authState.userCheckSuccess,
  );

  const userCheckFailed = useSelector(state => state.authState.userCheckFailed);

  const [user, setUser] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const dataCheck = {
    userEmail: data.userEmail,
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(userCheckAction(dataCheck));
    }, []),
  );

  useEffect(() => {
    if (userCheckSuccess) {
      setUser(userCheckSuccess?.result);
    }
    dispatch(resetUserCheckAction());
  }, [userCheckSuccess]);

  const goNextScreenHandler = () => {
    setShowAlert(true);
  };

  useEffect(() => {
    if (chargeFromStudentSuccess) {
      let msg = chargeFromStudentFailed?.result?.toString();
      showToast({code: 200, result: msg});
      navigation.navigate('MerchantCongrateScreen', {
        amount: payment.chargeAmount,
      });
      setLoad(false);
      setShowAlert(false);
    } else if (chargeFromStudentFailed) {
      let msg = chargeFromStudentFailed?.result?.toString();
      setLoad(false);
      showToast({code: 500, result: msg});
    }
    dispatch(resetPaymentAction());
  }, [chargeFromStudentSuccess, chargeFromStudentFailed]);

  useEffect(() => {
    dispatch(getRefreshCoinsAction(userSave.email));
  }, []);

  const cancleHandler = () => {
    setShowAlert(false);
    console.log('Cancle button Pressed');
  };

  const conformHandler = () => {
    setLoad(true);
    const data = {
      merchantEmail: userSave?.email,
      userEmail: payment.userEmail,
      chargeAmount: payment.chargeAmount,
      pin: pin,
    };

    dispatch(chargeFromStudentAction(data));

    console.log('Submit button Pressed');
  };

  return (
    <View>
      <HeaderComponent navigation={navigation} />

      <ScrollView>
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
          <Text style={styles.successText}>
            {user?.firstName + ' ' + user?.lastName}
          </Text>

          <Text style={styles.successText}>{user?.contact}</Text>
          <Text style={styles.successText}>{user?.fkCollage?.name}</Text>
          <EmptyView style={{height: dimensions.heightLevel2}} />

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
                backgroundColor:
                  value === '' ? colors.disabled : colors.primary,
              }}
              labelStyle={{
                fontSize: fontSizes.fontXLarge,
                fontFamily: fontFamilies.InterBold,
              }}
              loading={false}
              disabled={value === ''}>
              REQUEST PAYMENT
            </Button>

            <AwesomeAlert
              show={showAlert}
              title={'Enter PIN'}
              titleStyle={{color: 'red'}}
              message={'Rs.' + payment.chargeAmount}
              messageStyle={{fontSize: 30}}
              showCancelButton={true}
              showConfirmButton={true}
              onCancelPressed={cancleHandler}
              onConfirmPressed={conformHandler}
              confirmText="Pay"
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              customView={
                <View style={styles.customView}>
                  <TextInput
                    style={{width: 110}}
                    keyboardType="number-pad"
                    maxLength={4}
                    onChangeText={text => {
                      setPin(text);
                    }}
                    value={pin}
                  />
                  <EmptyView style={{height: dimensions.heightLevel1}} />
                </View>
              }
            />
          </View>
        </View>
        <Loader isLoading={load} />
      </ScrollView>
    </View>
  );
};

export default StudentCustomPayment;

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
  customView: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 140,
  },
});
