import React, {useCallback, useEffect, useState} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  FlatList,
  SafeAreaView,
  Alert,
  TextInput,
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
import InputSpinner from 'react-native-input-spinner';
import {baseUrl} from '../configurations/urlConfigurations';
import {addToCartAction} from '../redux/actions/shopAction';
import {
  addToCart,
  removeFromCart,
  resetCartAction,
} from '../redux/actions/cartAction';
import {useFocusEffect} from '@react-navigation/native';
import {
  resetUserCheckAction,
  userCheckAction,
} from '../redux/actions/authAction';
import Loader from '../components/Loader';
import DocumentPicker, {types} from 'react-native-document-picker';
import {selectFileAction} from '../redux/actions/fileUploadAction';

const AddToCartScreen = ({navigation, route}) => {
  const userSave = useSelector(state => state.authState.userSave);
  const [quantity, setQuantity] = useState(1);
  const [fileQty, setFileQty] = useState(0);

  const dispatch = useDispatch();

  const selectedItemData = route?.params;
  const [amount, setAmount] = useState(selectedItemData.price);
  const [amountWithFile, setAmountWithFile] = useState(0);
  console.log('selectedItemData', selectedItemData);
  const cartItems = useSelector(state => state.fileUploadState.selectFiles);
  const itemType = useSelector(state => state.cartState.itemType);

  const [selectedDocuments, setSelectedDocuments] = useState([]);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [types.pdf],
        allowMultiSelection: true,
      });
      // setSelectedDocuments(response);
      // console.log('selected documents---', response);

      // Map over the selected documents and add a quantity property to each object
      const documentsWithQuantity = response.map(document => ({
        ...document,
        quantity: 0, // Initialize quantity to 0
      }));

      setSelectedDocuments(documentsWithQuantity);
      console.log('selected documents---', documentsWithQuantity);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const userCheckLoading = useSelector(
    state => state.authState.userCheckLoading,
  );

  const userCheckSuccess = useSelector(
    state => state.authState.userCheckSuccess,
  );

  const userCheckFailed = useSelector(state => state.authState.userCheckFailed);

  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const data = {
    userEmail: userSave?.email,
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(userCheckAction(data));
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

  function goBackScreen(navigation) {
    if (selectedItemData.itemType == 'FOOD_DRINK') {
      navigation.navigate('SelectItemScreen');
    } else if (selectedItemData.itemType == 'STATIONARY') {
      navigation.navigate('SelectStationaryItemScreen');
    }
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // Handle custom back button behavior here, e.g., navigate to a specific screen.
        // Return true to prevent the default back button behavior (app exit).

        if (selectedItemData.itemType == 'FOOD_DRINK') {
          navigation.navigate('SelectItemScreen');
        } else if (selectedItemData.itemType == 'STATIONARY') {
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

  const addToCartHandler = () => {
    if (selectedItemData.docUploadStatus == 'YES') {
      console.log('Doc', selectedDocuments);
      dispatch(selectFileAction(selectedDocuments));
      dispatch(addToCart(selectedItemData, fileQty));
    } else {
      dispatch(addToCart(selectedItemData, quantity));
      setQuantity(1);

      console.log('No files added');
    }

    if (selectedItemData.itemType == 'FOOD_DRINK') {
      navigation.navigate('SelectItemScreen');
    } else if (selectedItemData.itemType == 'STATIONARY') {
      navigation.navigate('SelectStationaryItemScreen');
    }
  };

  let totalQuantity = 0;

  const handleQuantityChange = (index, newQuantity) => {
    console.log(index, newQuantity);
    const updatedDocuments = [...selectedDocuments];

    // Update the quantity of the document at the specified index
    updatedDocuments[index].quantity = newQuantity;

    // Set the updated array in the state
    setSelectedDocuments(updatedDocuments);
    console.log('selectedDocuments', selectedDocuments);

    // Calculate total quantity

    updatedDocuments.forEach(document => {
      const quantity =
        typeof document.quantity === 'string'
          ? parseInt(document.quantity)
          : document.quantity;
      totalQuantity += quantity;
    });
    console.log('Total Quantity:', totalQuantity);
    setAmountWithFile(selectedItemData.price * totalQuantity);
    setFileQty(totalQuantity);
  };

  // Function to truncate file name if it exceeds a certain length
  const truncateFileName = (fileName, maxLength = 25) => {
    if (fileName.length <= maxLength) {
      return fileName;
    } else {
      return fileName.substring(0, maxLength - 3) + '...'; // truncate and add ellipsis
    }
  };

  return (
    <View>
      <HeaderComponent navigation={navigation} isCurrency />

      <ScrollView>
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
          <EmptyView style={{height: dimensions.heightLevel2}} />
          <View>
            <Text style={styles.mainText}>Add to Cart</Text>
          </View>
          <EmptyView style={{height: dimensions.heightLevel1}} />
          <View style={{width: '100%'}}>
            <EmptyView style={{height: dimensions.heightLevel1}} />

            {selectedItemData.itemType == 'STATIONARY' ? (
              <View style={styles.circleMain}>
                <View style={styles.squre}>
                  <Text numberOfLines={2} style={styles.squreTitle}>
                    {selectedItemData.itemName}
                  </Text>
                  <Text numberOfLines={3} style={styles.circleDesc}>
                    {selectedItemData.description}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.circleMain}>
                <View style={styles.circle}>
                  <Text numberOfLines={2} style={styles.circleTitle}>
                    {selectedItemData.itemName}
                  </Text>
                  <Text numberOfLines={3} style={styles.circleDesc}>
                    {selectedItemData.description}
                  </Text>
                  <Image
                    source={{uri: baseUrl + selectedItemData.itemImageUrl}}
                    style={styles.foodImage}
                  />
                </View>
              </View>
            )}

            <EmptyView style={{height: dimensions.heightLevel5}} />
            <View style={styles.count}>
              <Text style={styles.unitPrice}>Unit Price INR :</Text>
              <Text style={styles.unitPrice}>
                {' ' + selectedItemData.price}
              </Text>
            </View>
            <EmptyView style={{height: dimensions.heightLevel2}} />
            <View style={styles.count}>
              {/* <Text style={styles.count1}>-</Text>
            <Text style={styles.countNum}>2</Text>
            <Text style={styles.count2}>+</Text> */}
              {/* <Text
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
                  value={quantity}
                  // onChange={setQuantity}
                  onChange={num => {
                    setQuantity(num);
                    // Calculate total amount based on the updated quantity
                    const totalAmount = selectedItemData.price * num;
                    // Update the amount state
                    setAmount(totalAmount);
                  }}
                />
              </Text> */}

              {selectedItemData.docUploadStatus == 'YES' ? (
                <View style={{width: dimensions.fullWidth - 70}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontFamily: fontFamilies.AwsomeRegular,
                        fontSize: fontSizes.fontMidMedium,
                      }}>
                      Upload document
                    </Text>
                    <Text style={styles.unitPrice}>QTY</Text>
                  </View>

                  <EmptyView style={{height: dimensions.heightLevel1}} />
                  {selectedDocuments.map((file, index) => (
                    <View key={index}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text
                          key={index}
                          // style={styles.uri}
                          numberOfLines={1}
                          ellipsizeMode={'middle'}
                          // style={{marginRight: 150}}
                        >
                          {truncateFileName(file.name)}
                        </Text>

                        <TextInput
                          style={{
                            width: 30,
                            height: 30,
                            borderWidth: 2,
                            padding: 5,
                            borderColor: 'gray',
                          }}
                          value={selectedDocuments[index].quantity.toString()}
                          onChangeText={newQuantity =>
                            handleQuantityChange(index, newQuantity)
                          }
                          editable={true}
                        />
                      </View>
                      <EmptyView
                        style={{height: dimensions.heightLevel1 - 10}}
                      />
                    </View>
                  ))}

                  <EmptyView style={{height: dimensions.heightLevel1}} />
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50, // half of width and height to create a circle
                      backgroundColor: '#841584', // Set background color if needed
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity onPress={handleDocumentSelection}>
                      <Text style={{fontSize: 24, color: 'white'}}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
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
                    value={quantity}
                    // onChange={setQuantity}
                    onChange={num => {
                      setQuantity(num);
                      // Calculate total amount based on the updated quantity
                      const totalAmount = selectedItemData.price * num;
                      // Update the amount state
                      setAmount(totalAmount);
                    }}
                  />
                </Text>
              )}
            </View>
            <EmptyView style={{height: dimensions.heightLevel2}} />
          </View>
          <View>
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
              <View style={styles.count}>
                {selectedItemData.docUploadStatus == 'YES' ? (
                  <Text style={styles.count1}>{'INR. ' + amountWithFile}</Text>
                ) : (
                  <Text style={styles.count1}>{'INR. ' + amount}</Text>
                )}

                <TouchableOpacity>
                  <Button
                    onPress={addToCartHandler}
                    title="Add To Cart"
                    color="#841584"
                    st
                  />
                </TouchableOpacity>
              </View>
            )}
            <EmptyView style={{height: dimensions.heightLevel2}} />
          </View>
        </View>
      </ScrollView>
      <Loader isLoading={userCheckLoading} />
    </View>
  );
};

export default AddToCartScreen;

const styles = StyleSheet.create({
  container: {
    width: dimensions.fullWidth,
    height: dimensions.fullHeight + 100,
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
  circleMain: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  circle: {
    alignItems: 'center',
    width: dimensions.widthLevel2,
    height: dimensions.widthLevel2,
    backgroundColor: colors.white,
    borderRadius: 200,
    borderColor: colors.primary,
    borderWidth: 5,
  },
  squre: {
    alignItems: 'center',
    width: dimensions.widthLevel4,
    height: dimensions.widthLevel12,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderColor: colors.primary,
    borderWidth: 5,
  },
  squreTitle: {
    marginTop: 40,
    fontFamily: fontFamilies.InterBold,
    fontSize: fontSizes.fontLarge,
    color: colors.primary,
    width: dimensions.widthLevel6,
    paddingLeft: 5,
    textAlign: 'center',
    overflow: 'hidden',
  },
  circleTitle: {
    marginTop: 60,
    fontFamily: fontFamilies.InterBold,
    fontSize: fontSizes.fontLarge,
    color: colors.primary,
    width: dimensions.widthLevel6,
    paddingLeft: 5,
    textAlign: 'center',
    overflow: 'hidden',
  },
  circleDesc: {
    width: '90%',
    marginTop: 5,
    fontFamily: fontFamilies.InterRegular,
    height: dimensions.heightLevel5,
    padding: 2,
    textAlign: 'center',
    overflow: 'hidden',
  },
  foodImage: {
    borderRadius: 10,
    marginTop: 5,
    width: dimensions.widthLevel12 - 30,
    height: dimensions.widthLevel12 - 30,
  },
  itemSizeMain: {
    flexDirection: 'row',
  },
  itemSizeText: {
    fontFamily: fontFamilies.InterBold,
    fontSize: fontSizes.fontXXLarge,
  },
  itemSizeT1: {
    marginRight: 70,
    alignItems: 'center',
    backgroundColor: colors.white,
    width: dimensions.widthLevel12 - 120,
    height: dimensions.heightLevel3,
    borderColor: colors.black,
    borderWidth: 2,
  },
  itemSizeT2: {
    marginRight: 70,
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: colors.white,
    width: dimensions.widthLevel12 - 120,
    height: dimensions.heightLevel3,
    borderColor: colors.black,
    borderWidth: 2,
  },
  itemSizeT3: {
    alignItems: 'center',
    backgroundColor: colors.white,
    width: dimensions.widthLevel12 - 120,
    height: dimensions.heightLevel3,
    borderColor: colors.black,
    borderWidth: 2,
  },
  unitPrice: {
    marginRight: 0,
    fontFamily: fontFamilies.AwsomeRegular,
    fontSize: fontSizes.fontMidMedium,
  },
  count: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  count1: {
    marginRight: 20,
    fontFamily: fontFamilies.InterBold,
    fontSize: fontSizes.fontXXLarge,
  },
  countNum: {
    marginRight: 20,
    fontFamily: fontFamilies.InterBold,
    fontSize: fontSizes.fontXXLarge,
  },
  count2: {
    fontFamily: fontFamilies.InterBold,
    fontSize: fontSizes.fontXXLarge,
  },
  emptyItemView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.disabled,
    height: dimensions.heightLevel3,
    borderRadius: 20,
  },
  emptyItemText: {
    color: colors.primary,
    fontSize: fontSizes.fontLarge,
    fontFamily: fontFamilies.InterSemiBold,
  },
});
