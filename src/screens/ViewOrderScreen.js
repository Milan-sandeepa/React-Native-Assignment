import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {IMAGES} from '../assets/images';
import HeaderComponent from '../components/HeaderComponent';
import Lottie from 'lottie-react-native';
import {ICONS} from '../assets/images';
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

const ViewOrderScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const userSave = useSelector(state => state.authState.userSave);

  const goNextScreenHandler = () => {
    navigation.navigate('QRScanViewOrderScreen');
  };

  function goBackScreen(navigation) {
    navigation.navigate('HomeTab');
  }

  useEffect(() => {
    dispatch(getRefreshCoinsAction(userSave.email));
  }, []);

  return (
    <View>
      <HeaderComponent navigation={navigation} />

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

          <Lottie
            source={require('../assets/animation/qr-scan.json')}
            style={{
              position: 'relative',
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
          <EmptyView style={{height: dimensions.heightLevel6}} />
          <View style={{width: '90%'}}>
            <EmptyView style={{height: dimensions.heightLevel6}} />
            <Text style={styles.successText}>Scan Your Customer QR</Text>
            <EmptyView style={{height: dimensions.heightLevel3}} />
            <Button
              mode="contained"
              onPress={goNextScreenHandler}
              color={colors.primary}
              style={{
                paddingVertical: 1,
                backgroundColor: colors.primary,
              }}
              labelStyle={{
                fontSize: fontSizes.fontXLarge,
                fontFamily: fontFamilies.InterBold,
              }}>
              Scan
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ViewOrderScreen;

const styles = StyleSheet.create({
  whiteBG: {
    width: dimensions.fullWidth,
    height: '100%',
    position: 'absolute',
    zIndex: -1,
  },
  container: {
    width: dimensions.fullWidth,
    height: dimensions.fullHeight - 70,
    paddingHorizontal: dimensions.paddingLevel3 * 1.2,
    alignItems: 'center',
  },
  successText: {
    fontFamily: fontFamilies.InterMedium,
    fontSize: fontSizes.fontLarge * 0.9,
    textAlign: 'center',
    color: colors.secondary,
  },
});
