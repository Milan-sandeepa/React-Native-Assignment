// ** Import Core
import React, {useEffect, useState, useCallback} from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
// ** Import Images
import {IMAGES} from '../assets/images';
// ** Import constant
import {
  colors,
  dimensions,
  fontFamilies,
  fontSizes,
} from '../configurations/constants';
// import { storeIsPackageExpireAuthAction, storeTokenAuthAction } from '../redux/actions/authAction';
// import { resetPackageAction } from "../redux/actions/packagesAction";
import EmptyView from './EmptyView';
import {Button} from 'react-native-paper';
import {
  resetAuthAction,
  storeTokenAuthAction,
} from '../redux/actions/authAction';
import {useSelector} from 'react-redux';
import {Linking} from 'react-native';

const DrawerComponent = ({navigation}) => {
  const dispatch = useDispatch();
  const [showOrderButton, setShowOrderButton] = useState('none');
  const [showStoreButton, setShowStoreButton] = useState('none');
  const [showActiveOrderButton, setShowActiveOrderButton] = useState('none');
  const [showViewOrderButton, setShowViewOrderButton] = useState('none');

  const token = useSelector(state => state.authState.token);
  const isMerchant = useSelector(state => state.authState.isMerchant);

  useEffect(() => {
    if (isMerchant) {
      setShowOrderButton('none');
      setShowActiveOrderButton('none');
      setShowStoreButton('flex');
      setShowViewOrderButton('flex');
    } else {
      setShowOrderButton('flex');
      setShowActiveOrderButton('flex');
      setShowStoreButton('none');
      setShowViewOrderButton('none');
    }
  }, [isMerchant]);

  // ** function here
  const logOutHandler = async navigation => {
    await navigation.closeDrawer();

    let timer = setTimeout(() => {
      // RESET ALL
      dispatch(storeTokenAuthAction(null));
      dispatch(resetAuthAction());
    }, 1000);
  };

  // **placeOrder function here
  const placeOrderHandler = navigation => {
    navigation.closeDrawer();
    navigation.navigate('SelectStoreScreen');
  };
  const homeHandler = navigation => {
    navigation.closeDrawer();

    if (isMerchant) {
      // navigation.navigate('MerchantScanScreen');
      navigation.navigate('QRScanViewOrderScreen');
    } else {
      navigation.navigate('HomeTab');
    }
  };
  const ItemStoreHandler = navigation => {
    navigation.closeDrawer();
    // navigation.navigate('StoreScreen');
    navigation.navigate('SelectItemTypeScreen');
  };

  const activeOrdersScreenHandler = navigation => {
    navigation.closeDrawer();
    navigation.navigate('ActiveOrdersScreen');
  };
  const viewOrderHandler = navigation => {
    navigation.closeDrawer();
    navigation.navigate('ViewOrderScreen');
  };

  const storeActiveOrderHandler = navigation => {
    navigation.closeDrawer();
    navigation.navigate('StoreActiveOrdersScreen');
  };

  return (
    <View style={styles.container}>
      <EmptyView style={{marginTop: dimensions.heightLevel1}} />
      <Image source={IMAGES.logoIMG} style={styles.image} />
      {/* <Text style={styles.drawerText}>Managing by swetha m</Text> */}
      <View style={styles.imageContainer}>
        <EmptyView style={{marginTop: dimensions.heightLevel5}} />
        <View>
          <Button
            mode="contained"
            onPress={() => homeHandler(navigation)}
            textColor={'white'}
            color={colors.primary}
            style={{paddingVertical: 5}}
            labelStyle={{
              fontSize: fontSizes.fontXLarge,
              fontFamily: fontFamilies.InterBold,
            }}
            // loading={true}
          >
            {'           ' + 'Home' + '           '}
          </Button>
        </View>

        <EmptyView style={{marginTop: dimensions.heightLevel3}} />

        {isMerchant ? (
          <>
            <Button
              mode="contained"
              onPress={() => ItemStoreHandler(navigation)}
              textColor={'white'}
              color={colors.primary}
              style={{paddingVertical: 5, display: showStoreButton}}
              labelStyle={{
                fontSize: fontSizes.fontXLarge,
                fontFamily: fontFamilies.InterBold,
              }}

              // loading={true}
            >
              {'          ' + 'Store' + '           '}
            </Button>
            <EmptyView style={{marginTop: dimensions.heightLevel3}} />
            <Button
              mode="contained"
              onPress={() => storeActiveOrderHandler(navigation)}
              textColor={'white'}
              color={colors.primary}
              style={{paddingVertical: 5, display: showViewOrderButton}}
              labelStyle={{
                fontSize: fontSizes.fontXLarge,
                fontFamily: fontFamilies.InterBold,
              }}

              // loading={true}
            >
              {'  ' + 'Active Orders' + ' '}
            </Button>
            {/* <EmptyView style={{marginTop: dimensions.heightLevel1}} /> */}
            {/* <Button
              mode="contained"
              onPress={() => viewOrderHandler(navigation)}
              textColor={'white'}
              color={colors.primary}
              style={{paddingVertical: 5, display: showViewOrderButton}}
              labelStyle={{
                fontSize: fontSizes.fontXLarge,
                fontFamily: fontFamilies.InterBold,
              }}

              // loading={true}
            >
              {'    ' + 'Scan Order' + '     '}
            </Button> */}
          </>
        ) : (
          <>
            <Button
              mode="contained"
              onPress={() => placeOrderHandler(navigation)}
              textColor={'white'}
              color={colors.primary}
              style={{paddingVertical: 5, display: showOrderButton}}
              labelStyle={{
                fontSize: fontSizes.fontXLarge,
                fontFamily: fontFamilies.InterBold,
              }}

              // loading={true}
            >
              {'' + 'Place An Order' + ''}
            </Button>
            <EmptyView style={{marginTop: dimensions.heightLevel3}} />
            <Button
              mode="contained"
              onPress={() => activeOrdersScreenHandler(navigation)}
              textColor={'white'}
              color={colors.primary}
              style={{paddingVertical: 5, display: showActiveOrderButton}}
              labelStyle={{
                fontSize: fontSizes.fontXLarge,
                fontFamily: fontFamilies.InterBold,
              }}

              // loading={true}
            >
              {'  ' + 'Active Orders' + ' '}
            </Button>
          </>
        )}

        <EmptyView style={{marginTop: dimensions.heightLevel2}} />

        <EmptyView style={{marginTop: dimensions.heightLevel1}} />

        <Button
          mode="contained"
          onPress={() =>
            Linking.openURL('https://admin.cashexs.uk/app-info/index.html')
          }
          textColor={'white'}
          color={colors.primary}
          style={{paddingVertical: 5}}
          labelStyle={{
            fontSize: fontSizes.fontXLarge,
            fontFamily: fontFamilies.InterBold,
          }}
          // loading={true}
        >
          {'        ' + 'APP INFO' + '        '}
        </Button>
        <EmptyView style={{marginTop: dimensions.heightLevel1}} />
        {/* {isMerchant ? (
          <>
            <View>
              <Text style={styles.drawerText}>For Contact:</Text>
              <Text style={styles.drawerText}>cashex.merchant@gmail.com</Text>
            </View>
          </>
        ) : (
          <>
            <View>
              <Text style={styles.drawerText}>For Contact:</Text>
              <Text style={styles.drawerText}>cashex.customer@gmail.com</Text>
            </View>
          </>
        )} */}

        <EmptyView style={{marginTop: dimensions.heightLevel2}} />
        <Button
          mode="contained"
          onPress={() => logOutHandler(navigation)}
          textColor={'white'}
          color={colors.primary}
          style={{paddingVertical: 5}}
          labelStyle={{
            fontSize: fontSizes.fontXLarge,
            fontFamily: fontFamilies.InterBold,
          }}
          // loading={true}
        >
          {'         ' + 'LOGOUT' + '         '}
        </Button>
        <EmptyView style={{marginTop: dimensions.heightLevel3}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    paddingHorizontal: dimensions.paddingLevel1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  imageContainer: {
    width: '100%',
    alignItems: 'center',
  },

  image: {
    width: dimensions.paddingLevel10 * 2.5,
    height: dimensions.paddingLevel10 * 2.5,
    resizeMode: 'cover',
  },

  logoutContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 100,
  },

  logout: {
    transform: [{scale: 0.5}],
  },
  drawerText: {
    fontFamily: fontFamilies.InterSemiBold,
    fontSize: fontSizes.fontSmall,
    marginTop: 10,
  },
});

export default DrawerComponent;
