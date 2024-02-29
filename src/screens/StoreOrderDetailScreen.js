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
  findOrderDetailsAction,
  findOrderStoreDetailAction,
  orderPaymentChargeAction,
  orderPaymentRequestCancelNotifyAction,
  orderPaymentRequestMerchantAction,
  orderStatusUpdateAction,
  resetFindOrderPaymentRequestStatusMerchantAction,
  resetFindOrderStoreDetailAction,
  resetOrderPaymentChargeAction,
  resetOrderPaymentRequestCancelNotifyAction,
  resetOrderPaymentRequestMerchantAction,
  resetfindOrderDetailsAction,
} from '../redux/actions/orderAction';

import {useFocusEffect, useIsFocused} from '@react-navigation/native';

const StoreOrderDetailScreen = ({navigation, route}) => {
  const userSave = useSelector(state => state.authState.userSave);
  const dispatch = useDispatch();
  const id = route?.params;
  const isFocused = useIsFocused();
  const [itemData, setItemData] = useState('');

  const findOrderStoreDetailLoading = useSelector(
    state => state.orderState.findOrderStoreDetailLoading,
  );

  const findOrderDetailsSuccess = useSelector(
    state => state.orderState.findOrderStoreDetailSuccess,
  );

  const findOrderDetailsFailed = useSelector(
    state => state.orderState.findOrderStoreDetailFailed,
  );

  const orderStatusUpdateSuccess = useSelector(
    state => state.orderState.orderStatusUpdateSuccess,
  );

  const orderId = {
    id: id,
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(findOrderStoreDetailAction(orderId));
      // dispatch(findOrderDetailsAction(orderId));
      console.log('loader' + findOrderStoreDetailLoading);
      return () => {};
    }, []),
  );

  useEffect(() => {}, []);

  useEffect(() => {
    if (findOrderDetailsSuccess) {
      setItemData(findOrderDetailsSuccess?.result);
    } else if (findOrderDetailsFailed) {
    }

    dispatch(resetFindOrderStoreDetailAction());
  }, [findOrderDetailsSuccess, findOrderDetailsFailed]);

  function orderCompleteHandler() {
    // dispatch(orderPaymentRequestMerchantAction(data));

    const data = {
      email: userSave?.email,
      id: itemData.id,
      status: 'complete',
    };
    dispatch(orderStatusUpdateAction(data));
  }

  function orderAcceptHandler() {
    const data = {
      email: userSave?.email,
      id: itemData.id,
      status: 'accept',
    };
    dispatch(orderStatusUpdateAction(data));
  }

  function orderProcessingHandler() {
    const data = {
      email: userSave?.email,
      id: itemData.id,
      status: 'processing',
    };
    dispatch(orderStatusUpdateAction(data));
  }

  useEffect(() => {
    if (orderStatusUpdateSuccess) {
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
        navigation.navigate('StoreActiveOrdersScreens');
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
                height: dimensions.heightLevel10 + 100,
              }}>
              <View>
                {itemData?.cartItems?.map((item, index) => (
                  <View key={index} style={styles.card}>
                    <View style={styles.cardMain}>
                      <View>
                        <Text style={styles.cardTitle} numberOfLines={1}>
                          {item?.itemName}
                        </Text>
                      </View>

                      <View>
                        <Text style={styles.cardText}>
                          {' '}
                          INR: {item?.itemPrice}
                        </Text>
                      </View>

                      <Text style={styles.cardText}> x</Text>

                      <Text style={styles.cardText}> {item?.quantity}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
            <EmptyView style={{height: dimensions.heightLevel3}} />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={styles.noteText}>Note : </Text>
            <Text style={styles.noteSubText}>
              This order type {itemData?.orderType}
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
                {itemData?.user?.firstName + ' ' + itemData?.user?.lastName}
              </Text>
              <Text style={styles.customerText}>{itemData?.user?.email}</Text>
              <Text style={styles.customerText}>{itemData?.id}</Text>
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
              <Text style={styles.text}>INR {itemData?.chargeAmount}</Text>
              <Text style={styles.text}>--</Text>
              <Text style={styles.text}>INR {itemData?.chargeAmount}</Text>
            </View>
          </View>
          <EmptyView style={{height: dimensions.heightLevel2}} />

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

          <EmptyView style={{height: dimensions.heightLevel4}} />

          <Loader isLoading={false} />
        </View>
        <EmptyView style={{height: dimensions.heightLevel6}} />
      </ScrollView>
    </View>
  );
};

export default StoreOrderDetailScreen;

const styles = StyleSheet.create({
  container: {
    width: dimensions.fullWidth,
    height: dimensions.fullHeight,
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
