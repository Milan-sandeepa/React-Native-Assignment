import React, {useEffect} from 'react';
import {
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ICONS, IMAGES} from '../assets/images';
import HeaderComponent from '../components/HeaderComponent';
import QrCodeComponent from '../components/home/QrCodeComponent';
import QrScanComponent from '../components/home/QrScanComponent';
import Lottie from 'lottie-react-native';
import {
  colors,
  dimensions,
  fontFamilies,
  fontSizes,
} from '../configurations/constants';
import EmptyView from '../components/EmptyView';
import {Button, TextInput} from 'react-native-paper';
import {currencyFormat} from '../utilitys/currency';
import {onBackPress} from '../utilitys/backButtonUtil';

const OrderPaymentCongrateScreen = ({navigation, route}) => {
  const {amount} = route?.params;

  useEffect(() => {
    onBackPress(handleBackPress);
  }, []);

  function handleBackPress() {
    navigation.navigate('MerchantScanScreen');
    return true;
  }

  function goBackScreen(navigation) {
    navigation.navigate('MerchantScanScreen');
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // Handle custom back button behavior here, e.g., navigate to a specific screen.
        // Return true to prevent the default back button behavior (app exit).
        navigation.navigate('MerchantScanScreen');
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
      <Image source={IMAGES.whiteBackgroundIMG} style={styles.whiteBG} />

      <View style={styles.container}>
        <Lottie
          source={require('../assets/animation/celebrate2-lotttie.json')}
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
          loop
        />

        <EmptyView style={{height: dimensions.heightLevel4}} />
        <Image source={IMAGES.congratulationIMG} style={styles.mainImg} />
        {/*<EmptyView style={{ height: dimensions.heightLevel1 }} />*/}
        <Text style={styles.successText}>CONGRATULATIONS!</Text>

        <EmptyView style={{height: dimensions.heightLevel3}} />
        <Text style={styles.successText2}>Payment</Text>
        <Text style={styles.successText2}>has been Received!</Text>

        <EmptyView style={{height: dimensions.heightLevel5}} />
        <Text style={styles.priceText}>
          INR {amount && currencyFormat(Number(amount))}
        </Text>
        <EmptyView style={{height: dimensions.heightLevel4}} />
      </View>

      {/* </ScrollView> */}
    </View>
  );
};

export default OrderPaymentCongrateScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    top: 70,
    paddingHorizontal: dimensions.paddingLevel3,
    alignItems: 'center',
  },

  successText: {
    fontFamily: fontFamilies.InterSemiBold,
    fontSize: fontSizes.fontXLarge,
    textAlign: 'center',
    color: colors.black,
  },

  successText2: {
    fontFamily: fontFamilies.InterRegular,
    fontSize: fontSizes.fontXLarge,
    textAlign: 'center',
    color: colors.black,
  },

  mainImg: {
    width: dimensions.widthLevel10,
    height: dimensions.widthLevel10,
    resizeMode: 'cover',
  },

  priceText: {
    fontFamily: fontFamilies.InterBold,
    fontSize: fontSizes.fontXXXLarge,
    textAlign: 'center',
    color: colors.black,
    paddingVertical: dimensions.paddingLevel2,
    paddingHorizontal: dimensions.paddingLevel2,
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 10,
  },
});
