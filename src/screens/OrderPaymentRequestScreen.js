import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {IMAGES, ICONS} from '../assets/images';
import EmptyView from '../components/EmptyView';
import HeaderComponent from '../components/HeaderComponent';
import {
  colors,
  dimensions,
  fontFamilies,
  fontSizes,
} from '../configurations/constants';
import {useDispatch, useSelector} from 'react-redux';

import {showToast} from '../configurations/ToastConfig';
import Loader from '../components/Loader';
import {
  FindOrderPaymentRequestStatusMerchantAction,
  orderCompleteStatusUpdateAction,
  orderPaymentChargeAction,
  orderPaymentRequestCancelNotifyAction,
  orderPaymentRequestMerchantAction,
  orderStatusUpdateAction,
  qrStatusUpdateAction,
  resetFindOrderPaymentRequestStatusMerchantAction,
  resetOrderPaymentChargeAction,
  resetOrderPaymentRequestAcceptAction,
  resetOrderPaymentRequestCancelNotifyAction,
  resetOrderPaymentRequestMerchantAction,
  resetfindOrderDetailsAction,
} from '../redux/actions/orderAction';

import {useFocusEffect} from '@react-navigation/native';

const OrderPaymentRequestScreen = ({navigation, route}) => {
  const userSave = useSelector(state => state.authState.userSave);
  const dispatch = useDispatch();
  const itemData = route?.params;
  const [load, setLoad] = useState(false);

  const data = {
    merchantEmail: itemData.merchantEmail,
    userEmail: itemData.user.email,
    chargeAmount: itemData.chargeAmount,
  };

  const payment = {
    merchantEmail: itemData.merchantEmail,
    userEmail: itemData.user.email,
    id: itemData.id,
    chargeAmount: itemData.chargeAmount,
  };

  const orderPaymentRequestSuccess = useSelector(
    state => state.orderState.orderPaymentRequestSuccess,
  );

  const findOrderPaymentRequestStatusSuccess = useSelector(
    state => state.orderState.findOrderPaymentRequestStatusSuccess,
  );

  const orderPaymentChargeSuccess = useSelector(
    state => state.orderState.orderPaymentChargeSuccess,
  );

  const orderPaymentChargeFailed = useSelector(
    state => state.orderState.orderPaymentChargeFailed,
  );

  const orderPaymentRequestCancelNotifySuccess = useSelector(
    state => state.orderState.orderPaymentRequestCancelNotifySuccess,
  );

  const orderStatusUpdateSuccess = useSelector(
    state => state.orderState.orderStatusUpdateSuccess,
  );

  const [requestData, setRequestData] = useState({
    email: itemData.user.email,
    id: -1,
  });

  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (orderPaymentRequestSuccess) {
  //       // requestData.id = orderPaymentRequestSuccess?.result?.id;
  //       setRequestData({
  //         ...requestData,
  //         id: orderPaymentRequestSuccess?.result?.id,
  //       });
  //       console.log('requ id ' + requestData.id);
  //       dispatch(resetOrderPaymentRequestMerchantAction());
  //     }

  //     if (findOrderPaymentRequestStatusSuccess) {
  //       showToast({code: 200, result: 'User Accepted Payment.!'});
  //       dispatch(orderPaymentChargeAction(payment));
  //       setRequestData({
  //         ...requestData,
  //         id: -1,
  //       });

  //       dispatch(resetFindOrderPaymentRequestStatusMerchantAction());
  //     }

  //     if (orderPaymentRequestCancelNotifySuccess) {
  //       showToast({code: 500, result: 'User Rejected Payment.!'});
  //       setLoad(false);
  //       setRequestData({
  //         ...requestData,
  //         id: -1,
  //       });
  //       dispatch(resetOrderPaymentRequestCancelNotifyAction());
  //     }

  //     // //Requesting Start part
  //     const proccess = setInterval(() => {
  //       console.log('Request Sent Merchant ' + requestData.id);
  //       console.log(requestData);
  //       dispatch(FindOrderPaymentRequestStatusMerchantAction(requestData));

  //       dispatch(orderPaymentRequestCancelNotifyAction(requestData));
  //     }, 2000);

  //     //Screen move Requesting Stop part
  //     return () => {
  //       console.log('Request Stopped');
  //       clearInterval(proccess);
  //     };
  //   }, [
  //     orderPaymentRequestSuccess,
  //     findOrderPaymentRequestStatusSuccess,
  //     orderPaymentChargeSuccess,
  //     orderPaymentRequestCancelNotifySuccess,
  //   ]),
  // );

  // useEffect(() => {
  //   if (orderPaymentChargeSuccess) {
  //     showToast({code: 200, result: 'Payment Success'});
  //     setLoad(false);
  //     // navigation.navigate('MerchantCongrateScreen', amount: itemData.chargeAmount);
  //     navigation.navigate('OrderPaymentCongrateScreen', {
  //       amount: itemData.chargeAmount,
  //     });
  //   } else if (orderPaymentChargeFailed) {
  //     showToast({code: 500, result: 'Payment failed'});
  //   }
  //   dispatch(resetOrderPaymentChargeAction());
  // }, [orderPaymentChargeSuccess, orderPaymentChargeFailed]);

  function orderCompleteHandler() {
    // dispatch(orderPaymentRequestMerchantAction(data));
    setLoad(true);
    const data = {
      email: userSave?.email,
      id: itemData.id,
      status: 'complete',
    };
    dispatch(orderStatusUpdateAction(data));
  }

  function orderAcceptHandler() {
    setLoad(true);
    const data = {
      email: userSave?.email,
      id: itemData.id,
      status: 'accept',
    };
    dispatch(orderStatusUpdateAction(data));
  }

  function orderProcessingHandler() {
    setLoad(true);
    const data = {
      email: userSave?.email,
      id: itemData.id,
      status: 'processing',
    };
    dispatch(orderStatusUpdateAction(data));
  }

  useEffect(() => {
    if (orderStatusUpdateSuccess) {
      // showToast({code: 200, result: 'Payment Success.!'});

      setLoad(false);
      // dispatch(qrStatusUpdateAction(data));
      // navigation.navigate('QRScanViewOrderScreen');
      navigation.navigate('StoreActiveOrdersScreens');
    }
  }, [orderStatusUpdateSuccess]);

  function goBackScreen(navigation) {
    navigation.navigate('StoreActiveOrdersScreens');
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // Handle custom back button behavior here, e.g., navigate to a specific screen.
        // Return true to prevent the default back button behavior (app exit).
        navigation.navigate('StoreActiveOrdersScreen');
        return true;
      },
    );

    return () => {
      // Remove the event listener when the component unmounts.
      backHandler.remove();
    };
  }, []);

  return (
    <View>
      <HeaderComponent navigation={navigation} isCurrency />

      <ScrollView>
        <Image source={IMAGES.whiteBackgroundIMG} style={styles.whiteBG} />

        <EmptyView style={{height: dimensions.heightLevel6}} />

        <View style={styles.container}>
          <EmptyView style={{height: dimensions.heightLevel1}} />
          <TouchableOpacity
            onPress={() => goBackScreen(navigation)}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'flex-start',
            }}>
            <Image source={ICONS.backICN} style={{transform: [{scale: 0.8}]}} />
            <Text style={styles.dontHaveText}> Back</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.mainText}>Order Details</Text>
          </View>
          <EmptyView style={{height: dimensions.heightLevel1}} />
          <View style={{width: '100%', alignItems: 'center'}}>
            <ScrollView
              style={{
                height: dimensions.heightLevel10 + 20,
              }}>
              <View>
                {itemData.cartItems.map((item, index) => (
                  <View key={index} style={styles.card}>
                    <View style={styles.cardMain}>
                      <View>
                        <Text style={styles.cardTitle} numberOfLines={1}>
                          {item.itemName}
                        </Text>
                      </View>

                      <View>
                        <Text style={styles.cardText}>
                          {' '}
                          INR: {item.itemPrice}
                        </Text>
                      </View>

                      <Text style={styles.cardText}> x</Text>

                      <Text style={styles.cardText}> {item.quantity}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
            <EmptyView style={{height: dimensions.heightLevel1}} />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={styles.noteText}>Note : </Text>
            <Text style={styles.noteSubText}>
              This order type {itemData.orderType}
            </Text>
          </View>
          <EmptyView style={{height: dimensions.heightLevel2}} />
          <View style={styles.customerMain}>
            <View>
              <Text style={styles.customerText}>Name :</Text>
              <Text style={styles.customerText}>Email :</Text>
              <Text style={styles.customerText}>Order ID :</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={styles.customerText}>
                {itemData.user.firstName + ' ' + itemData.user.lastName}
              </Text>
              <Text style={styles.customerText}>{itemData.user.email}</Text>
              <Text style={styles.customerText}>{itemData.id}</Text>
            </View>
          </View>
          <EmptyView style={{height: dimensions.heightLevel1}} />
          <View style={styles.totalMain}>
            <View>
              <Text style={styles.text}>Item Total :</Text>
              <Text style={styles.text}>Tax :</Text>
              <Text style={styles.text}>Total :</Text>
            </View>
            <View>
              <Text style={styles.text}>INR {itemData.chargeAmount}</Text>
              <Text style={styles.text}>--</Text>
              <Text style={styles.text}>INR {itemData.chargeAmount}</Text>
            </View>
          </View>
          <EmptyView style={{height: dimensions.heightLevel2}} />
          {/* <TouchableOpacity style={styles.couponButton} onPress={qrCodeHandler}> */}
          <TouchableOpacity
            style={styles.couponButton}
            onPress={orderAcceptHandler}>
            <Text style={{color: colors.white}}>Accept order</Text>
          </TouchableOpacity>
          <EmptyView style={{height: dimensions.heightLevel1}} />
          <TouchableOpacity
            style={styles.couponButton}
            onPress={orderProcessingHandler}>
            <Text style={{color: colors.white}}>Processing Order</Text>
          </TouchableOpacity>
          <EmptyView style={{height: dimensions.heightLevel1}} />
          <TouchableOpacity
            style={styles.couponButton}
            onPress={orderCompleteHandler}>
            <Text style={{color: colors.white}}>Complete Order</Text>
          </TouchableOpacity>
          <EmptyView style={{height: dimensions.heightLevel2}} />
          {/* <Loader isLoading={orderPaymentRequestLoading} /> */}
          {/* <Loader isLoading={findOrderPaymentRequestStatusLoading} /> */}
          {/* <Loader isLoading={orderPaymentChargeLoading} /> */}
          <Loader isLoading={load} />
        </View>
        <EmptyView style={{height: dimensions.heightLevel3}} />
      </ScrollView>
    </View>
  );
};

export default OrderPaymentRequestScreen;

const styles = StyleSheet.create({
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

  mainText: {
    width: '45%',
    fontFamily: fontFamilies.InterBold,
    fontSize: fontSizes.fontXXXLarge,
    color: colors.primary,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: dimensions.widthLevel3,
    height: dimensions.heightLevel4,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginTop: 4,
  },
  itemImg: {
    width: dimensions.widthLevel12 - 70,
    height: dimensions.heightLevel6,
    margin: 10,
    borderRadius: 10,
  },
  cardMain: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    justifyContent: 'center',
  },
  // cardMain1: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  // },
  cardTitle: {
    fontFamily: fontFamilies.InterBold,
    fontSize: fontSizes.fontLarge,
    color: colors.black,
    marginTop: 5,
    marginRight: 10,
    width: dimensions.heightLevel10,
    overflow: 'hidden',
  },
  // cardMain2: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  // },
  cardText: {
    fontFamily: fontFamilies.InterBold,
    fontSize: fontSizes.fontMedium,
    color: colors.black,
    marginTop: 10,
    paddingRight: 5,
  },
  couponButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: dimensions.widthLevel3,
    height: dimensions.heightLevel3,
    backgroundColor: colors.secondary,
    borderRadius: 5,
  },
  totalMain: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 6,
    paddingRight: 6,
  },
  customerMain: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 6,
    paddingRight: 6,
  },
  text: {
    fontFamily: fontFamilies.InterBold,
    fontSize: fontSizes.fontMediumPlus,
  },

  customerText: {
    fontFamily: fontFamilies.InterBold,
    fontSize: fontSizes.fontMediumPlus,
  },
  noteText: {
    fontFamily: fontFamilies.InterBold,
    fontSize: fontSizes.fontMediumPlus,
    color: 'red',
  },
  noteSubText: {
    fontFamily: fontFamilies.InterBold,
    fontSize: fontSizes.fontMediumPlus,
    color: 'red',
  },
  customView: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
