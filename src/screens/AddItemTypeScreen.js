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
const AddItemTypeScreen = ({navigation}) => {
  const storeScreenHandler = () => {
    navigation.navigate('StoreScreen');
  };

  const stationaryScreenHandler = () => {
    navigation.navigate('StationaryStoreScreen');
  };

  function goBackScreen(navigation) {
    navigation.navigate('SelectItemTypeScreens');
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.navigate('SelectItemTypeScreens');
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
            <EmptyView style={{height: dimensions.heightLevel4}} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: fontSizes.fontLarge,
                  fontFamily: fontFamilies.AwsomeRegular,
                }}>
                Add Items to
              </Text>
            </View>

            <EmptyView style={{height: dimensions.heightLevel4}} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Button
                mode="contained"
                onPress={storeScreenHandler}
                textColor={'white'}
                width={235}
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
                Food and Drinks
              </Button>
            </View>

            <EmptyView style={{height: dimensions.heightLevel3}} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Button
                mode="contained"
                onPress={stationaryScreenHandler}
                textColor={'white'}
                width={235}
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
                Stationary
              </Button>
            </View>
            <EmptyView style={{height: dimensions.heightLevel8}} />

            <EmptyView style={{height: dimensions.heightLevel2}} />
          </View>

          <EmptyView style={{height: dimensions.heightLevel2}} />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddItemTypeScreen;

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
