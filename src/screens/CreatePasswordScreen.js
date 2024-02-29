import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
  changePasswordAction,
  resetAuthAction,
} from '../redux/actions/authAction';
import {showToast} from '../configurations/ToastConfig';
import Loader from '../components/Loader';

const CreatePasswordScreen = ({navigation, route}) => {
  const {isMerchant, email} = route?.params;
  const dispatch = useDispatch();

  // ** state
  const [state, setState] = useState({
    code: '',
    password: '',
    reTypePassword: '',
  });
  const isDisabled =
    state?.code === '' ||
    state?.password === '' ||
    state?.reTypePassword === '';

  const changePasswordLoading = useSelector(
    state => state.authState.changePasswordLoading,
  );
  const changePasswordSuccess = useSelector(
    state => state.authState.changePasswordSuccess,
  );
  const changePasswordFailed = useSelector(
    state => state.authState.changePasswordFailed,
  );

  useEffect(() => {
    if (changePasswordSuccess) {
      showToast({code: 200, result: 'Password changed successfully.'});
      navigation.navigate('SignInScreen', {isMerchant: isMerchant});
    } else if (changePasswordFailed) {
      showToast({code: 500, result: changePasswordFailed?.result?.toString()});
    }
    dispatch(resetAuthAction());
  }, [changePasswordSuccess, changePasswordFailed]);

  function goBackScreen(navigation) {
    navigation.goBack();
  }

  function changePasswordHandler() {
    if (checkValidEmail(email)) {
      if (state?.password !== '' && state?.password === state?.reTypePassword) {
        const data = {
          email: email,
          resetCode: state?.code,
          password: state?.password,
        };

        dispatch(changePasswordAction(data));
      }
    }
  }

  return (
    <View>
      <Image source={IMAGES.whiteBackgroundIMG} style={styles.whiteBG} />

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

        <EmptyView style={{height: dimensions.heightLevel3}} />

        <Text style={styles.mainTitle}>Change Password</Text>
        <EmptyView style={{height: dimensions.heightLevel1 / 2}} />
        {/* <Text style={styles.mainSubTitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictumst orci
                    sed tortor egestas nec.</Text> */}

        <Text style={styles.mainSubTitle}>
          Update your password for enhanced security.
        </Text>

        <EmptyView style={{height: dimensions.heightLevel3}} />

        <View style={styles.inputContainer}>
          <TextInput
            label="Secret code"
            mode="outlined"
            theme={styles.textInputOutlineStyle}
            style={{fontStyle: 'italic', fontFamily: fontFamilies.InterRegular}}
            left={<TextInput.Icon name="bullseye" size={20} color={'gray'} />}
            onChangeText={text => {
              setState({...state, code: text});
            }}
            value={state?.code}
            // defaultValue={mobileOtp}
          />

          <EmptyView style={{height: dimensions.heightLevel1}} />

          <TextInput
            label="Password"
            mode="outlined"
            theme={styles.textInputOutlineStyle}
            style={{fontStyle: 'italic', fontFamily: fontFamilies.InterRegular}}
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
            style={{fontStyle: 'italic', fontFamily: fontFamilies.InterRegular}}
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

          <EmptyView style={{height: dimensions.heightLevel1}} />

          <EmptyView style={{height: dimensions.heightLevel2}} />

          <Button
            mode="contained"
            onPress={changePasswordHandler}
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
            submit
          </Button>

          <EmptyView style={{height: dimensions.heightLevel2}} />
        </View>
      </View>
      <Loader isLoading={changePasswordLoading} />
    </View>
  );
};

export default CreatePasswordScreen;

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
    alignItems: 'flex-start',
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
    color: colors.primary,
  },

  mainSubTitle: {
    fontFamily: fontFamilies.AwsomeRegular,
    fontSize: fontSizes.fontSmallPlus,
    color: colors.black,
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
});
