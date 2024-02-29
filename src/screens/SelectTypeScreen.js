import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {IMAGES, ICONS} from '../assets/images';
import EmptyView from '../components/EmptyView';
import HeaderComponent from '../components/HeaderComponent';
import {Button} from 'react-native-paper';
import {
  colors,
  dimensions,
  fontFamilies,
  fontSizes,
  getShadowsV2,
} from '../configurations/constants';

import {BackHandler} from 'react-native';
import {resetCartAction, setOrderType} from '../redux/actions/cartAction';
import {useDispatch} from 'react-redux';

const SelectTypeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const diningAndTakeAwayHandler = () => {
    console.log('Dining Pressed');
    // let data = 'Dining';
    dispatch(setOrderType('Dining'));
    // navigation.navigate('SelectItemScreen');
    navigation.navigate('SelectItemTypeCustomerScreen');
  };

  const takeAwayScreenHandler = () => {
    console.log('Take Away  pressed');
    // let data = 'Take Away';
    dispatch(setOrderType('Take_Away'));
    // navigation.navigate('PickUpOrderScreen');
    // navigation.navigate('SelectItemScreen');
    navigation.navigate('SelectItemTypeCustomerScreen');
  };

  function goBackScreen(navigation) {
    navigation.navigate('SelectStoreScreens');
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // Handle custom back button behavior here, e.g., navigate to a specific screen.
        // Return true to prevent the default back button behavior (app exit).
        dispatch(resetCartAction());
        navigation.navigate('SelectStoreScreens');
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

          <EmptyView style={{height: dimensions.heightLevel8}} />

          <View style={{width: '100%'}}>
            <EmptyView style={{height: dimensions.heightLevel7}} />
            <Button
              mode="contained"
              onPress={diningAndTakeAwayHandler}
              textColor={'white'}
              color={colors.primary}
              style={{
                paddingVertical: 5,
                backgroundColor: colors.primary,
              }}
              labelStyle={{
                fontSize: fontSizes.fontXLarge,
                fontFamily: fontFamilies.InterBold,
              }}
              loading={false}
              disabled={false}>
              {/* Pre Order */}
              Dining
            </Button>
            <EmptyView style={{height: dimensions.heightLevel3}} />
            <Button
              mode="contained"
              onPress={takeAwayScreenHandler}
              textColor={'white'}
              color={colors.primary}
              style={{
                paddingVertical: 5,
                backgroundColor: colors.primary,
              }}
              labelStyle={{
                fontSize: fontSizes.fontXLarge,
                fontFamily: fontFamilies.InterBold,
              }}
              loading={false}
              disabled={false}>
              {/* Pick Up */}
              Take Away
            </Button>
            <EmptyView style={{height: dimensions.heightLevel2}} />
          </View>

          <EmptyView style={{height: dimensions.heightLevel2}} />
        </View>
      </ScrollView>
    </View>
  );
};

export default SelectTypeScreen;

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
    height: dimensions.fullHeight - 70,
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
});
