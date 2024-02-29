import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
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
import DropDownPicker from 'react-native-dropdown-picker';
import {onBackPress} from '../utilitys/backButtonUtil';
import {showToast} from '../configurations/ToastConfig';
import {useIsFocused} from '@react-navigation/native';
import {
  findShopAction,
  getAllShopAction,
  resetFindShopAction,
} from '../redux/actions/shopAction';
import {getRefreshCoinsAction} from '../redux/actions/paymentAction';
import {resetPlaceOrderAction} from '../redux/actions/cartAction';
import Loader from '../components/Loader';

const SelectStoreScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState();

  const [shopData, setShopData] = useState([]);

  const userSave = useSelector(state => state.authState.userSave);

  const getAllShopLoading = useSelector(
    state => state.shopState.getAllShopLoading,
  );
  const getAllShopSuccess = useSelector(
    state => state.shopState.getAllShopSuccess,
  );
  const getAllShopFailed = useSelector(
    state => state.shopState.getAllShopFailed,
  );

  const findShopLoading = useSelector(state => state.shopState.findShopLoading);
  const findShopSuccess = useSelector(state => state.shopState.findShopSuccess);
  const findShopFailed = useSelector(state => state.shopState.findShopFailed);

  // useEffect(() => {
  //   onBackPress(handleBackPress);
  // }, []);

  // function handleBackPress() {
  //   navigation.navigate('HomeTab');
  //   return true;
  // }

  useEffect(() => {
    if (isFocused) {
      dispatch(resetFindShopAction());
      dispatch(getAllShopAction(userSave?.email)); // Perform API call when screen is focused
    }
  }, [isFocused]);

  useEffect(() => {
    dispatch(getRefreshCoinsAction(userSave.email));
  }, []);

  useEffect(() => {
    if (getAllShopSuccess) {
      setShopData(getAllShopSuccess?.result);
    } else if (getAllShopFailed) {
    }
  }, [getAllShopSuccess, getAllShopFailed]);

  useEffect(() => {
    if (findShopSuccess) {
      navigation.navigate('SelectTypeScreen');
    } else if (findShopFailed) {
      let msg = `Sorry,Try Again`;
      showToast({code: -1, result: msg});
    }
  }, [findShopSuccess, findShopFailed]);

  const selectHandler = selectedShop => {
    const selectedShopData = shopData.find(
      item => item.id === selectedShop.value,
    );

    dispatch(findShopAction(selectedShopData?.fkUser?.email));

    // navigation.navigate('SelectTypeScreen');
  };

  function goBackScreen(navigation) {
    setCurrentValue(null);
    navigation.navigate('HomeTab');
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // Handle custom back button behavior here, e.g., navigate to a specific screen.
        // Return true to prevent the default back button behavior (app exit).
        setCurrentValue(null);
        navigation.navigate('HomeTab');
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

      {/* <ScrollView> */}
      <Image source={IMAGES.whiteBackgroundIMG} style={styles.whiteBG} />

      <EmptyView style={{height: dimensions.heightLevel6}} />
      <View style={styles.container}>
        <EmptyView style={{height: dimensions.heightLevel2}} />

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

        <EmptyView style={{height: dimensions.heightLevel10}} />

        <View style={{width: '100%'}}>
          <EmptyView style={{height: dimensions.heightLevel7}} />
          <DropDownPicker
            items={shopData.map(item => ({label: item.name, value: item.id}))}
            open={isOpen}
            setOpen={() => setIsOpen(!isOpen)}
            value={currentValue}
            setValue={value => setCurrentValue(value)}
            // setValue={selectHandler}
            onSelectItem={selectHandler}
            placeholder="Select the Store"
            maxHeight={330}
            autoScroll
            placeholderStyle={{
              fontSize: fontSizes.fontXLarge,
              color: colors.white,
            }}
            style={{
              backgroundColor: colors.primary,
              fontSize: 18,
            }}
            theme="DARK"
            searchable={true}
            listMode="SCROLLVIEW"
          />

          <EmptyView style={{height: dimensions.heightLevel2}} />
        </View>

        <EmptyView style={{height: dimensions.heightLevel2}} />
        <Loader isLoading={getAllShopLoading} />
        <Loader isLoading={findShopLoading} />
      </View>

      {/* </ScrollView> */}
    </View>
  );
};

export default SelectStoreScreen;

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
});
