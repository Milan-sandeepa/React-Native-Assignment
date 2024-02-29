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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  deleteItemDataAction,
  findItemDataAction,
  resetDeleteItemAction,
  resetFindItemAction,
  resetStoreAction,
  resetUpdateItemAction,
  storeSaveItemAction,
  updateItemDataAction,
} from '../redux/actions/storeAction';
import {Button} from 'react-native-paper';
import Loader from '../components/Loader';
import {showToast} from '../configurations/ToastConfig';
import {getAllItemAction} from '../redux/actions/storeAction';
import {baseUrl} from '../configurations/urlConfigurations';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AwesomeAlert from 'react-native-awesome-alerts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  resetUserCheckAction,
  userCheckAction,
} from '../redux/actions/authAction';

const StoreAddItemScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const itemData = route?.params;
  const [selectImage, setSelectImage] = useState();
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedUpdateImageFile, setSelectedUpdateImageFile] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState('');
  const [updateCurrentValue, setUpdateCurrentValue] = useState('');
  const [state, setState] = useState({
    itemId: '',
    itemName: '',
    itemDescription: '',
    itemPrice: '',
    itemImage: '',
    availability: '',
  });

  const [updateState, setUpdateState] = useState({
    itemId: 0,
    itemName: '',
    itemDescription: '',
    itemPrice: '',
    itemImage: '',
    availability: '',
    itemImageUrl: '',
  });

  const userSave = useSelector(state => state.authState.userSave);

  const saveItemLoading = useSelector(
    state => state.storeState.saveItemLoading,
  );
  const saveItemSuccess = useSelector(
    state => state.storeState.saveItemSuccess,
  );
  const saveItemFailed = useSelector(state => state.storeState.saveItemFailed);

  const findItemDataLoading = useSelector(
    state => state.storeState.findItemDataLoading,
  );
  const findItemDataSuccess = useSelector(
    state => state.storeState.findItemDataSuccess,
  );
  const findItemDataFailed = useSelector(
    state => state.storeState.findItemDataFailed,
  );

  //-----
  const updateItemLoading = useSelector(
    state => state.storeState.updateItemLoading,
  );
  const updateItemSuccess = useSelector(
    state => state.storeState.updateItemSuccess,
  );
  const updateItemFailed = useSelector(
    state => state.storeState.updateItemFailed,
  );

  //-----
  const deleteItemLoading = useSelector(
    state => state.storeState.deleteItemLoading,
  );
  const deleteItemSuccess = useSelector(
    state => state.storeState.deleteItemSuccess,
  );
  const deleteItemFailed = useSelector(
    state => state.storeState.deleteItemFailed,
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

  useEffect(() => {
    if (saveItemSuccess) {
      showToast({code: 200, result: 'Item Saved.!'});
      setSelectImage('');
      setUpdateState('');
      setState('');
      setSelectedImageFile(null);
      setSelectedUpdateImageFile(null);
      setCurrentValue('');

      navigation.navigate('StoreScreens');
    } else if (saveItemFailed) {
      let msg = `sorry, Item is Not Saved,Try Again`;
      showToast({code: -1, result: msg});
    }

    dispatch(resetStoreAction());
  }, [saveItemSuccess, saveItemFailed]);

  const findItem = {
    id: itemData?.id,
    email: userSave?.email,
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused & (itemData != null)) {
      dispatch(findItemDataAction(findItem)); // Perform API call when screen is focused
    }
  }, [isFocused, itemData]);

  useEffect(() => {
    if (findItemDataSuccess && itemData != null) {
      // setUpdateState(findItemDataSuccess?.result);
      setUpdateCurrentValue(itemData?.availability);
      setUpdateState({
        ...updateState,
        availability: itemData?.availability,
        itemId: findItemDataSuccess?.result?.id,
        itemName: findItemDataSuccess?.result?.itemName,
        itemDescription: findItemDataSuccess?.result?.description,
        itemPrice: findItemDataSuccess?.result?.price,
        itemImageUrl: findItemDataSuccess?.result?.itemImageUrl,
      });
      // console.log(findItemDataSuccess?.result?.itemImageUrl);
    } else if (findItemDataFailed) {
      let msg = `sorry,Try Again`;
      showToast({code: -1, result: msg});
    }
  }, [itemData, findItemDataSuccess, findItemDataFailed]);

  const item = [
    {label: 'Yes', value: 'YES'},
    {label: 'No', value: 'NO'},
  ];

  useEffect(() => {
    if (updateItemSuccess) {
      showToast({code: 200, result: 'Item Updated.!'});
      setSelectImage('');
      setUpdateState('');
      setState('');
      setSelectedImageFile(null);
      setSelectedUpdateImageFile(null);
      setCurrentValue('');
      navigation.navigate('StoreScreens');
    } else if (updateItemFailed) {
      let msg = `sorry, Item is Not Saved,Try Again`;
      showToast({code: -1, result: msg});
    }
    dispatch(resetUpdateItemAction());
  }, [updateItemSuccess, updateItemFailed]);

  useEffect(() => {
    if (deleteItemSuccess) {
      showToast({code: 200, result: 'Item Deleted.!'});
      setSelectImage('');
      setUpdateState('');
      setState('');
      setSelectedImageFile(null);
      setSelectedUpdateImageFile(null);
      setCurrentValue('');
      navigation.navigate('StoreScreen');
    } else if (deleteItemFailed) {
      let msg = `sorry, Item is Not Deleted,Try Again`;
      showToast({code: -1, result: msg});
    }
    dispatch(resetDeleteItemAction());
  }, [deleteItemSuccess, deleteItemFailed]);

  const press = () => {
    let options = {
      storageOptions: {
        path: 'image',
        mediaType: 'photo',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        // User cancelled the picker
        console.log('User cancelled image picker');
      } else if (response.error) {
        // An error occurred
        console.log('Image picker error:', response.error);
      } else {
        // Image selected successfully
        const selectedImage = response.assets[0];

        // Update your state with the selected image's URI
        setSelectImage(selectedImage.uri);
        setSelectedUpdateImageFile(selectedImage.uri);

        // Create a file object to potentially upload the image
        const selectedImageFile = {
          uri: selectedImage.uri,
          type: selectedImage.type,
          name: selectedImage.fileName,
        };

        // Update state with the selected image file
        setSelectedImageFile(selectedImageFile);
      }
    });
  };

  const formData = new FormData();

  const itemSaveHandler = () => {
    formData.append('eventImage', selectedImageFile);

    formData.append('itemName', state?.itemName);
    formData.append('email', userSave.email);
    formData.append('description', state?.itemDescription);
    formData.append('price', state?.itemPrice);
    formData.append('status', state?.availability);

    dispatch(storeSaveItemAction(formData));
  };

  const itemUpdateHandler = () => {
    console.log(updateState?.itemImageUrl);
    formData.append('id', updateState?.itemId);
    formData.append('eventImage', selectedImageFile);
    formData.append('itemName', updateState?.itemName);
    formData.append('email', userSave.email);
    formData.append('description', updateState?.itemDescription);
    formData.append('price', updateState?.itemPrice);
    formData.append('status', updateState?.availability);
    formData.append('itemImageUrl', updateState?.itemImageUrl);
    dispatch(updateItemDataAction(formData));
  };

  const selectItemDeleteHandler = () => {
    setShowAlert(true);
  };

  const cancleHandler = () => {
    setShowAlert(false);
  };

  const conformHandler = () => {
    dispatch(deleteItemDataAction(findItem));
    setShowAlert(false);
    console.log('Submit button Pressed');
  };

  function goBackScreen(navigation) {
    setSelectImage('');
    setUpdateState('');
    setState('');
    setSelectedImageFile(null);
    setSelectedUpdateImageFile(null);
    setCurrentValue('');
    navigation.navigate('StoreScreen');
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // Handle custom back button behavior here, e.g., navigate to a specific screen.
        // Return true to prevent the default back button behavior (app exit).

        navigation.navigate('StoreScreen');
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
      <HeaderComponent navigation={navigation} />
      {/* <ScrollView> */}
      <KeyboardAwareScrollView>
        <Image source={IMAGES.whiteBackgroundIMG} style={styles.whiteBG} />

        <EmptyView style={{height: dimensions.heightLevel5}} />

        <View style={styles.container}>
          <EmptyView style={{height: dimensions.heightLevel2}} />

          {itemData ? (
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
                        justifyContent: 'center',
                        textColor: 'red',
                      }}>
                      <Text style={{color: 'red'}}>
                        Your Account is Blocked.!
                      </Text>
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
                  <Text
                    onPress={selectItemDeleteHandler}
                    style={styles.deleteButtoun}>
                    <Icon name="trash" size={30} color={colors.black} />
                  </Text>
                )}

                {/* <Text
                  onPress={selectItemDeleteHandler}
                  style={styles.deleteButtoun}>
                  <Icon name="trash" size={30} color={colors.black} />
                </Text> */}
              </View>
            </>
          ) : (
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
          )}

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
              {itemData ? (
                <Text>Update Your Item Details.</Text>
              ) : (
                <Text>Enter Your Item Details.</Text>
              )}
            </View>
          </View>

          <EmptyView style={{height: dimensions.heightLevel2}} />

          {itemData ? (
            <View>
              {selectImage ? (
                <Image source={{uri: selectImage}} style={styles.foodImage} />
              ) : (
                <Image
                  source={{uri: baseUrl + itemData.itemImageUrl}}
                  style={styles.foodImage}
                />
              )}
            </View>
          ) : (
            <View>
              {selectImage ? (
                <Image source={{uri: selectImage}} style={styles.foodImage} />
              ) : (
                // <Image source={{uri: selectImage}} style={styles.foodImage} />
                <Image
                  source={require('../assets/images/add-image.png')}
                  style={styles.foodImage}
                />
              )}
            </View>
          )}

          <EmptyView style={{height: dimensions.heightLevel2}} />

          {/* <TouchableOpacity onPress={press} style={styles.input}>
          <Text>Choose Image</Text>
        </TouchableOpacity> */}
          <Button
            mode="contained"
            textColor={'white'}
            color={colors.primary}
            style={{paddingVertical: 0, width: dimensions.widthLevel12}}
            labelStyle={{
              fontSize: fontSizes.fontSmallPlus,
              fontFamily: fontFamilies.InterBold,
            }}
            onPress={press}

            // loading={true}
          >
            {'  ' + 'Select' + '    '}
          </Button>

          <EmptyView style={{height: dimensions.heightLevel2}} />
          {/* Item Name */}
          <Text style={styles.label}>Item Name</Text>
          {itemData ? (
            <TextInput
              placeholder="Enter Item Name"
              style={styles.input}
              onChangeText={text => {
                setUpdateState({...updateState, itemName: text});
              }}
              value={updateState?.itemName}
            />
          ) : (
            <TextInput
              placeholder="Enter Item Name"
              style={styles.input}
              onChangeText={text => {
                setState({...state, itemName: text});
              }}
              value={state?.itemName}
            />
          )}

          <EmptyView style={{height: dimensions.heightLevel2}} />
          {/* Item Description */}
          <Text style={styles.label}>Item Description</Text>
          {itemData ? (
            <TextInput
              placeholder="Enter Item Description"
              multiline
              numberOfLines={4}
              maxLength={120}
              style={styles.input}
              onChangeText={text => {
                setUpdateState({...updateState, itemDescription: text});
              }}
              value={updateState?.itemDescription}
            />
          ) : (
            <TextInput
              placeholder="Enter Item Description"
              editable
              multiline
              numberOfLines={4}
              maxLength={120}
              style={styles.input}
              onChangeText={text => {
                setState({...state, itemDescription: text});
              }}
              value={state?.itemDescription}
            />
          )}

          <EmptyView style={{height: dimensions.heightLevel2}} />
          {/* Item Price */}
          <Text style={styles.label}>Item Price (INR)</Text>
          {itemData ? (
            <TextInput
              placeholder="Enter Item Price INR"
              keyboardType="number-pad"
              style={styles.input}
              onChangeText={text => {
                setUpdateState({...updateState, itemPrice: text});
              }}
              value={String(updateState?.itemPrice)}
            />
          ) : (
            <TextInput
              placeholder="Enter Item Price INR"
              keyboardType="number-pad"
              style={styles.input}
              onChangeText={text => {
                setState({...state, itemPrice: text});
              }}
              value={state?.itemPrice}
            />
          )}

          <EmptyView style={{height: dimensions.heightLevel2}} />
          {/* Availability */}
          <Text style={styles.label}>Availability</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignSelf: 'center',
              marginLeft: 25,
            }}>
            {itemData ? (
              <DropDownPicker
                items={item}
                open={isOpen}
                setOpen={() => setIsOpen(!isOpen)}
                value={updateCurrentValue}
                setValue={val => {
                  setUpdateCurrentValue(val);
                }}
                onSelectItem={item => {
                  setUpdateState({...updateState, availability: item.value});
                }}
                placeholder="Select Availability"
                maxHeight={330}
                autoScroll
                dropDownDirection={null}
                placeholderStyle={{
                  fontSize: fontSizes.fontMedium,
                  color: colors.black,
                }}
                style={{
                  fontSize: 12,
                  width: '92%',
                }}></DropDownPicker>
            ) : (
              <DropDownPicker
                items={item}
                open={isOpen}
                setOpen={() => setIsOpen(!isOpen)}
                value={currentValue}
                setValue={val => {
                  setCurrentValue(val);
                }}
                onSelectItem={item => {
                  setState({...state, availability: item.value});
                }}
                placeholder="Select Availability"
                maxHeight={330}
                autoScroll
                dropDownDirection={null}
                placeholderStyle={{
                  fontSize: fontSizes.fontMedium,
                  color: colors.black,
                }}
                style={{
                  fontSize: 12,
                  width: '92%',
                }}

                // arrowIconStyle={{borderColor: colors.white}}
              />
            )}
          </View>
          <EmptyView style={{height: dimensions.heightLevel2}} />

          {itemData ? (
            <Button
              mode="contained"
              textColor={'white'}
              color={colors.primary}
              style={{paddingVertical: 5, width: dimensions.widthLevel5}}
              labelStyle={{
                fontSize: fontSizes.fontXLarge,
                fontFamily: fontFamilies.InterBold,
              }}
              onPress={itemUpdateHandler}
              disabled={isButtonVisible ? true : ''}

              // loading={true}
            >
              {'          ' + 'Update' + '           '}
            </Button>
          ) : (
            <Button
              mode="contained"
              textColor={'white'}
              color={colors.primary}
              style={{paddingVertical: 5, width: dimensions.widthLevel5}}
              labelStyle={{
                fontSize: fontSizes.fontXLarge,
                fontFamily: fontFamilies.InterBold,
              }}
              onPress={itemSaveHandler}

              // loading={true}
            >
              {'          ' + 'Save' + '           '}
            </Button>
          )}

          <EmptyView style={{height: dimensions.heightLevel6}} />
        </View>

        <AwesomeAlert
          showProgress
          show={showAlert}
          title={'Delete Notification'}
          titleStyle={{color: 'red'}}
          message={updateState.itemName}
          messageStyle={{fontSize: 30}}
          showCancelButton={true}
          cancelButtonStyle={{width: 70, backgroundColor: '#f54266'}}
          cancelButtonTextStyle={{textAlign: 'center'}}
          onCancelPressed={cancleHandler}
          onConfirmPressed={conformHandler}
          showConfirmButton={true}
          confirmText="DELETE"
          confirmButtonStyle={{width: 70, backgroundColor: '#42f56f'}}
          confirmButtonTextStyle={{textAlign: 'center'}}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          customView={
            <View style={styles.customView}>
              <Text style={styles.titleText}>Are You Sure Delete ?</Text>
              {/* <Text style={styles.merchantText}>{'detail.shopName'}</Text> */}
            </View>
          }
        />

        {/* <Loader isLoading={saveItemLoading} /> */}

        {/* </ScrollView> */}
        <EmptyView style={{height: dimensions.heightLevel7}} />
      </KeyboardAwareScrollView>
      <Loader isLoading={saveItemLoading} />
      <Loader isLoading={findItemDataLoading} />
      <Loader isLoading={updateItemLoading} />
      <Loader isLoading={deleteItemLoading} />
    </View>
  );
};

export default StoreAddItemScreen;

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

  label: {
    fontFamily: fontFamilies.InterSemiBold,
    fontSize: fontSizes.fontLarge, // Adjust the font size as needed
    color: colors.black,
    marginBottom: 5, // Adjust the margin as needed
    alignSelf: 'flex-start',
    marginLeft: 25,
  },
  input: {
    color: colors.black,
    backgroundColor: colors.white,
    padding: 3,
    borderRadius: 5,
    width: dimensions.widthLevel5,
  },
  foodImage: {
    marginTop: 5,
    width: dimensions.widthLevel12 - 30,
    height: dimensions.widthLevel12 - 30,
  },
  deleteButtoun: {
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
  merchantText: {
    fontSize: 18,
  },
  conformText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
