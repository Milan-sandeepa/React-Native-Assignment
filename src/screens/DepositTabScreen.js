import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {IMAGES} from '../assets/images';
import EmptyView from '../components/EmptyView';
import HeaderComponent from '../components/HeaderComponent';
import {
  colors,
  dimensions,
  fontFamilies,
  fontSizes,
  getShadowsV2,
} from '../configurations/constants';
import {Button, TextInput} from 'react-native-paper';
import {numbersOnly} from '../utilitys/feildValidations';
import {useDispatch, useSelector} from 'react-redux';
import {
  addNewPaymentAction,
  getRefreshCoinsAction,
  resetPaymentAction,
} from '../redux/actions/paymentAction';
import {showToast} from '../configurations/ToastConfig';
import Loader from '../components/Loader';
import {studentWalletAction} from '../redux/actions/reportAction';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
import {
  resetUserCheckAction,
  userCheckAction,
} from '../redux/actions/authAction';

const DepositTabScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const userSave = useSelector(state => state.authState.userSave);

  const addNewPaymentLoading = useSelector(
    state => state.paymentState.addNewPaymentLoading,
  );
  const addNewPaymentSuccess = useSelector(
    state => state.paymentState.addNewPaymentSuccess,
  );
  const addNewPaymentFailed = useSelector(
    state => state.paymentState.addNewPaymentFailed,
  );

  const getRefreshCoinLoading = useSelector(
    state => state.paymentState.getRefreshCoinLoading,
  );
  const getRefreshCoinSuccess = useSelector(
    state => state.paymentState.getRefreshCoinSuccess,
  );
  const getRefreshCoinFailed = useSelector(
    state => state.paymentState.getRefreshCoinFailed,
  );

  const userCheckLoading = useSelector(
    state => state.authState.userCheckLoading,
  );

  const userCheckSuccess = useSelector(
    state => state.authState.userCheckSuccess,
  );

  const userCheckFailed = useSelector(state => state.authState.userCheckFailed);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const data = {
    userEmail: userSave?.email,
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(userCheckAction(data));
    }, []),
  );

  useEffect(() => {
    if (userCheckSuccess) {
      setIsButtonVisible(
        userCheckSuccess?.result?.block === true ? true : false,
      );
      console.log(' ---bbbb ', isButtonVisible);
    }
    dispatch(resetUserCheckAction());
  }, [userCheckSuccess]);

  useEffect(() => {
    if (addNewPaymentSuccess) {
      dispatch(getRefreshCoinsAction(userSave.email));
      navigation.navigate('PaymentSuccessScreen', {amount: value});

      // ** update student wallet table
      let end = moment(new Date()).format();
      let start = moment(new Date()).add(-7, 'day').format();
      getTableDataHandler(start, end, 0);
    } else if (addNewPaymentFailed) {
      let msg = addNewPaymentFailed?.result?.toString();
      showToast({code: 500, result: msg});
    }

    dispatch(resetPaymentAction());
  }, [
    addNewPaymentSuccess,
    addNewPaymentFailed,
    getRefreshCoinSuccess,
    getRefreshCoinFailed,
  ]);

  function successCallback(data) {
    if (data?.Status === 'Success') {
      let res = {
        email: userSave.email,
        txnId: data.txnId,
        txnRef: data.txnRef,
        amount: Number(value),
      };

      dispatch(addNewPaymentAction(res));
    } else {
      let res = {
        email: userSave.email,
        txnId: data.txnId,
        txnRef: data.txnRef,
        amount: Number(value),
      };
      //unsuccess payments save
      dispatch(addNewPaymentAction(res));
      showToast({code: 500, result: 'Transaction has been failed!'});
    }
  }

  function failureCallback(data) {
    if (data?.Status === 'Success') {
      successCallback(data);
    } else {
      let res = {
        email: userSave.email,
        txnId: data.txnId,
        txnRef: data.txnRef,
        amount: Number(value),
      };
      //unsuccess payments save
      dispatch(addNewPaymentAction(res));
      showToast({code: 500, result: 'Transaction has been failed!'});
    }
  }

  function upiHandler() {
    alert('Payment Gateway Not Set Up.!');
    // if (numbersOnly(value)) {
    //   // RNUpiPayment.initializePayment({
    //   //     vpa: '7396980695@upi',
    //   //     payeeName: 'MUKKA SWETHA',
    //   //     amount: value,
    //   //     transactionRef: new Date().getTime(),
    //   // }, successCallback, failureCallback);
    //   let data = {
    //     email: userSave.email,
    //     depositAmount: Number(value),
    //   };

    //   //  dispatch(addNewPaymentAction(data));
    // } else {
    //   alert('Invalid input detected. Please try again.');
    // }
  }

  const getTableDataHandler = (str, end, number) => {
    let data = {
      email: userSave?.email,
      startDate: str,
      endDate: end,
      pageNumber: number,
      pageSize: 5,
    };
    console.log('\nDATA: ', data);
    dispatch(studentWalletAction(data));
  };
  return (
    <View>
      <HeaderComponent navigation={navigation} isCurrency />

      <ScrollView>
        <Image source={IMAGES.whiteBackgroundIMG} style={styles.whiteBG} />

        <EmptyView style={{height: dimensions.heightLevel6}} />
        <View style={styles.container}>
          <Image source={IMAGES.onlinePaymentIMG} style={styles.mainImg} />

          {/* pay buttons */}
          <EmptyView style={{height: dimensions.heightLevel2}} />

          {/*<TouchableOpacity style={styles.buttonContainer} onPress={() => upiHandler(1)}>*/}
          {/*    <Image source={IMAGES.upiPaymentIMG} style={styles.gPayImg}/>*/}
          {/*</TouchableOpacity>*/}

          <View style={{width: '100%'}}>
            <TextInput
              label="Deposit amount (INR)" // Student full name
              mode="outlined"
              theme={styles.textInputOutlineStyle}
              style={{
                fontStyle: 'italic',
                fontFamily: fontFamilies.InterRegular,
              }}
              onChangeText={text => {
                setValue(text);
              }}
              keyboardType="number-pad"
              value={value}
              // defaultValue={mobileOtp}
            />

            <EmptyView style={{height: dimensions.heightLevel2}} />

            {isButtonVisible ? (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    textColor: 'red',
                  }}>
                  <Text style={{color: 'red'}}>Your Account is Blocked.!</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    textColor: 'red',
                  }}>
                  <Text style={{color: 'red'}}>
                    Please Contact Administrator.
                  </Text>
                </View>
              </View>
            ) : (
              <Button
                mode="contained"
                onPress={upiHandler}
                textColor={'white'}
                color={colors.primary}
                style={{
                  paddingVertical: 5,
                  backgroundColor:
                    value === '' ? colors.disabled : colors.primary,
                }}
                labelStyle={{
                  fontSize: fontSizes.fontXLarge,
                  fontFamily: fontFamilies.InterBold,
                }}
                loading={false}
                disabled={value === ''}>
                Deposit
              </Button>
            )}
          </View>

          <EmptyView style={{height: dimensions.heightLevel2}} />

          {/*<Image source={IMAGES.paymentCollectionIMG} style={styles.paymentCollection}/>*/}

          {/*<TouchableOpacity style={styles.buttonContainer}>*/}
          {/*  <Image source={IMAGES.googlepayIMG} style={styles.gPayImg}/>*/}
          {/*</TouchableOpacity>*/}

          {/*<EmptyView style={{ height: dimensions.heightLevel1 }} />*/}

          {/*<TouchableOpacity style={styles.buttonContainer}>*/}
          {/*  <Image source={IMAGES.phonepeIMG} style={styles.pPeImg}/>*/}
          {/*</TouchableOpacity>*/}

          {/*<EmptyView style={{ height: dimensions.heightLevel1 }} />*/}

          {/*<TouchableOpacity style={styles.buttonContainer}>*/}
          {/*  <Image source={IMAGES.paytmIMG} style={styles.pTmImg}/>*/}
          {/*</TouchableOpacity>*/}
          <Loader isLoading={addNewPaymentLoading} />
          <Loader isLoading={userCheckLoading} />
        </View>
      </ScrollView>
    </View>
  );
};

export default DepositTabScreen;

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
    width: dimensions.fullWidth,
    height: dimensions.fullHeight - 70,
    paddingHorizontal: dimensions.paddingLevel3 * 1.2,
    alignItems: 'center',
  },

  whiteBG: {
    width: dimensions.fullWidth,
    height: '100%',
    position: 'absolute',
    zIndex: -1,
  },

  mainImg: {
    width: dimensions.widthLevel1,
    height: dimensions.widthLevel7,
    resizeMode: 'cover',
    opacity: 1,
  },

  buttonContainer: {
    width: dimensions.widthLevel7,
    height: dimensions.heightLevel5 * 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#E5E6FA',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    ...getShadowsV2,
  },

  gPayImg: {
    width: dimensions.widthLevel10,
    height: dimensions.heightLevel4,
    resizeMode: 'cover',
  },

  pPeImg: {
    width: dimensions.widthLevel10,
    height: dimensions.heightLevel4,
    resizeMode: 'cover',
  },

  pTmImg: {
    width: dimensions.widthLevel10,
    height: dimensions.heightLevel4,
    resizeMode: 'cover',
  },

  paymentCollection: {
    width: dimensions.widthLevel4,
    resizeMode: 'cover',
  },
});
