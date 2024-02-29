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
import {checkValidEmail} from '../utilitys/feildValidations';
import {useDispatch, useSelector} from 'react-redux';
import {showToast} from '../configurations/ToastConfig';
import {
  forgotPasswordAction,
  resetAuthAction,
} from '../redux/actions/authAction';
import Loader from '../components/Loader';

const ForgotPasswordScreen = ({navigation, route}) => {
  const {isMerchant} = route?.params;
  const dispatch = useDispatch();

  // ** state
  const [email, setEmail] = useState('');
  const isDisabled = email === '' || !checkValidEmail(email);

  // ** selector
  const forgotPasswordLoading = useSelector(
    state => state.authState.forgotPasswordLoading,
  );
  const forgotPasswordSuccess = useSelector(
    state => state.authState.forgotPasswordSuccess,
  );
  const forgotPasswordFailed = useSelector(
    state => state.authState.forgotPasswordFailed,
  );

  // ** useEffect
  useEffect(() => {
    if (forgotPasswordSuccess) {
      showToast({code: 200, result: 'Email has been sent!'});
      navigation.navigate('CreatePasswordScreen', {
        isMerchant: isMerchant,
        email: email,
      });
    } else if (forgotPasswordFailed) {
      showToast({code: 500, result: forgotPasswordFailed?.result?.toString()});
    }
    dispatch(resetAuthAction());
  }, [forgotPasswordSuccess, forgotPasswordFailed]);

  function goBackScreen(navigation) {
    navigation.goBack();
  }

  function forgotPasswordHandler() {
    dispatch(forgotPasswordAction(email));
  }

  return (
    <View>
      <Image source={IMAGES.whiteBackgroundIMG} style={styles.whiteBG} />

      <View style={styles.container}>
        <EmptyView style={{height: dimensions.heightLevel2}} />

        <TouchableOpacity
          onPress={() => goBackScreen(navigation, isMerchant)}
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

        <Text style={styles.mainTitle}>Forgot Password</Text>
        <EmptyView style={{height: dimensions.heightLevel1 / 2}} />

        {/* <Text style={styles.mainSubTitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictumst orci
                    sed tortor egestas nec.</Text> */}
        <Text style={styles.mainSubTitle}>
          Reset your password by following the instructions below.
        </Text>

        <EmptyView style={{height: dimensions.heightLevel3}} />

        <View style={styles.inputContainer}>
          <TextInput
            label="Email address"
            mode="outlined"
            theme={styles.textInputOutlineStyle}
            style={{fontStyle: 'italic', fontFamily: fontFamilies.InterRegular}}
            keyboardType="email-address"
            left={
              <TextInput.Icon name="email-outline" size={20} color={'gray'} />
            }
            onChangeText={text => {
              setEmail(text);
            }}
            value={email}
            // defaultValue={mobileOtp}
          />

          {/* <EmptyView style={{ height: dimensions.heightLevel1 }} /> */}

          <EmptyView style={{height: dimensions.heightLevel2}} />

          <Button
            mode="contained"
            onPress={forgotPasswordHandler}
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
        </View>
      </View>
      <Loader isLoading={forgotPasswordLoading} />
    </View>
  );
};

export default ForgotPasswordScreen;

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
