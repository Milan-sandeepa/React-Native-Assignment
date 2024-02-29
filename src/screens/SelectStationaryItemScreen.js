import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
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
import {Avatar, Button, Card} from 'react-native-paper';
import SearchBar from '../components/SearchBar';
import {onBackPress} from '../utilitys/backButtonUtil';
import ItemCard from '../components/ItemCard';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {getAllItemAction} from '../redux/actions/storeAction';
import Loader from '../components/Loader';
import {showToast} from '../configurations/ToastConfig';
import {
  findShopAction,
  getAllAvailableItemAction,
  getAllAvailableStationaryItemAction,
} from '../redux/actions/shopAction';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BackHandler} from 'react-native';
import {
  resetCartAction,
  resetItemType,
  resetOrderType,
  setOrderType,
} from '../redux/actions/cartAction';
import AwesomeAlert from 'react-native-awesome-alerts';
import {baseUrl} from '../configurations/urlConfigurations';
import {
  resetUserCheckAction,
  userCheckAction,
} from '../redux/actions/authAction';
import {resetSelectFileAction} from '../redux/actions/fileUploadAction';

const SelectStationaryItemScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState(
    'Are you sure you want to go back? Your cart will be reset.',
  );

  // const selectedShopData = route.params.selectedShopData;

  // const {orderType} = route.params;

  const [itemData, setItemData] = useState([]);
  const isFocused = useIsFocused();

  const userSave = useSelector(state => state.authState.userSave);

  const getAllAvalableStationaryItemsLoading = useSelector(
    state => state.shopState.getAllAvalableStationaryItemsLoading,
  );
  const getAllAvalableStationaryItemsSuccess = useSelector(
    state => state.shopState.getAllAvalableStationaryItemsSuccess,
  );
  const getAllAvalableStationaryItemsFailed = useSelector(
    state => state.shopState.getAllAvalableStationaryItemsFailed,
  );

  const findShopSuccess = useSelector(state => state.shopState.findShopSuccess);

  const cartItemsCount = useSelector(state => state.cartState.cartItems.length);

  const userCheckSuccess = useSelector(
    state => state.authState.userCheckSuccess,
  );

  const cartItems = useSelector(state => state.cartState.cartItems);
  const selectFiles = useSelector(state => state.fileUploadState.selectFiles);

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
    email: findShopSuccess?.result?.fkUser?.email,
  };

  useEffect(() => {
    if (isFocused) {
      console.log('calling get All Available Stationary Items..');
      dispatch(getAllAvailableStationaryItemAction(data)); // Perform API call when screen is focused
      console.log(findShopSuccess?.result?.fkUser?.email);
    }
  }, [isFocused]);

  useEffect(() => {
    if (getAllAvalableStationaryItemsSuccess) {
      console.log('getAllAvalableItemsSuccess-------------');
      setItemData(getAllAvalableStationaryItemsSuccess?.result);
    } else if (getAllAvalableStationaryItemsFailed) {
    }
  }, [
    getAllAvalableStationaryItemsSuccess,
    getAllAvalableStationaryItemsFailed,
  ]);

  function goBackScreen(navigation) {
    // dispatch(resetCartAction());
    // dispatch(resetOrderType());
    // navigation.navigate('SelectTypeScreen');
    setShowAlert(true);
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // Handle custom back button behavior here, e.g., navigate to a specific screen.
        // Return true to prevent the default back button behavior (app exit).
        // dispatch(resetCartAction());
        // dispatch(resetOrderType());
        // navigation.navigate('SelectTypeScreen');
        setShowAlert(true);
        return true;
      },
    );

    return () => {
      // Remove the event listener when the component unmounts.
      backHandler.remove();
    };
  }, []);

  const viewCartHandler = () => {
    navigation.navigate('StationaryCartDetailsScreen');

    console.log('selectFiles----', selectFiles);
  };
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  useEffect(() => {
    const openTime = findShopSuccess?.result.openTime; // Replace with your backend datetime
    const closeTime = findShopSuccess?.result.closeTime; // Replace with your backend datetime
    const backendOpenTime = new Date(openTime);
    const backendCloseTime = new Date(closeTime);

    const formatted1 = backendOpenTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const formatted2 = backendCloseTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    setOpenTime(formatted1);
    setCloseTime(formatted2);
  }, [findShopSuccess]);

  const cancleHandler = () => {
    setShowAlert(false);
  };

  const conformHandler = () => {
    dispatch(resetCartAction());
    dispatch(resetOrderType());
    dispatch(resetItemType());
    dispatch(resetSelectFileAction());

    navigation.navigate('SelectTypeScreen');
  };
  return (
    <View>
      <HeaderComponent navigation={navigation} isCurrency />
      <ScrollView>
        <Image source={IMAGES.whiteBackgroundIMG} style={styles.whiteBG} />

        <EmptyView style={{height: dimensions.heightLevel5}} />

        <View style={styles.container}>
          <EmptyView style={{height: dimensions.heightLevel3}} />
          {/* <TouchableOpacity
          onPress={() => goBackScreen(navigation)}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-start',
          }}>
          <Image source={ICONS.backICN} style={{transform: [{scale: 0.8}]}} />
          <Text style={styles.dontHaveText}> Back</Text>
        </TouchableOpacity> */}

          <>
            <TouchableOpacity
              onPress={() => goBackScreen(navigation)}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'flex-start',
              }}>
              <Image
                source={ICONS.backICN}
                style={{transform: [{scale: 0.8}]}}
              />
              <Text style={styles.dontHaveText}> Back</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignSelf: 'flex-end',
                position: 'relative',
                marginTop: 8,
              }}>
              {isButtonVisible ? (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      textColor: 'red',
                    }}>
                    <Text style={{color: 'red'}}>
                      Your Account is Blocked.!
                    </Text>
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
                <TouchableOpacity
                  style={styles.cartButtoun}
                  onPress={viewCartHandler}>
                  <Text>
                    <Icon name="shopping-cart" size={30} color={colors.black} />
                  </Text>
                  {cartItemsCount > 0 && (
                    <View
                      style={{
                        position: 'absolute',
                        top: -8,
                        right: -12,
                        backgroundColor: 'red',
                        borderRadius: 10,
                        padding: 6,
                        marginTop: 3,
                      }}>
                      <Text style={{color: 'white'}}>{cartItemsCount}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              )}
            </View>
          </>

          <EmptyView style={{height: dimensions.heightLevel1}} />
          {/* <View style={styles.name}>
          <Text style={styles.nameText}>Hey {userSave.firstName}</Text>
          <Text>Let's get your order</Text>
        </View> */}
          <View
            style={{
              flexDirection: 'row',
              width: dimensions.fullWidth,
              justifyContent: 'space-between',

              marginRight: 40,
            }}>
            <View style={styles.name}>
              <Text style={styles.nameText}>Hey {userSave.firstName}</Text>
              <Text>Select Your Items.!</Text>
            </View>
            <View>
              <Text style={{marginTop: 10, marginLeft: 30}}>
                {openTime} - {closeTime}
              </Text>
              <Text style={{marginTop: 2}}>Open Time - Close Time</Text>
            </View>
          </View>
          <View style={styles.search}>
            <SearchBar />
          </View>
          <EmptyView style={{height: dimensions.heightLevel1}} />

          <ScrollView style={{width: dimensions.fullWidth}}>
            <View style={styles.itemList}>
              {itemData && itemData.length > 0 ? ( // Check if itemData is not null and has items
                itemData.map(item => (
                  <ItemCard
                    key={item.id}
                    itemId={item.id}
                    itemName={item.itemName}
                    itemDescription={item.description}
                    itemPrice={item.price}
                    itemImageUrl={item.itemImageUrl}
                    availability={item.itemStatus}
                    itemType={item.itemType}
                    docUploadStatus={item.docUploadStatus}
                  />
                ))
              ) : (
                <View style={styles.emptyView}>
                  <Text
                    style={{
                      fontSize: fontSizes.fontMedium,
                      color: colors.black,
                    }}>
                    No Items Available this Shop.!
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>

          <AwesomeAlert
            show={showAlert}
            title={'Notification'}
            titleStyle={{color: 'red'}}
            message={message}
            messageStyle={{
              fontSize: 24,
              color: colors.black,
              textAlign: 'center',
            }}
            showCancelButton={true}
            cancelButtonStyle={{width: 70, backgroundColor: '#f54266'}}
            cancelButtonTextStyle={{textAlign: 'center'}}
            onCancelPressed={cancleHandler}
            onConfirmPressed={conformHandler}
            showConfirmButton={true}
            confirmText="Yes"
            confirmButtonStyle={{width: 70, backgroundColor: '#42f56f'}}
            confirmButtonTextStyle={{textAlign: 'center'}}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            customView={
              <View style={styles.customView}>
                {/* <Text style={styles.titleText}>Are You Sure?</Text> */}
                {/* <Text style={styles.merchantText}>{'detail.shopName'}</Text> */}
              </View>
            }
          />

          <EmptyView style={{height: dimensions.heightLevel2}} />
        </View>
      </ScrollView>
      <Loader isLoading={getAllAvalableStationaryItemsLoading} />
    </View>
  );
};

export default SelectStationaryItemScreen;

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
  cardTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardMain: {
    padding: 20,
    paddingLeft: 10,
  },
  cardMainText: {
    fontFamily: fontFamilies.InterSemiBold,
    fontSize: fontSizes.fontLarge,
  },
  secondTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondTitlePrice: {
    marginBottom: 10,
    fontFamily: fontFamilies.InterSemiBold,
    fontSize: fontSizes.fontLarge,
  },
  search: {
    margin: 10,
  },
  name: {
    // alignItems: 'flex-start',
    // alignSelf: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginLeft: 40,
  },
  nameText: {
    fontFamily: fontFamilies.InterSemiBold,
    fontSize: fontSizes.fontLarge,
    paddingTop: 5,
  },
  caraselImage: {
    width: 108,
    height: 130,
  },
  caraselImageView: {
    padding: 5,
    backgroundColor: colors.primary,
    marginLeft: 5,
    borderRadius: 5,
  },
  emptyView: {
    width: dimensions.widthLevel2,
    backgroundColor: colors.white,
    height: dimensions.heightLevel9,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  cartButtoun: {
    position: 'absolute',
    zIndex: 2,
    padding: 10,
    alignSelf: 'flex-end',
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
  itemList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 18,
  },
});
