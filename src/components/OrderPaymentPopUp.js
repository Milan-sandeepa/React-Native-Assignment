import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {StyleSheet, Text, View} from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';
import {colors, dimensions, fontSizes} from '../configurations/constants';
import {
  getRefreshCoinsAction,
  merchantCoinTransferAction,
  merchantCoinTransferRejectAction,
} from '../redux/actions/paymentAction';
import {merchantCoinRequestActionTypes} from '../redux/types';
import {red200} from 'react-native-paper/lib/typescript/styles/colors';
import {showToast} from '../configurations/ToastConfig';
import {
  orderPaymentRequestAcceptAction,
  orderPaymentRequestCancelAction,
  orderPaymentRequestUpdateAction,
  resetFindOrderPaymentRequestUserAction,
  resetGetOrderPaymentRequestUserAction,
  resetOrderPaymentRequestAcceptAction,
} from '../redux/actions/orderAction';
import Loader from './Loader';
import {useNavigation} from '@react-navigation/native';

var isDisable = true;

const OrderPaymentPopUp = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [detail, setDetail] = useState({amount: 0, shopName: '', id: ''});
  const dispatch = useDispatch();
  const userSave = useSelector(state => state.authState.userSave);
  const navigation = useNavigation();

  const findOrderPaymentRequestSuccess = useSelector(
    state => state.orderState.findOrderPaymentRequestSuccess,
  );

  const findOrderPaymentRequestFailed = useSelector(
    state => state.orderState.findOrderPaymentRequestFailed,
  );

  const findOrderPaymentRequestUpdateSuccess = useSelector(
    state => state.orderState.findOrderPaymentRequestUpdateSuccess,
  );

  useEffect(() => {
    if (findOrderPaymentRequestSuccess) {
      if (isDisable) {
        isDisable = false;
        setShowAlert(true);
        setDetail({
          id: findOrderPaymentRequestSuccess?.result?.id,
          amount: findOrderPaymentRequestSuccess?.result?.totalCoins,
          shopName:
            findOrderPaymentRequestSuccess?.result?.fkToUser?.firstName +
            ' ' +
            findOrderPaymentRequestSuccess?.result?.fkToUser?.lastName,
        });
      }
      //   isDisable = true;
      dispatch(resetFindOrderPaymentRequestUserAction());
    }
    // dispatch(resetFindOrderPaymentRequestUserAction());
  }, [findOrderPaymentRequestSuccess]);

  useEffect(() => {
    if (findOrderPaymentRequestUpdateSuccess) {
      // showToast({code: 200, result: 'Payment Success.!'});

      dispatch(resetOrderPaymentRequestAcceptAction());
      // navigation.navigate('ActiveOrdersScreens');
    }
  }, [findOrderPaymentRequestUpdateSuccess]);

  const conformHandler = () => {
    const data = {
      email: userSave?.email,
      id: detail.id,
      status: 'Yes',
    };
    isDisable = true;
    setShowAlert(false);
    dispatch(orderPaymentRequestAcceptAction(data));

    // navigation.navigate('HomeTab');
    console.log('Submit button Pressed');
  };

  const cancleHandler = () => {
    const data = {
      email: userSave?.email,
      id: detail.id,
    };
    isDisable = true;
    setShowAlert(false);

    dispatch(orderPaymentRequestCancelAction(data));

    console.log('Cancle button Pressed');
  };

  return (
    <View style={styles.container}>
      <AwesomeAlert
        show={showAlert}
        title={'Payment Notification'}
        titleStyle={{color: 'red', fontSize: 25}}
        message={'Rs.' + detail.amount}
        messageStyle={{fontSize: 30, color: colors.black}}
        showCancelButton={true}
        cancelButtonStyle={{width: 70, backgroundColor: '#f54266'}}
        cancelButtonTextStyle={{textAlign: 'center'}}
        cancelText={'Cancle'}
        onCancelPressed={cancleHandler}
        onConfirmPressed={conformHandler}
        showConfirmButton={true}
        confirmText="Confirm"
        confirmButtonStyle={{width: 70, backgroundColor: '#42f56f'}}
        confirmButtonTextStyle={{textAlign: 'center'}}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        customView={
          <View style={styles.customView}>
            <Text style={styles.titleText}>Payment Requested :</Text>
            <Text style={styles.merchantText}>{detail.shopName}</Text>
            <Text style={styles.conformText}>Are You Pay?</Text>
          </View>
        }
      />
    </View>
  );
};

export default OrderPaymentPopUp;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    top: 70,
    paddingHorizontal: dimensions.paddingLevel3,
  },
  customView: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  merchantText: {
    fontSize: 16,
  },
  conformText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
