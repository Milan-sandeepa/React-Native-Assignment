import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {StyleSheet, Text, View} from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';
import {dimensions} from '../configurations/constants';
import {
  getRefreshCoinsAction,
  merchantCoinTransferAction,
  merchantCoinTransferRejectAction,
} from '../redux/actions/paymentAction';
import {merchantCoinRequestActionTypes} from '../redux/types';
import {red200} from 'react-native-paper/lib/typescript/styles/colors';
import {showToast} from '../configurations/ToastConfig';

var isDisable = true;

const PaymentRequestPopUp = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [detail, setDetail] = useState({amount: 0, shopName: ''});
  const [paymentDetail, setPaymentDetail] = useState({
    title: '',
    message: '',
    status: true,
    button: true,
    btnClose: 'Cancle',
  });
  const userSave = useSelector(state => state.authState.userSave);

  const dispatch = useDispatch();

  const merchantCoinRequestLoading = useSelector(
    state => state.paymentState.merchantCoinRequestLoading,
  );
  const merchantCoinRequestSuccess = useSelector(
    state => state.paymentState.merchantCoinRequestSuccess,
  );
  const merchantCoinRequestFailed = useSelector(
    state => state.paymentState.merchantCoinRequestFailed,
  );

  const merchantCoinTransferLoading = useSelector(
    state => state.paymentState.merchantCoinTransferLoading,
  );

  const merchantCoinTransferSuccess = useSelector(
    state => state.paymentState.merchantCoinTransferSuccess,
  );

  const merchantCoinTransferFailed = useSelector(
    state => state.paymentState.merchantCoinTransferFailed,
  );

  const merchantCoinTransferRejectSuccess = useSelector(
    state => state.paymentState.merchantCoinTransferRejectSuccess,
  );

  useEffect(() => {
    if (merchantCoinRequestSuccess) {
      if (isDisable) {
        isDisable = false;

        setShowAlert(true);
        setDetail({
          amount: merchantCoinRequestSuccess.result.totalCoins,
          shopName:
            merchantCoinRequestSuccess.result.fkToUser.firstName +
            ' ' +
            merchantCoinRequestSuccess.result.fkToUser.lastName,
        });

        setPaymentDetail({
          ...paymentDetail,
          title: 'Payment Notification',
          message: 'Are You Pay?',
          status: true,
          button: true,
          btnClose: 'Cancle',
        });
      } else if (merchantCoinRequestFailed) {
        setShowAlert(false);
        setPaymentDetail({
          ...paymentDetail,
          title: 'Payment Failed',
          message: 'Please try Again later',
          status: false,
          button: false,
          btnClose: 'Close',
        });
      }
    }
  }, [merchantCoinRequestSuccess, merchantCoinRequestFailed]);

  const conformHandler = () => {
    const data = {
      userEmail: userSave?.email,
    };

    dispatch(merchantCoinTransferAction(data));

    // if (getRefreshCoinSuccess.result >= detail.amount) {

    // } else {
    //   let msg = `Sorry.Your balance is insufficient to complete this purchase.`;
    //   showToast({code: -1, result: msg});
    // }

    console.log('Submit button Pressed');
  };

  const cancleHandler = () => {
    const data = {
      userEmail: userSave?.email,
    };
    dispatch(merchantCoinTransferRejectAction(data));
    setShowAlert(false);
    console.log('Cancle button Pressed');
  };

  useEffect(() => {
    if (merchantCoinTransferRejectSuccess) {
      isDisable = true;
    }
  }, [merchantCoinTransferRejectSuccess]);

  useEffect(() => {
    if (merchantCoinTransferLoading) {
      setPaymentDetail({
        ...paymentDetail,
        message: 'Proccesing',
      });
    }

    if (merchantCoinTransferSuccess) {
      isDisable = true;
      setPaymentDetail({
        title: 'Payment Successfully',
        message: 'Done!',
        status: false,
        button: false,
        btnClose: 'Close',
      });
    }
    if (merchantCoinTransferFailed) {
      isDisable = true;
      setPaymentDetail({
        ...paymentDetail,
        title: 'Payment Failed',
        message: 'Please try Again later',
        status: false,
        button: false,
        btnClose: 'Close',
      });
    }
  }, [
    merchantCoinTransferLoading,
    merchantCoinTransferSuccess,
    merchantCoinTransferFailed,
  ]);

  return (
    <View style={styles.container}>
      <AwesomeAlert
        showProgress={paymentDetail.status}
        show={showAlert}
        title={paymentDetail.title}
        titleStyle={{color: 'red'}}
        message={'Rs.' + detail.amount}
        messageStyle={{fontSize: 30}}
        showCancelButton={true}
        cancelButtonStyle={{width: 70, backgroundColor: '#f54266'}}
        cancelButtonTextStyle={{textAlign: 'center'}}
        cancelText={paymentDetail.btnClose}
        onCancelPressed={cancleHandler}
        onConfirmPressed={conformHandler}
        showConfirmButton={paymentDetail.button}
        confirmText="Pay"
        confirmButtonStyle={{width: 70, backgroundColor: '#42f56f'}}
        confirmButtonTextStyle={{textAlign: 'center'}}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        customView={
          <View style={styles.customView}>
            <Text style={styles.titleText}>Merchant :</Text>
            <Text style={styles.merchantText}>{detail.shopName}</Text>
            <Text style={styles.conformText}>{paymentDetail.message}</Text>
          </View>
        }
      />
    </View>
  );
};

export default PaymentRequestPopUp;

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
    fontSize: 20,
    fontWeight: 'bold',
  },
  merchantText: {
    fontSize: 18,
  },
  conformText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
