import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IMAGES} from '../assets/images';
import HeaderComponent from '../components/HeaderComponent';
import Lottie from 'lottie-react-native';
import {
  colors,
  dimensions,
  fontFamilies,
  fontSizes,
} from '../configurations/constants';
import EmptyView from '../components/EmptyView';
import {Button, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {getRefreshCoinsAction} from '../redux/actions/paymentAction';
import {onBackPress} from '../utilitys/backButtonUtil';
import {TabActions} from '@react-navigation/native';

const MerchantScanScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const userSave = useSelector(state => state.authState.userSave);
  // ** state
  const [value, setValue] = useState('');

  const isDisabled = value === '';

  // const goNextScreenHandler = () => {
  //   navigation.navigate('QRScanScreen', {amount: value});
  // };

  const goNextScreenHandler = () => {
    navigation.navigate('QRScanViewOrderScreen');
  };

  useEffect(() => {
    dispatch(getRefreshCoinsAction(userSave.email));
  }, []);

  return (
    <View>
      <HeaderComponent navigation={navigation} />

      {/* <ScrollView> */}
      <Image source={IMAGES.whiteBackgroundIMG} style={styles.whiteBG} />

      <View style={styles.container}>
        <Lottie
          source={require('../assets/animation/qr-scan.json')}
          style={{
            position: 'absolute',
            top: dimensions.heightLevel3,
            width: 170,
            height: 170,
          }}
          colorFilters={[
            {
              keypath: 'button',
              color: '#F00000',
            },
            {
              keypath: 'Sending Loader',
              color: '#F00000',
            },
          ]}
          autoPlay
          loop={true}
        />

        <EmptyView style={{height: dimensions.heightLevel10 * 1.9}} />

        {/* <Text style={styles.successText}>Enter Amount to Receive (RS)</Text> */}
        {/*<Text style={styles.priceText}>INR {currencyFormat(2666777)}</Text>*/}

        <EmptyView style={{height: dimensions.heightLevel1}} />

        <View style={{width: '90%'}}>
          {/* <TextInput
            label=""
            mode="flat"
            theme={styles.textInputOutlineStyle}
            style={{
              fontStyle: 'italic',
              fontFamily: fontFamilies.InterSemiBold,
              textAlign: 'center',
              borderColor: colors.disabled,
              borderWidth: 0.5,
              backgroundColor: 'rgba(255,255,255,0.7)',
            }}
            keyboardType="number-pad"
            onChangeText={text => {
              setValue(text);
            }}
            value={value}
            // defaultValue={mobileOtp}
          /> */}

          {/*<Text style={styles.priceText}>INR {currencyFormat(Number(value))}</Text>*/}

          <EmptyView style={{height: dimensions.heightLevel6}} />

          <Button
            mode="contained"
            onPress={goNextScreenHandler}
            textColor={'white'}
            color={colors.primary}
            style={{
              paddingVertical: 1,
              backgroundColor: colors.primary,
            }}
            labelStyle={{
              fontSize: fontSizes.fontXLarge,
              fontFamily: fontFamilies.InterBold,
            }}
            loading={false}
            // disabled={isDisabled}
          >
            SCAN
          </Button>
        </View>
      </View>

      {/* </ScrollView> */}
    </View>
  );
};

export default MerchantScanScreen;

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
    width: '100%',
    position: 'absolute',
    top: 70,
    paddingHorizontal: dimensions.paddingLevel3,
    alignItems: 'center',
  },

  successText: {
    fontFamily: fontFamilies.InterMedium,
    fontSize: fontSizes.fontLarge * 0.9,
    textAlign: 'center',
    color: colors.secondary,
  },

  priceText: {
    fontFamily: fontFamilies.InterRegular,
    color: colors.black,
    fontSize: fontSizes.fontMedium,
    textTransform: 'uppercase',
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: dimensions.paddingLevel1,
    paddingHorizontal: dimensions.paddingLevel2,
  },
});
