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
import {Input} from '@rneui/base';
import InputSpinner from 'react-native-input-spinner';
import {
  placeOrderRequestAction,
  removeFromCart,
  resetCartAction,
  resetPlaceOrderAction,
  updateCartItemAction,
  updateCartItemQuantity,
} from '../redux/actions/cartAction';
import {baseUrl} from '../configurations/urlConfigurations';
import {updateItemDataAction} from '../redux/actions/storeAction';
import {showToast} from '../configurations/ToastConfig';
import Loader from '../components/Loader';
import {BackHandler} from 'react-native';
import {getRefreshCoinsAction} from '../redux/actions/paymentAction';
import {fileUploadAction} from '../redux/actions/fileUploadAction';

const CartDetailsScreen = ({navigation}) => {
  const userSave = useSelector(state => state.authState.userSave);
  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cartState.cartItems);
  const orderType = useSelector(state => state.cartState.orderType);
  const itemType = useSelector(state => state.cartState.itemType);

  const findShopSuccess = useSelector(state => state.shopState.findShopSuccess);

  const [totalPrice, setTotalPrice] = useState(0);

  const placeOrderLoading = useSelector(
    state => state.cartState.placeOrderLoading,
  );
  const placeOrderSuccess = useSelector(
    state => state.cartState.placeOrderSuccess,
  );
  const placeOrderFailed = useSelector(
    state => state.cartState.placeOrderFailed,
  );

  console.log('order type------------', orderType);
  console.log('itemType------------', itemType);

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  useEffect(() => {
    if (placeOrderSuccess) {
      showToast({code: 200, result: 'Order successfuly.!'});
      dispatch(getRefreshCoinsAction(userSave.email));
      if (cartItems[0]?.itemType == 'FOOD_DRINK') {
        navigation.navigate('SelectItemScreen');
      } else if (cartItems[0]?.itemType == 'STATIONARY') {
        navigation.navigate('SelectStationaryItemScreen');
      }
      dispatch(resetCartAction());
    } else if (placeOrderFailed) {
      // let msg = `Sorry.Try Again`;
      let msg = `Sorry,Insufficient funds in your wallet.!`;
      showToast({code: -1, result: msg});
    }
    dispatch(resetPlaceOrderAction());
  }, [placeOrderFailed, placeOrderSuccess]);

  const calculateTotalPrice = () => {
    const newTotalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    setTotalPrice(newTotalPrice);
  };

  // const handleQuantityChange = (itemId, newQuantity) => {
  //   const updatedCartItems = cartItems.map(item =>
  //     item.id === itemId ? {...item, quantity: newQuantity} : item,
  //   );

  //   dispatch(updateCartItemAction(updatedCartItems));
  // };
  var itemTotal = 0;
  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === itemId
        ? {
            ...item,
            quantity: newQuantity,
            // Update the itemTotal based on the new quantity
            itemTotal: item.price * newQuantity,
          }
        : item,
    );

    dispatch(updateCartItemAction(updatedCartItems));
  };

  function goBackScreen(navigation) {
    if (itemType == 'FOOD_DRINK') {
      navigation.navigate('SelectItemScreen');
    } else if (itemType == 'STATIONARY') {
      navigation.navigate('SelectStationaryItemScreen');
    }
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // Handle custom back button behavior here, e.g., navigate to a specific screen.
        // Return true to prevent the default back button behavior (app exit).

        if (itemType == 'FOOD_DRINK') {
          navigation.navigate('SelectItemScreen');
        } else if (itemType == 'STATIONARY') {
          navigation.navigate('SelectStationaryItemScreen');
        }
        return true;
      },
    );

    return () => {
      // Remove the event listener when the component unmounts.
      backHandler.remove();
    };
  }, []);

  const removeFromCartHandler = item => {
    dispatch(removeFromCart(item));
  };

  const placeOrderHandler = () => {
    const orderData = {
      merchantEmail: findShopSuccess?.result?.fkUser?.email,
      user: userSave,
      chargeAmount: totalPrice,
      cartItems,
      orderType: orderType,
    };
    console.log(cartItems);
    dispatch(placeOrderRequestAction(orderData));
  };

  const fileUploadHandler = () => {
    dispatch(fileUploadAction());
  };

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
          <Text style={styles.mainText}>Cart Details</Text>
        </View>
        <EmptyView style={{height: dimensions.heightLevel1}} />
        <View style={{width: '100%', alignItems: 'center'}}>
          <ScrollView style={{height: dimensions.heightLevel10 + 100}}>
            {cartItems.length > 0 ? (
              <>
                {cartItems.map(item => (
                  <View style={styles.card} key={item.id}>
                    <Image
                      source={{
                        uri: baseUrl + item.itemImageUrl,
                      }}
                      style={styles.itemImg}
                    />
                    <View style={styles.cardMain}>
                      <View style={styles.cardMain1}>
                        <Text style={styles.cardTitle} numberOfLines={1}>
                          {item.itemName}
                        </Text>
                        <TouchableOpacity>
                          <Text
                            style={styles.closeButton}
                            onPress={() => removeFromCartHandler(item.id)}>
                            <Icon name="close" size={30} color="#900" />
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View style={styles.cardMain2}>
                        <Text
                          style={{
                            marginBottom: 5,
                            marginRight: 10,
                          }}>
                          <InputSpinner
                            max={10}
                            min={1}
                            step={1}
                            colorMax={'#f04048'}
                            colorMin={'#40c5f4'}
                            value={item.quantity}
                            // onChange={num => {
                            //   setNum();
                            //   console.log(num);
                            // }}
                            onChange={newQuantity =>
                              handleQuantityChange(item.id, newQuantity)
                            }
                            // buttonStyle={{
                            //   backgroundColor: '#f04048',
                            //   width: 40, // Adjust the width to a smaller value
                            //   height: 40, // Adjust the height to a smaller value
                            //   justifyContent: 'center',
                            //   alignItems: 'center',
                            //   padding: 0,
                            //   margin: 0,
                            // }}
                          />
                        </Text>
                        <Text style={styles.cardText}>
                          {item.price + ' x ' + item.quantity + ' = '} INR.
                          {itemTotal.length > 0
                            ? item.itemTotal
                            : item.price * item.quantity}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </>
            ) : (
              <View style={styles.emptyCard}>
                <Text
                  style={{
                    fontFamily: fontFamilies.InterBold,
                    fontSize: fontSizes.fontXLarge,
                  }}>
                  Empty cart
                </Text>
              </View>
            )}
          </ScrollView>
          <EmptyView style={{height: dimensions.heightLevel3}} />
        </View>
        <TouchableOpacity style={styles.couponButton}>
          <Text style={{color: colors.white}}>Apply Coupons</Text>
        </TouchableOpacity>
        <EmptyView style={{height: dimensions.heightLevel2}} />
        <View style={styles.totalMain}>
          <View>
            <Text style={styles.text}>Item Total</Text>
            <Text style={styles.text}>Tax</Text>
            <Text style={styles.text}>Total</Text>
          </View>
          <View>
            <Text style={styles.text}>INR {totalPrice}</Text>
            <Text style={styles.text}>--</Text>
            <Text style={styles.text}>INR {totalPrice}</Text>
          </View>
        </View>
        <EmptyView style={{height: dimensions.heightLevel2}} />
        <TouchableOpacity
          style={styles.couponButton}
          onPress={placeOrderHandler}>
          <Text style={{color: colors.white}}>Place Order</Text>
        </TouchableOpacity>
        <EmptyView style={{height: dimensions.heightLevel2}} />
        <Loader isLoading={placeOrderLoading} />
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default CartDetailsScreen;

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

  mainImg: {
    width: dimensions.widthLevel1,
    height: dimensions.widthLevel7,
    resizeMode: 'cover',
    opacity: 1,
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
    height: dimensions.heightLevel7,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginTop: 2,
    marginBottom: 2,
  },
  emptyCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center', // Center vertically
    width: dimensions.widthLevel3,
    height: dimensions.heightLevel7,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginTop: 2,
    marginBottom: 2,
    alignSelf: 'center',
  },
  itemImg: {
    width: dimensions.widthLevel12 - 120,
    height: dimensions.heightLevel6 - 40,
    marginTop: 30,
    borderRadius: 10,
  },
  cardMain: {
    marginTop: 5,
    justifyContent: 'center',
  },
  cardMain1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cardTitle: {
    fontFamily: fontFamilies.InterBold,
    fontSize: fontSizes.fontLarge,
    color: colors.black,
    marginTop: 5,
    width: dimensions.heightLevel10,
    overflow: 'hidden',
  },
  cardMain2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardText: {
    fontFamily: fontFamilies.InterBold,
    fontSize: fontSizes.fontMedium,
    color: colors.black,
    marginTop: 15,
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
  closeButton: {
    marginLeft: 15,
    marginBottom: 10,
  },
});
