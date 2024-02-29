import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  VirtualizedList,
  Modal,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {ICONS, IMAGES} from '../assets/images';
import EmptyView from '../components/EmptyView';
import {
  colors,
  dimensions,
  fontFamilies,
  fontSizes,
} from '../configurations/constants';
import {useDispatch, useSelector} from 'react-redux';
import {checkValidEmail} from '../utilitys/feildValidations';
import {
  resetAuthAction,
  signInAction,
  signUpAction,
} from '../redux/actions/authAction';
import {showToast} from '../configurations/ToastConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
import {ROLES} from '../utilitys/role';
import DropDownPicker from 'react-native-dropdown-picker';
import {LogBox} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {getAllCollageAction} from '../redux/actions/collageAction';
import {baseUrl, getAllCollageUrl} from '../configurations/urlConfigurations';
import {el} from 'date-fns/locale';

const SignUpScreen = ({navigation, route}) => {
  const {isMerchant} = route?.params;

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState();
  const [collageData, setCollageData] = useState([]);
  const isFocused = useIsFocused();
  const [domain, setDomain] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [collageLable, setCollageLable] = useState('Select Collage');

  // ** state
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    contact: '+91',
    shopName: '',
    email: '',
    collageId: '',
    password: '',
    reTypePassword: '',
  });

  const isDisabled =
    state?.email === '' ||
    state?.password === '' ||
    state?.reTypePassword === '' ||
    (isMerchant ? state?.shopName === '' : state?.firstName === '');

  // ** useSelector
  const signUpLoading = useSelector(state => state.authState.signUpLoading);
  const signUpSuccess = useSelector(state => state.authState.signUpSuccess);
  const signUpFailed = useSelector(state => state.authState.signUpFailed);

  // ** useEffect
  useEffect(() => {
    if (signUpSuccess) {
      // ** save token: async storage
      async function storeToken(value) {
        await AsyncStorage.setItem('verifyEmail', value);
        await navigation.navigate('VerifyScreen', {isMerchant: isMerchant});
      }

      if (isMerchant) {
        storeToken(state?.email);
      } else {
        storeToken(state?.email + domain);
      }
    } else if (signUpFailed) {
      showToast({code: 500, result: signUpFailed?.result?.toString()});
    }

    dispatch(resetAuthAction());
  }, [signUpSuccess, signUpFailed]);

  // ** function
  function goBackScreen(navigation) {
    navigation.goBack();
  }

  function registerHandler(navigation, isMerchant) {
    if (
      isMerchant
        ? checkValidEmail(state?.email)
        : checkValidEmail(state?.email + domain)
    ) {
      if (state?.password !== '' && state?.password === state?.reTypePassword) {
        if (isMerchant) {
          let data = {
            email: state?.email,
            password: state?.password,
            shopName: state?.shopName,
            firstName: state?.firstName,
            lastName: state?.lastName,
            contact: state?.contact,
            role: ROLES.MERCHANT,
            collageId: state?.collageId,
          };

          dispatch(signUpAction(data));
        } else if (!isMerchant) {
          let data = {
            email: state?.email + domain,
            password: state?.password,
            shopName: '',
            firstName: state?.firstName,
            lastName: state?.lastName,
            contact: state?.contact,
            role: ROLES.USER,
            collageId: state?.collageId,
          };

          dispatch(signUpAction(data));
        }
      } else {
        showToast({code: -1, result: 'oops,confirm password not matched!'});
      }
    } else {
      showToast({code: -1, result: 'oops, invalid email address format!'});
    }
  }

  // dropdown

  useEffect(() => {
    if (isFocused) {
      fetchData(); // Perform API call when screen is focused
    }
  }, [isFocused]);

  const fetchData = async () => {
    try {
      const response = await fetch(baseUrl + getAllCollageUrl); // Replace with your API endpoint
      const jsonData = await response.json();
      setCollageData(jsonData.result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const selectHandler = selectedItem => {
    const selectedCollageId = selectedItem.value;

    // Update the state with the selected collageId
    setState({
      ...state,
      collageId: selectedCollageId,
    });
    console.log('collageDomain--', selectedCollageId - 1);
    console.log('collageName--', selectedItem.label);
    console.log('collageDomain--', collageData[selectedCollageId - 1]?.domain);
    setDomain(collageData[selectedCollageId - 1]?.domain);
    setIsDropdownVisible(false);
    setCollageLable(selectedItem.label);
  };

  function nextLoginScreen(navigation, isMerchant) {
    navigation.navigate('SignInScreen', {isMerchant: isMerchant});
  }

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={50}>
      <ScrollView>
        <Image source={IMAGES.whiteBackgroundIMG} style={styles.whiteBG} />

        <View style={styles.container}>
          <EmptyView style={{height: dimensions.heightLevel5}} />

          {/* <Image style={styles.logoImage} source={IMAGES.logoIMG} />
                                <EmptyView style={{ height: dimensions.heightLevel1 }} /> */}

          <Text style={styles.mainTitle}>Create Account</Text>
          <Text style={styles.mainSubTitle}>
            Create a new {isMerchant ? 'merchant' : 'student'} account
          </Text>

          <EmptyView style={{height: dimensions.heightLevel3}} />

          <View style={styles.inputContainer}>
            {isMerchant && (
              <TextInput
                label="Shop name"
                mode="outlined"
                theme={styles.textInputOutlineStyle}
                style={{
                  fontStyle: 'italic',
                  fontFamily: fontFamilies.InterRegular,
                }}
                left={
                  <TextInput.Icon
                    name="store-outline"
                    size={20}
                    color={'gray'}
                  />
                }
                onChangeText={text => {
                  setState({...state, shopName: text});
                }}
                value={state?.shopName}
                // defaultValue={mobileOtp}
              />
            )}
            <>
              <EmptyView style={{height: dimensions.heightLevel1}} />
              <TextInput
                label="First name"
                mode="outlined"
                theme={styles.textInputOutlineStyle}
                style={{
                  fontStyle: 'italic',
                  fontFamily: fontFamilies.InterRegular,
                }}
                left={
                  <TextInput.Icon
                    name="account-outline"
                    size={20}
                    color={'gray'}
                  />
                }
                onChangeText={text => {
                  setState({...state, firstName: text});
                }}
                value={state?.firstName}
                // defaultValue={mobileOtp}
              />

              <EmptyView style={{height: dimensions.heightLevel1}} />

              <TextInput
                label="Last name"
                mode="outlined"
                theme={styles.textInputOutlineStyle}
                style={{
                  fontStyle: 'italic',
                  fontFamily: fontFamilies.InterRegular,
                }}
                left={
                  <TextInput.Icon
                    name="account-outline"
                    size={20}
                    color={'gray'}
                  />
                }
                onChangeText={text => {
                  setState({...state, lastName: text});
                }}
                value={state?.lastName}
                // defaultValue={mobileOtp}
              />
              <EmptyView style={{height: dimensions.heightLevel1}} />
              <TextInput
                label="Contact"
                mode="outlined"
                theme={styles.textInputOutlineStyle}
                style={{
                  fontStyle: 'italic',
                  fontFamily: fontFamilies.InterRegular,
                }}
                left={
                  <TextInput.Icon
                    name="phone-outline"
                    size={20}
                    color={'gray'}
                  />
                }
                onChangeText={text => {
                  setState({...state, contact: text});
                }}
                value={state?.contact}
                // defaultValue={mobileOtp}
              />
            </>

            <EmptyView style={{height: dimensions.heightLevel1}} />

            {/* <DropDownPicker
              items={collageData?.map(item => ({
                label: item.name,
                value: item.id,
              }))}
              // items={items}
              open={isOpen}
              value={currentValue}
              setOpen={setIsOpen}
              setValue={setCurrentValue}
              onSelectItem={selectHandler}
              placeholder="Select Collage"
              containerStyle={{height: 40, width: dimensions.widthLevel2 - 7}}
              autoScroll
              maxHeight={150}
              placeholderStyle={{
                fontSize: fontSizes.fontMedium,
                fontFamily: fontFamilies.InterRegular,
              }}
            /> */}

            {/* <TouchableOpacity
              onPressIn={() => setIsDropdownVisible(!isDropdownVisible)}>
              <TextInput
                label="Select Collage"
                mode="outlined"
                value={collageLable}
                theme={styles.textInputOutlineStyle}
                style={{
                  fontStyle: 'italic',
                  fontFamily: fontFamilies.InterRegular,
                }}
                editable={false}
                left={
                  <TextInput.Icon
                    name="chevron-down"
                    size={20}
                    color={'gray'}
                  />
                }
              />
            </TouchableOpacity>

            <Modal
              transparent={true}
              animationType="slide"
              visible={isDropdownVisible}
              onRequestClose={() => setIsDropdownVisible(false)}>
              <View style={styles.modalContainer}>
                <DropDownPicker
                  items={collageData?.map(item => ({
                    label: item.name,
                    value: item.id,
                  }))}
                  open={isOpen}
                  value={currentValue}
                  setOpen={setIsOpen}
                  setValue={setCurrentValue}
                  onSelectItem={selectHandler}
                  placeholder="Select Collage"
                  containerStyle={{
                    height: 40,
                    width: dimensions.widthLevel2 - 7,
                  }}
                  autoScroll
                  maxHeight={150}
                  placeholderStyle={{
                    fontSize: fontSizes.fontMedium,
                    fontFamily: fontFamilies.InterRegular,
                  }}
                />
              </View>
            </Modal> */}

            <DropDownPicker
              items={collageData?.map(item => ({
                label: item.name,
                value: item.id,
              }))}
              open={isOpen}
              value={currentValue}
              setOpen={setIsOpen}
              setValue={setCurrentValue}
              onSelectItem={selectHandler}
              placeholder="Select Collage"
              containerStyle={{
                height: 40,
                width: dimensions.widthLevel2 - 7,
              }}
              autoScroll
              maxHeight={150}
              placeholderStyle={{
                fontSize: fontSizes.fontMedium,
                fontFamily: fontFamilies.InterRegular,
              }}
              searchable={true}
              listMode="SCROLLVIEW"
            />

            <EmptyView style={{height: dimensions.heightLevel1}} />
            {isMerchant ? (
              <TextInput
                label="Email address"
                mode="outlined"
                theme={styles.textInputOutlineStyle}
                style={{
                  fontStyle: 'italic',
                  fontFamily: fontFamilies.InterRegular,
                }}
                left={
                  <TextInput.Icon
                    name="email-outline"
                    size={20}
                    color={'gray'}
                  />
                } //cellphone-text
                onChangeText={text => {
                  setState({...state, email: text});
                }}
                value={state?.email}
                // defaultValue={mobileOtp}
              />
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  // justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TextInput
                  label="Enter your college email."
                  mode="outlined"
                  theme={styles.textInputOutlineStyle}
                  style={{
                    fontStyle: 'italic',
                    fontFamily: fontFamilies.InterRegular,
                    width: '65%',
                  }}
                  keyboardType="email-address"
                  left={
                    <TextInput.Icon
                      name="email-outline"
                      size={20}
                      color={'gray'}
                    />
                  }
                  onChangeText={text => {
                    setState({...state, email: text});
                  }}
                  value={state?.email}
                  // defaultValue={mobileOtp}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    fontFamily: fontFamilies.InterBold,
                    fontSize: fontSizes.fontMedium,
                  }}>
                  {domain}
                </Text>
              </View>
            )}

            {/* dropdown */}
            {/* <DropDownPicker
              // items={shopData.map(item => ({label: item.name, value: item.id}))}
              open={isOpen}
              setOpen={() => setIsOpen(!isOpen)}
              value={currentValue}
              setValue={value => setCurrentValue(value)}
              // setValue={selectHandler}
              onSelectItem={selectHandler}
              placeholder="Select the Collage"
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
            /> */}
            {/* onPressIn=
            {() => {
              console.log(collageData.result?.[0].id);
            }} */}

            <EmptyView style={{height: dimensions.heightLevel1}} />
            <TextInput
              label="Password"
              mode="outlined"
              theme={styles.textInputOutlineStyle}
              style={{
                fontStyle: 'italic',
                fontFamily: fontFamilies.InterRegular,
              }}
              secureTextEntry
              password={true}
              autoCorrect={false}
              // maxLength={6}
              left={<TextInput.Icon name="lock" size={20} color={'gray'} />}
              onChangeText={text => {
                setState({...state, password: text});
              }}
              value={state?.password}
              // defaultValue={mobileOtp}
            />
            <EmptyView style={{height: dimensions.heightLevel1}} />
            <TextInput
              label="Confirm password"
              mode="outlined"
              theme={styles.textInputOutlineStyle}
              style={{
                fontStyle: 'italic',
                fontFamily: fontFamilies.InterRegular,
              }}
              secureTextEntry
              password={true}
              autoCorrect={false}
              // maxLength={6}
              left={<TextInput.Icon name="lock" size={20} color={'gray'} />}
              onChangeText={text => {
                setState({...state, reTypePassword: text});
              }}
              value={state?.reTypePassword}
              // defaultValue={mobileOtp}
            />
            <EmptyView style={{height: dimensions.heightLevel3}} />
            <Button
              mode="contained"
              onPress={() => registerHandler(navigation, isMerchant)}
              textColor={'white'}
              color={colors.primary}
              style={{
                paddingVertical: 5,
                backgroundColor: isDisabled ? colors.disabled : colors.primary,
              }}
              labelStyle={{
                fontSize: fontSizes.fontXLarge,
                fontFamily: fontFamilies.InterBold,
              }}
              disabled={isDisabled}
              loading={false}>
              REGISTER
            </Button>
            <EmptyView style={{height: dimensions.heightLevel2}} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.dontHaveText}>Already have a account?</Text>
              <TouchableOpacity
                onPress={() => nextLoginScreen(navigation, isMerchant)}>
                <Text style={styles.forgotPasswprdText}> Login</Text>
              </TouchableOpacity>
            </View>
            <EmptyView style={{height: dimensions.heightLevel1 / 2}} />
            <TouchableOpacity
              onPress={() => goBackScreen(navigation)}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={ICONS.backICN}
                style={{transform: [{scale: 0.8}]}}
              />
              <Text style={styles.dontHaveText}> Back</Text>
            </TouchableOpacity>
          </View>
          <EmptyView style={{height: dimensions.heightLevel5}} />

          <Loader isLoading={signUpLoading} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

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
    // height: dimensions.fullHeight,
    paddingHorizontal: dimensions.paddingLevel3 * 1.2,
    alignItems: 'center',
  },

  whiteBG: {
    flex: 1,
    position: 'absolute',
    zIndex: -1,
  },

  logoImage: {
    width: dimensions.paddingLevel10 * 1.3,
    height: dimensions.paddingLevel10 * 1.3,
    resizeMode: 'contain',
  },

  mainTitle: {
    fontFamily: fontFamilies.InterBold,
    fontSize: fontSizes.fontXXXLarge,
    color: colors.secondary,
  },

  mainSubTitle: {
    fontFamily: fontFamilies.AwsomeRegular,
    fontSize: fontSizes.fontXLarge,
    color: colors.secondary,
  },

  inputContainer: {
    width: '100%',
  },

  forgotPasswprdText: {
    textAlign: 'right',
    fontFamily: fontFamilies.InterLight,
    color: colors.secondary,
  },

  dontHaveText: {
    fontFamily: fontFamilies.InterRegular,
    fontSize: fontSizes.fontMedium,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
});
