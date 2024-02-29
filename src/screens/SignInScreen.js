import React, {useEffect, useState} from 'react';
import {Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {ICONS, IMAGES} from '../assets/images';
import EmptyView from '../components/EmptyView';
import {colors, dimensions, fontFamilies, fontSizes} from '../configurations/constants';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToast} from '../configurations/ToastConfig';
import {resetAuthAction, signInAction, storeTokenAuthAction, userSaveAction} from '../redux/actions/authAction';
import {checkValidEmail} from '../utilitys/feildValidations';
import Loader from '../components/Loader';
import {ROLES} from '../utilitys/role';


const SignInScreen = ({navigation, route}) => {
    const {isMerchant} = route?.params;
    const dispatch = useDispatch();

    // ** state
    const [state, setState] = useState({
        email: '',
        password: '',
    });
    const isDisabled = state?.email === '' || state?.password === '';

    // ** selector
    const signInLoading = useSelector(state => state.authState.signInLoading);
    const signInSuccess = useSelector(state => state.authState.signInSuccess);
    const signInFailed = useSelector(state => state.authState.signInFailed);


    useEffect(() => {
        if (signInSuccess && signInSuccess.result) {
            let {token, email, firstName, lastName, role} = signInSuccess?.result;


            if ((role === ROLES.MERCHANT) === isMerchant) {
                // ** save token: async storage
                async function storeToken(token, email, firstName, lastName, role) {
                    await AsyncStorage.setItem('token', token);
                    await AsyncStorage.setItem('email', email);
                    await AsyncStorage.setItem('firstName', firstName);
                    await AsyncStorage.setItem('lastName', lastName);
                    await AsyncStorage.setItem('role', role);
                };

                storeToken(token, email, firstName, lastName, role);

                console.log('\nisMerchant: ', isMerchant);
                dispatch(userSaveAction(signInSuccess?.result));
                // ** store token
                dispatch(storeTokenAuthAction(token));


            } else {
                let msg = `sorry, The ${isMerchant ? 'merchant' : 'student'} account is not found in this email`;
                showToast({code: -1, result: msg});
            }


        } else if (signInFailed) {
            if (signInFailed?.result === 'Given User Not Verified!') {
                async function storeToken(value) {
                    await AsyncStorage.setItem('verifyEmail', value);
                    await navigation.navigate('VerifyScreen', {isMerchant: isMerchant});
                };
                storeToken(state?.email);
            } else {
                showToast({code: 500, result: signInFailed?.result?.toString()});
            }
        }

        dispatch(resetAuthAction());
    }, [signInSuccess, signInFailed]);


    // ** function
    function goBackScreen(navigation) {
        navigation.goBack();
    }

    function nextForgotScreen(navigation, isMerchant) {
        navigation.navigate('ForgotPasswordScreen', {isMerchant: isMerchant});
    }

    function nextRegisterScreen(navigation, isMerchant) {
        navigation.navigate('SignUpScreen', {isMerchant: isMerchant});
    }

    function signInHandler() {

        if (checkValidEmail(state?.email)) {
            let data = {
                email: state?.email,
                password: state?.password,
            };

            console.log(data);

            dispatch(signInAction(data));

        } else {
            showToast({code: -1, result: 'oops, invalid email address format!'});
        }
    }


    return (
        <KeyboardAvoidingView keyboardVerticalOffset={50}>
            <ScrollView>
                <Image source={IMAGES.whiteBackgroundIMG} style={styles.whiteBG}/>

                <View style={styles.container}>
                    <EmptyView style={{height: dimensions.heightLevel5}}/>

                    <Image style={styles.logoImage} source={IMAGES.logoIMG}/>
                    <EmptyView style={{height: dimensions.heightLevel1}}/>

                    <Text style={styles.mainTitle}>Login to your account</Text>
                    <Text style={styles.mainSubTitle}>Sign in to {isMerchant ? 'merchant' : 'student'}</Text>

                    <EmptyView style={{height: dimensions.heightLevel4}}/>


                    <View style={styles.inputContainer}>
                        <TextInput
                            label='Email address'
                            mode='outlined'
                            theme={styles.textInputOutlineStyle}
                            style={{fontStyle: 'italic', fontFamily: fontFamilies.InterRegular}}
                            keyboardType='email-address'
                            left={<TextInput.Icon name="email-outline" size={20} color={'gray'}/>}
                            onChangeText={(text) => {
                                setState({...state, email: text});
                            }}
                            value={state?.email}
                            // defaultValue={mobileOtp}
                        />


                        <EmptyView style={{height: dimensions.heightLevel1}}/>

                        <TextInput
                            label='Password'
                            mode='outlined'
                            theme={styles.textInputOutlineStyle}
                            style={{fontStyle: 'italic', fontFamily: fontFamilies.InterRegular}}
                            secureTextEntry
                            password={true}
                            autoCorrect={false}
                            // maxLength={6}
                            left={<TextInput.Icon name="lock" size={20} color={'gray'}/>}
                            onChangeText={(text) => {
                                setState({...state, password: text});
                            }}
                            value={state?.password}
                            // defaultValue={mobileOtp}
                        />


                        <EmptyView style={{height: dimensions.heightLevel1}}/>

                        <TouchableOpacity onPress={() => nextForgotScreen(navigation, isMerchant)}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        <EmptyView style={{height: dimensions.heightLevel2}}/>

                        <Button
                            mode="contained"
                            onPress={signInHandler}
                            textColor={'white'}
                            color={colors.primary}
                            style={{paddingVertical: 5, backgroundColor: isDisabled ? colors.disabled : colors.primary}}
                            labelStyle={{fontSize: fontSizes.fontXLarge, fontFamily: fontFamilies.InterBold}}
                            loading={false}
                            disabled={isDisabled}
                        >
                            LOGIN
                        </Button>

                        <EmptyView style={{height: dimensions.heightLevel2}}/>

                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <Text style={styles.dontHaveText}>Don’t have account?</Text>
                            <TouchableOpacity onPress={() => nextRegisterScreen(navigation, isMerchant)}>
                                <Text style={styles.forgotPasswordText}> Create a account!</Text>
                            </TouchableOpacity>
                        </View>


                        <EmptyView style={{height: dimensions.heightLevel5}}/>

                        <TouchableOpacity
                            onPress={() => goBackScreen(navigation, isMerchant)}
                            style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={ICONS.backICN} style={{transform: [{scale: 0.8}]}}/>
                            <Text style={styles.dontHaveText}> Back</Text>
                        </TouchableOpacity>


                    </View>
                    <Loader isLoading={signInLoading}/>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({

    textInputOutlineStyle: {
        colors: {
            placeholder: 'black',
            text: 'black', primary: 'black',
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
        paddingBottom: 3
    },

    inputContainer: {
        width: '100%',
    },

    forgotPasswordText: {
        textAlign: 'right',
        fontFamily: fontFamilies.InterLight,
        color: colors.secondary,
    },

    dontHaveText: {
        fontFamily: fontFamilies.InterRegular,
        fontSize: fontSizes.fontMedium,
    },

});
