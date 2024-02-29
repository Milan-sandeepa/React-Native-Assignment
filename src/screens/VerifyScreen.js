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
import Icon from 'react-native-vector-icons/EvilIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  resendVerifyEmailAction,
  resetAuthAction,
  verifyUserAccountAction,
} from '../redux/actions/authAction';
import {showToast} from '../configurations/ToastConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';

const myIcon = <Icon name="redo" size={20} color={colors.primary} />;

const VerifyScreen = ({navigation, route}) => {
  const {isMerchant} = route?.params;
  const dispatch = useDispatch();

  const [code, setCode] = useState('');
  const isDisabled = code === '' || code?.length < 3;

  // ** selector
  const verifyUserAccountLoading = useSelector(
    state => state.authState.verifyUserAccountLoading,
  );
  const verifyUserAccountSuccess = useSelector(
    state => state.authState.verifyUserAccountSuccess,
  );
  const verifyUserAccountFailed = useSelector(
    state => state.authState.verifyUserAccountFailed,
  );

  const resendVerifyEmailLoading = useSelector(
    state => state.authState.resendVerifyEmailLoading,
  );
  const resendVerifyEmailSuccess = useSelector(
    state => state.authState.resendVerifyEmailSuccess,
  );
  const resendVerifyEmailFailed = useSelector(
    state => state.authState.resendVerifyEmailFailed,
  );

  useEffect(() => {
    if (verifyUserAccountSuccess) {
      showToast({code: 200, result: 'Your account has been activated!'});
      navigation.navigate('SignInScreen', {isMerchant: isMerchant});
    } else if (verifyUserAccountFailed) {
      showToast({
        code: -1,
        result: verifyUserAccountFailed?.result?.toString(),
      });
    } else if (resendVerifyEmailSuccess) {
      showToast({
        code: 200,
        result: resendVerifyEmailSuccess?.result?.toString(),
      });
    } else if (resendVerifyEmailFailed) {
      showToast({
        code: -1,
        result: resendVerifyEmailFailed?.result?.toString(),
      });
    }
    dispatch(resetAuthAction());
  }, [
    verifyUserAccountSuccess,
    verifyUserAccountFailed,
    resendVerifyEmailSuccess,
    resendVerifyEmailFailed,
  ]);

  function goBackScreen(navigation) {
    navigation.goBack();
  }

  async function VerifyHandler() {
    const mail = await AsyncStorage.getItem('verifyEmail');
    const data = {
      email: mail,
      verifyCode: code,
    };

    console.log('email : ', mail);

    await dispatch(verifyUserAccountAction(data));
  }

  async function resendHandler() {
    let mail = await AsyncStorage.getItem('verifyEmail');
    // mail = JSON.parse(mail);

    console.log(mail);
    dispatch(resendVerifyEmailAction(mail));
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

        <Text style={styles.mainTitle}>Verify Account</Text>
        <EmptyView style={{height: dimensions.heightLevel1 / 2}} />
        {/* <Text style={styles.mainSubTitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictumst orci
                    sed tortor egestas nec.</Text> */}

        <EmptyView style={{height: dimensions.heightLevel3}} />

        <View style={styles.inputContainer}>
          <TextInput
            label="Secret code"
            mode="outlined"
            theme={styles.textInputOutlineStyle}
            style={{fontStyle: 'italic', fontFamily: fontFamilies.InterRegular}}
            keyboardType="email-address"
            left={<TextInput.Icon name="bullseye" size={20} color={'gray'} />}
            onChangeText={text => {
              setCode(text);
            }}
            value={code}
            // defaultValue={mobileOtp}
          />

          <EmptyView style={{height: dimensions.heightLevel3}} />

          <Button
            mode="contained"
            onPress={VerifyHandler}
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
            loading={false}
            disabled={isDisabled}>
            submit
          </Button>

          <EmptyView style={{height: dimensions.heightLevel2}} />

          <TouchableOpacity onPress={resendHandler}>
            <Text
              style={[
                styles.mainSubTitle,
                {color: colors.primary, textAlign: 'center'},
              ]}>
              {myIcon} Resend Code
            </Text>
          </TouchableOpacity>

          <EmptyView style={{height: dimensions.heightLevel2}} />
        </View>
        <Loader
          isLoading={verifyUserAccountLoading || resendVerifyEmailLoading}
        />
      </View>
    </View>
  );
};

export default VerifyScreen;

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
