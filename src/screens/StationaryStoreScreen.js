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
  Button,
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
import {Avatar, Card} from 'react-native-paper';
import SearchBar from '../components/SearchBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getAllItemAction} from '../redux/actions/storeAction';
import Loader from '../components/Loader';
import {showToast} from '../configurations/ToastConfig';
import Item from '../components/Item';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {
  resetUserCheckAction,
  userCheckAction,
} from '../redux/actions/authAction';
import {getAllStationaryItemAction} from '../redux/actions/stationaryAction';
import StationaryItem from '../components/StationaryItem';

const StationaryStoreScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [itemData, setItemData] = useState([]);
  const isFocused = useIsFocused();

  const userSave = useSelector(state => state.authState.userSave);

  const getAllItemLoading = useSelector(
    state => state.stationaryState.getAllItemLoading,
  );
  const getAllItemSuccess = useSelector(
    state => state.stationaryState.getAllItemSuccess,
  );
  const getAllItemFailed = useSelector(
    state => state.stationaryState.getAllItemFailed,
  );

  const userCheckSuccess = useSelector(
    state => state.authState.userCheckSuccess,
  );
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const data = {
    email: userSave?.email,
  };

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

  useEffect(() => {
    if (isFocused) {
      dispatch(getAllStationaryItemAction(data)); // Perform API call when screen is focused
    }
  }, [isFocused]);

  useEffect(() => {
    if (getAllItemSuccess) {
      setItemData(getAllItemSuccess?.result);
    } else if (getAllItemFailed) {
    }
  }, [getAllItemSuccess, getAllItemFailed]);

  function goBackScreen(navigation) {
    navigation.navigate('SelectItemTypeScreens');
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.navigate('SelectItemTypeScreens');
        return true;
      },
    );

    return () => {
      // Remove the event listener when the component unmounts.
      backHandler.remove();
    };
  }, []);

  const addItemHandler = () => {
    navigation.navigate('StationaryAddItemScreen');
  };

  return (
    <View>
      <HeaderComponent navigation={navigation} />

      <Image source={IMAGES.whiteBackgroundIMG} style={styles.whiteBG} />

      <EmptyView style={{height: dimensions.heightLevel5}} />

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
        <EmptyView style={{height: dimensions.heightLevel1}} />
        <View
          style={{
            flexDirection: 'row',
            width: dimensions.fullWidth,
            justifyContent: 'space-between',

            marginRight: 40,
          }}>
          <View style={styles.name}>
            <Text style={styles.nameText}>Hey {userSave.firstName}</Text>
            <Text>List Your Stationary Items Here.!</Text>
          </View>
          <View style={{marginTop: 10}}>
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
                {/* <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    textColor: 'red',
                  }}>
                  <Text style={{color: 'red'}}>
                    Please Contact Administrator.
                  </Text>
                </View> */}
              </View>
            ) : (
              <Button
                title="Add Item"
                color="#841584"
                onPress={addItemHandler}
              />
            )}

            {/* <Button title="Add Item" color="#841584" onPress={addItemHandler} /> */}
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
                <StationaryItem
                  key={item.id}
                  itemId={item.id}
                  itemName={item.itemName}
                  itemDescription={item.description}
                  itemPrice={item.price}
                  availability={item.itemStatus}
                  documentUpload={item.docUploadStatus}
                />
              ))
            ) : (
              <View style={styles.emptyView}>
                <Text
                  style={{fontSize: fontSizes.fontMedium, color: colors.black}}>
                  No Available Listing.!
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

        <EmptyView style={{height: dimensions.heightLevel2}} />
      </View>
      {/* </ScrollView> */}
      <Loader isLoading={getAllItemLoading} />
    </View>
  );
};

export default StationaryStoreScreen;

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
    width: dimensions.widthLevel12,
    height: dimensions.heightLevel10,
  },
  caraselImageView: {
    padding: 5,
    backgroundColor: colors.primary,
    marginLeft: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  itemList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 18,
  },
  deleteButtoun: {
    position: 'absolute',
    zIndex: 2,
    padding: 10,
    alignSelf: 'flex-end',
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
    marginLeft: 5,
  },
});
