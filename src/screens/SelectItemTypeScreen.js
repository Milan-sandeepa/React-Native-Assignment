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
import CheckBox from '@react-native-community/checkbox';

import {BackHandler} from 'react-native';

const SelectItemTypeScreen = ({navigation}) => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const NextScreenHandler = () => {
    console.log('NextScreenHandler pressed');
    if (checked1 & checked2) {
      navigation.navigate('AddItemTypeScreen');
    } else if (checked1) {
      navigation.navigate('StoreScreen');
    } else if (checked2) {
      navigation.navigate('StationaryStoreScreen');
    }
  };

  function goBackScreen(navigation) {
    navigation.navigate('QRScanViewOrderScreen');
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.navigate('QRScanViewOrderScreen');
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

          <EmptyView style={{height: dimensions.heightLevel6}} />

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
                Select the type of items
              </Text>
            </View>

            <EmptyView style={{height: dimensions.heightLevel4}} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <CheckBox value={checked1} onValueChange={setChecked1} />
              <Button
                mode="contained"
                //   onPress={diningAndTakeAwayHandler}
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
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <CheckBox value={checked2} onValueChange={setChecked2} />
              <Button
                mode="contained"
                //   onPress={takeAwayScreenHandler}
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              {(checked1 || checked2) && (
                <Button
                  mode="contained"
                  onPress={NextScreenHandler}
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
                  Next
                </Button>
              )}
            </View>

            <EmptyView style={{height: dimensions.heightLevel2}} />
          </View>

          <EmptyView style={{height: dimensions.heightLevel2}} />
        </View>
      </ScrollView>
    </View>
  );
};

export default SelectItemTypeScreen;

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
