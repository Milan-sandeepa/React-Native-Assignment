import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ICONS, IMAGES} from '../assets/images';
import EmptyView from '../components/EmptyView';
import {
  colors,
  dimensions,
  fontFamilies,
  fontSizes,
} from '../configurations/constants';
import Lottie from 'lottie-react-native';
import {onBackPress} from '../utilitys/backButtonUtil';
import {useSelector} from 'react-redux';

const PaymentSuccessScreen = ({navigation, route}) => {
  const {amount} = route?.params;

  const getRefreshCoinSuccess = useSelector(
    state => state.paymentState.getRefreshCoinSuccess,
  );

  useEffect(() => {
    onBackPress(handleBackPress);
  }, []);

  function handleBackPress() {
    navigation.navigate('DepositTab');
    return true;
  }
  return (
    <View>
      {/* <ScrollView> */}
      <Image source={IMAGES.purpleBackgroundIMG} style={styles.whiteBG} />
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

      <Lottie
        source={require('../assets/animation/celebrate-lotttie.json')}
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
        loop={false}
      />

      <View style={styles.container}>
        <EmptyView style={{height: dimensions.heightLevel10 * 1.1}} />

        <Lottie
          source={require('../assets/animation/success.json')}
          style={{
            position: 'absolute',
            top: dimensions.heightLevel2,
            width: 150,
            height: 150,
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
          loop={false}
        />

        <View>
          <View style={styles.successTextContainer}>
            <Text style={styles.successText}>your</Text>
            <Text style={styles.successText}>payment</Text>
            <Text style={styles.successText}>is</Text>
            <Text style={styles.successText}>successfull</Text>
          </View>

          <EmptyView style={{height: dimensions.heightLevel2}} />

          <Text style={styles.availableText}>available balance:</Text>

          <EmptyView style={{height: dimensions.heightLevel1 / 2}} />

          <View style={styles.priceContainer}>
            <Text style={styles.curText}>INR</Text>
            <Text style={styles.priceText}>
              {getRefreshCoinSuccess
                ? getRefreshCoinSuccess?.result
                : 'Loading...'}
            </Text>
          </View>
        </View>

        <EmptyView style={{height: dimensions.heightLevel5}} />

        <TouchableOpacity
          onPress={() => navigation.navigate('DepositTab')}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={ICONS.backICN} style={{transform: [{scale: 0.8}]}} />
          <Text style={styles.dontHaveText}> Back</Text>
        </TouchableOpacity>
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default PaymentSuccessScreen;

const styles = StyleSheet.create({
  container: {
    width: dimensions.fullWidth,
    height: dimensions.fullHeight,
    paddingHorizontal: dimensions.paddingLevel3 * 1.2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  whiteBG: {
    flex: 1,
    position: 'absolute',
    zIndex: -1,
  },

  successTextContainer: {
    width: dimensions.widthLevel3,
    padding: dimensions.paddingLevel2,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  successText: {
    fontFamily: fontFamilies.InterMedium,
    fontSize: fontSizes.fontBigger * 1.1,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: colors.secondary,
  },

  availableText: {
    fontFamily: fontFamilies.InterMedium,
    fontSize: fontSizes.fontXXLarge,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: colors.black,
  },

  curText: {
    fontFamily: fontFamilies.InterLight,
    fontSize: fontSizes.fontLarge,
    textTransform: 'uppercase',
    color: colors.secondary,
    paddingBottom: 3,
    marginRight: dimensions.paddingLevel1,
  },

  priceText: {
    fontFamily: fontFamilies.InterMedium,
    fontSize: fontSizes.fontXXXXLarge,
    textTransform: 'uppercase',
    color: colors.secondary,
  },

  priceContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: dimensions.widthLevel3,
    borderWidth: 2,
    borderColor: colors.secondary,
    borderRadius: 15,
  },

  dontHaveText: {
    fontFamily: fontFamilies.InterRegular,
    fontSize: fontSizes.fontMedium,
  },
});
