import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';
import DrawerComponent from '../components/DrawerComponent';
import {colors} from '../configurations/constants';
import {
  StackNavigation,
  PlaceOrderNavigation,
  ActiveOrderNavigation,
  StoreNavigation,
  ViewOrderNavigation,
  StoreActiveOrderNavigation,
} from './StackNavigation';
import TabNavigation from './TabNavigation';
// import {
//   LogBox,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   useColorScheme,
//   Text,
//   Button,
//   View,
//   AppState,
// } from 'react-native';
// import RNScreenshotPrevent, {
//   addListener,
// } from 'react-native-screenshot-prevent';

const DrawerNavigator = () => {
  const token = useSelector(state => state.authState.token);
  const isExpired = useSelector(state => state.authState.sessionExpired);

  const Drawer = createDrawerNavigator();

  // // Enable or disable screenshot prevention
  // RNScreenshotPrevent.enabled(true); // To enable

  // // RNScreenshotPrevent.enabled(false); // To disable

  // // (iOS) Enable secure view for iOS 13+
  // if (!__DEV__) RNScreenshotPrevent.enableSecureView();

  // // (iOS) Disable secure view for iOS 13+
  // if (!__DEV__) RNScreenshotPrevent.disableSecureView();

  // useEffect(() => {
  //   const subscription = addListener(() => {
  //     console.log('Screenshot taken');
  //     // Perform actions when a screenshot is detected
  //     showAlert({
  //       title: 'Warning',
  //       message:
  //         'You have taken a screenshot of the app. This is prohibited due to security reasons.',
  //       confirmText: 'I understand',
  //     });
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  console.log('\nTOKEN: ', token);
  console.log('isExpired: ', isExpired);

  const [value, setValue] = useState('stackNavigation');

  useEffect(() => {
    if (token === null) {
      setValue('stackNavigation');
    } else if (isExpired !== null) {
      setValue('stackNavigation');
    } else if (token) {
      setValue('tabNavigation');
    }
  }, [isExpired, token]);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        swipeEdgeWidth: 0,
        drawerStyle: {
          backgroundColor: colors.transparent,
        },
      }}
      initialRouteName={value}
      drawerContent={props => <DrawerComponent navigation={props.navigation} />}
      edgeWidth={0}
      drawerStyle={{backgroundColor: 'transparent'}}>
      {!token && (
        <Drawer.Screen name="stackNavigation" component={StackNavigation} />
      )}
      {token && isExpired !== null && (
        <Drawer.Screen name="stackNavigation" component={StackNavigation} />
      )}
      {token && (
        <Drawer.Screen name="tabNavigation" component={TabNavigation} />
      )}

      {token && (
        <Drawer.Screen
          name="SelectStoreScreen"
          component={PlaceOrderNavigation}
        />
      )}

      {token && (
        <Drawer.Screen
          name="ActiveOrdersScreen"
          component={ActiveOrderNavigation}
        />
      )}

      {token && (
        <Drawer.Screen
          name="SelectItemTypeScreen"
          component={StoreNavigation}
        />
      )}

      {token && (
        <Drawer.Screen name="ViewOrderScreen" component={ViewOrderNavigation} />
      )}

      {token && (
        <Drawer.Screen
          name="StoreActiveOrdersScreen"
          component={StoreActiveOrderNavigation}
        />
      )}

      {/* Place order screen drawer navigate */}
      {/* {token && (
        <Drawer.Screen name="SelectStoreScreen" component={SelectStoreScreen} />
      )} */}
      {/* {token && (
        <Drawer.Screen name="SelectTypeScreen" component={SelectTypeScreen} />
      )} */}
      {/* {token && (
        <Drawer.Screen name="SelectItemScreen" component={SelectItemScreen} />
      )} */}
      {/* {token && (
        <Drawer.Screen name="AddToCartScreen" component={AddToCartScreen} />
      )} */}
      {/* {token && (
        <Drawer.Screen name="CartDetailsScreen" component={CartDetailsScreen} />
      )} */}

      {/* {token && <Drawer.Screen name="StoreScreen" component={StoreScreen} />}

      {token && (
        <Drawer.Screen
          name="StoreAddItemScreen"
          component={StoreAddItemScreen}
        />
      )}

      {token && (
        <Drawer.Screen
          name="ActiveOrdersScreen"
          component={ActiveOrdersScreen}
        />
      )}
      {token && (
        <Drawer.Screen name="OrderDetailScreen" component={OrderDetailScreen} />
      )}

      {token && (
        <Drawer.Screen name="ViewOrderScreen" component={ViewOrderScreen} />
      )}
      {token && (
        <Drawer.Screen
          name="QRScanViewOrderScreen"
          component={QRScanViewOrderScreen}
        />
      )}
      {token && (
        <Drawer.Screen
          name="OrderPaymentRequestScreen"
          component={OrderPaymentRequestScreen}
        />
      )} */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
