import React, {useEffect, useState} from 'react';
import {
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
  getShadowsV2,
} from '../configurations/constants';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {showToast} from '../configurations/ToastConfig';
import Loader from '../components/Loader';
import QRCode from 'react-native-qrcode-svg';
import AwesomeAlert from 'react-native-awesome-alerts';
import {tr} from 'date-fns/locale';
import {useFocusEffect} from '@react-navigation/native';
import {
  findOrderDetailsAction,
  findOrderPaymentRequestUserAction,
  resetFindOrderPaymentRequestUserAction,
  resetGetOrderPaymentRequestUserAction,
  resetOrderPaymentChargeAction,
  resetOrderPaymentRequestAcceptAction,
  resetOrderPaymentRequestCancelAction,
  resetfindOrderDetailsAction,
} from '../redux/actions/orderAction';
import OrderPaymentPopUp from '../components/OrderPaymentPopUp';
import {useIsFocused} from '@react-navigation/native';
import {BackHandler} from 'react-native';
import {
  resetUserCheckAction,
  userCheckAction,
} from '../redux/actions/authAction';

const OrderDetailScreen = ({navigation, route}) => {
  const userSave = useSelector(state => state.authState.userSave);
  const dispatch = useDispatch();
  const id = route?.params;
  const [showAlert, setShowAlert] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [itemData, setItemData] = useState('');
  const [load, setLoad] = useState(false);

  const findShopSuccess = useSelector(state => state.shopState.findShopSuccess);

  const findOrderPaymentRequestSuccess = useSelector(
    state => state.orderState.findOrderPaymentRequestSuccess,
  );

  const findOrderDetailsLoading = useSelector(
    state => state.orderState.findOrderDetailsLoading,
  );

  const findOrderDetailsSuccess = useSelector(
    state => state.orderState.findOrderDetailsSuccess,
  );

  const findOrderDetailsFailed = useSelector(
    state => state.orderState.findOrderDetailsFailed,
  );

  const orderPaymentRequestCancelSuccess = useSelector(
    state => state.orderState.orderPaymentRequestCancelSuccess,
  );

  const findOrderPaymentRequestUpdateLoading = useSelector(
    state => state.orderState.findOrderPaymentRequestUpdateLoading,
  );

  const userCheckLoading = useSelector(
    state => state.authState.userCheckLoading,
  );

  const userCheckSuccess = useSelector(
    state => state.authState.userCheckSuccess,
  );

  const userCheckFailed = useSelector(state => state.authState.userCheckFailed);

  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const dataCheck = {
    userEmail: userSave?.email,
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(userCheckAction(dataCheck));
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

  const data = {
    email: userSave?.email,
  };

  const orderId = {
    id: id,
  };
  useFocusEffect(
    React.useCallback(() => {
      // //Requesting Start part
      if (findOrderPaymentRequestSuccess) {
        setShowAlert(false);
        setShowPopUp(true);
        //  navigation.navigate('ActiveOrdersScreens');
        // dispatch(resetFindOrderPaymentRequestUserAction());
      }

      if (orderPaymentRequestCancelSuccess) {
        showToast({code: 200, result: 'Payment Cancel Success.!'});
        // dispatch(resetFindOrderPaymentRequestUserAction());

        dispatch(resetOrderPaymentRequestCancelAction());
      }

      const proccess = setInterval(() => {
        console.log('Request Sent ');

        dispatch(findOrderPaymentRequestUserAction(data));

        // clearInterval(proccess);
      }, 2000);

      //Screen move Requesting Stop part
      return () => {
        console.log('Request Stopped');
        clearInterval(proccess);
      };
    }, [findOrderPaymentRequestSuccess, orderPaymentRequestCancelSuccess]),
  );

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      dispatch(findOrderDetailsAction(orderId)); // Perform API call when screen is focused
    }
  }, [isFocused]);

  useEffect(() => {
    if (findOrderDetailsSuccess) {
      setItemData(findOrderDetailsSuccess?.result);
    } else if (findOrderDetailsFailed) {
    }
    // dispatch(resetfindOrderDetailsAction());
  }, [findOrderDetailsSuccess, findOrderDetailsFailed]);

  // useEffect(() => {
  //   if (findOrderPaymentRequestSuccess) {
  //     setShowAlert(false);
  //     setShowPopUp(true);
  //   }
  // }, [findOrderPaymentRequestSuccess]);

  const QRCodeGenerator = () => {
    const qrData = id.toString();

    return (
      <View>
        <QRCode value={qrData} size={200} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <Text>Scan your QR Code</Text>
        </View>
      </View>
    );
  };

  const qrCodeHandler = () => {
    setShowAlert(true);
    // console.log(itemData);
  };

  const conformHandler = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // Handle custom back button behavior here, e.g., navigate to a specific screen.
        // Return true to prevent the default back button behavior (app exit).
        dispatch(resetfindOrderDetailsAction());
        navigation.navigate('ActiveOrdersScreens');
        return true;
      },
    );

    return () => {
      // Remove the event listener when the component unmounts.
      backHandler.remove();
    };
  }, []);

  function goBackScreen(navigation) {
    dispatch(resetfindOrderDetailsAction());
    navigation.navigate('ActiveOrdersScreens');
  }
  return (
    <View>
      <HeaderComponent navigation={navigation} isCurrency />

      {/* <ScrollView> */}
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
          <ScrollView style={{height: dimensions.heightLevel10 + 100}}>
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

            <AwesomeAlert
              show={showAlert}
              closeOnTouchOutside={false}
              showConfirmButton
              confirmText="Done"
              confirmButtonStyle={{width: 70, backgroundColor: '#42f56f'}}
              confirmButtonTextStyle={{textAlign: 'center'}}
              onConfirmPressed={conformHandler}
              customView={
                <View style={styles.customView}>
                  <QRCodeGenerator />
                </View>
              }
            />
          </ScrollView>
          <EmptyView style={{height: dimensions.heightLevel3}} />
        </View>
        {/* <TouchableOpacity style={styles.couponButton}>
          <Text style={{color: colors.white}}>Apply Coupons</Text>
        </TouchableOpacity> */}
        <EmptyView style={{height: dimensions.heightLevel6}} />
        <View style={styles.totalMain}>
          <View>
            <Text style={styles.text}>Order Id</Text>
            <Text style={styles.text}>Item Total</Text>
            <Text style={styles.text}>Tax</Text>
            <Text style={styles.text}>Total</Text>
          </View>
          <View>
            <Text style={styles.text}>{orderId.id}</Text>
            <Text style={styles.text}>INR {itemData.chargeAmount}</Text>
            <Text style={styles.text}>--</Text>
            <Text style={styles.text}>INR {itemData.chargeAmount}</Text>
          </View>
        </View>
        <EmptyView style={{height: dimensions.heightLevel2}} />

        {isButtonVisible ? (
          <View>
            <EmptyView style={{height: dimensions.heightLevel1}} />
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
              <Text style={{color: 'red'}}>Please Contact Administrator.</Text>
            </View>
          </View>
        ) : (
          <TouchableOpacity style={styles.couponButton} onPress={qrCodeHandler}>
            <Text style={{color: colors.white}}>Genarate QR Code</Text>
          </TouchableOpacity>
        )}

        <EmptyView style={{height: dimensions.heightLevel2}} />
        {/* <Loader isLoading={placeOrderLoading} /> */}
      </View>
      {/* </ScrollView> */}

      <Loader isLoading={findOrderDetailsLoading} />
      <Loader isLoading={findOrderPaymentRequestUpdateLoading} />
      <Loader isLoading={userCheckLoading} />
      <OrderPaymentPopUp />
    </View>
  );
};

export default OrderDetailScreen;

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
    justifyContent: 'space-around',
  },
  text: {
    fontFamily: fontFamilies.InterBold,
    fontSize: fontSizes.fontMediumPlus,
  },
  customView: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
