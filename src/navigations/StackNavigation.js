// ** Import Core
// ** React Navigation v6
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import LandingRegisterScreen from '../screens/LandingRegisterScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import StartedScreen from '../screens/StartedScreen';
import PaymentSuccessScreen from '../screens/PaymentSuccessScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import CreatePasswordScreen from '../screens/CreatePasswordScreen';
import VerifyScreen from '../screens/VerifyScreen';

import MerchantScanScreen from '../screens/MerchantScanScreen';
import QRScanScreen from '../screens/QRScanScreen';
import MerchantCongrateScreen from '../screens/MerchantCongrateScreen';

import SelectStoreScreen from '../screens/SelectStoreScreen';
import SelectTypeScreen from '../screens/SelectTypeScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SelectItemScreen from '../screens/SelectItemScreen';
import AddToCartScreen from '../screens/AddToCartScreen';
import CartDetailsScreen from '../screens/CartDetailsScreen';
import ActiveOrdersScreen from '../screens/ActiveOrdersScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import PickUpOrderScreen from '../screens/PickUpOrderScreen';
import StoreScreen from '../screens/StoreScreen';
import StoreAddItemScreen from '../screens/StoreAddItemScreen';
import ViewOrderScreen from '../screens/ViewOrderScreen';
import QRScanViewOrderScreen from '../screens/QRScanViewOrderScreen';
import OrderPaymentRequestScreen from '../screens/OrderPaymentRequestScreen';
import OrderPaymentCongrateScreen from '../screens/OrderPaymentCongrateScreen';
import StoreActiveOrdersScreen from '../screens/StoreActiveOrdersScreen';
import StoreOrderDetailScreen from '../screens/StoreOrderDetailScreen';
import CustomOrderPaymentRequestScreen from '../screens/CustomOrderPaymentRequestScreen';
import QRCodeTabScreen from '../screens/QRCodeTabScreen';
import StudentCustomPayment from '../screens/StudentCustomPayment';
import SelectItemTypeScreen from '../screens/SelectItemTypeScreen';
import AddItemTypeScreen from '../screens/AddItemTypeScreen';
import StationaryStoreScreen from '../screens/StationaryStoreScreen';
import StationaryAddItemScreen from '../screens/StationaryAddItemScreen';
import SelectItemTypeCustomerScreen from '../screens/SelectItemTypeCustomerScreen';
import SelectStationaryItemScreen from '../screens/SelectStationaryItemScreen';
import StationaryCartDetailsScreen from '../screens/StationaryCartDetailsScreen';

const Stack = createNativeStackNavigator();
const Home = createNativeStackNavigator();
const PlaceOrder = createNativeStackNavigator();
const ActiveOrder = createNativeStackNavigator();
const Store = createNativeStackNavigator();
const ViewOrder = createNativeStackNavigator();
const StoreActiveOrder = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="StartedScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="StartedScreen" component={StartedScreen} />
      <Stack.Screen
        name="LandingRegisterScreen"
        component={LandingRegisterScreen}
      />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen
        name="PaymentSuccessScreen"
        component={PaymentSuccessScreen}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name="CreatePasswordScreen"
        component={CreatePasswordScreen}
      />
      <Stack.Screen name="VerifyScreen" component={VerifyScreen} />
    </Stack.Navigator>
  );
};

// const HomeNavigation = () => {
//   return (
//     <Home.Navigator
//       initialRouteName="MerchantScanScreen"
//       screenOptions={{headerShown: false}}>
//       <Home.Screen name="MerchantScanScreen" component={MerchantScanScreen} />
//       <Home.Screen name="QRScanScreen" component={QRScanScreen} />
//       <Home.Screen
//         name="MerchantCongrateScreen"
//         component={MerchantCongrateScreen}
//       />
//       <Home.Screen
//         name="QRScanViewOrderScreen"
//         component={QRScanViewOrderScreen}
//       />

//       <Home.Screen
//         name="OrderPaymentRequestScreen"
//         component={OrderPaymentRequestScreen}
//       />
//       <Home.Screen
//         name="OrderPaymentCongrateScreen"
//         component={OrderPaymentCongrateScreen}
//       />

//       <Home.Screen
//         name="CustomOrderPaymentRequestScreen"
//         component={CustomOrderPaymentRequestScreen}
//       />
//     </Home.Navigator>
//   );
// };

const CustomHomeNavigation = () => {
  return (
    <Home.Navigator
      initialRouteName="QRScanViewOrderScreen"
      screenOptions={{headerShown: false}}>
      <Home.Screen
        name="QRScanViewOrderScreen"
        component={QRScanViewOrderScreen}
      />
      <Home.Screen name="QRScanScreen" component={QRScanScreen} />
      <Home.Screen
        name="MerchantCongrateScreen"
        component={MerchantCongrateScreen}
      />

      <Home.Screen
        name="OrderPaymentRequestScreen"
        component={OrderPaymentRequestScreen}
      />
      <Home.Screen
        name="OrderPaymentCongrateScreen"
        component={OrderPaymentCongrateScreen}
      />

      <Home.Screen
        name="CustomOrderPaymentRequestScreen"
        component={CustomOrderPaymentRequestScreen}
      />

      <Home.Screen
        name="StudentCustomPayment"
        component={StudentCustomPayment}
      />
    </Home.Navigator>
  );
};

const PlaceOrderNavigation = () => {
  return (
    <PlaceOrder.Navigator
      initialRouteName="SelectStoreScreen"
      screenOptions={{headerShown: false}}>
      <PlaceOrder.Screen
        name="SelectStoreScreens"
        component={SelectStoreScreen}
      />
      <PlaceOrder.Screen name="SelectTypeScreen" component={SelectTypeScreen} />
      <PlaceOrder.Screen
        name="PickUpOrderScreen"
        component={PickUpOrderScreen}
      />
      <PlaceOrder.Screen name="SelectItemScreen" component={SelectItemScreen} />
      <PlaceOrder.Screen name="AddToCartScreen" component={AddToCartScreen} />
      <PlaceOrder.Screen
        name="StationaryCartDetailsScreen"
        component={StationaryCartDetailsScreen}
      />
      <PlaceOrder.Screen
        name="SelectStationaryItemScreen"
        component={SelectStationaryItemScreen}
      />
      <PlaceOrder.Screen
        name="SelectItemTypeCustomerScreen"
        component={SelectItemTypeCustomerScreen}
      />
      <PlaceOrder.Screen
        name="CartDetailsScreen"
        component={CartDetailsScreen}
      />
      {/* <PlaceOrder.Screen
        name="ActiveOrdersScreen"
        component={ActiveOrdersScreen}
      />
      <PlaceOrder.Screen
        name="OrderDetailScreen"
        component={OrderDetailScreen}
      /> */}
    </PlaceOrder.Navigator>
  );
};

const ActiveOrderNavigation = () => {
  return (
    <ActiveOrder.Navigator
      initialRouteName="ActiveOrdersScreen"
      screenOptions={{headerShown: false}}>
      <ActiveOrder.Screen
        name="ActiveOrdersScreens"
        component={ActiveOrdersScreen}
      />
      <ActiveOrder.Screen
        name="OrderDetailScreen"
        component={OrderDetailScreen}
      />
    </ActiveOrder.Navigator>
  );
};

const StoreNavigation = () => {
  return (
    <Store.Navigator
      initialRouteName="SelectItemTypeScreen"
      screenOptions={{headerShown: false}}>
      <Store.Screen
        name="SelectItemTypeScreens"
        component={SelectItemTypeScreen}
      />
      <Store.Screen name="StoreScreen" component={StoreScreen} />
      <Store.Screen
        name="StationaryStoreScreen"
        component={StationaryStoreScreen}
      />
      <Store.Screen name="StoreAddItemScreen" component={StoreAddItemScreen} />
      <Store.Screen
        name="StationaryAddItemScreen"
        component={StationaryAddItemScreen}
      />
      <Store.Screen name="AddItemTypeScreen" component={AddItemTypeScreen} />
    </Store.Navigator>
  );
};

const ViewOrderNavigation = () => {
  return (
    <ViewOrder.Navigator
      initialRouteName="ViewOrderScreen"
      screenOptions={{headerShown: false}}>
      <ViewOrder.Screen name="ViewOrderScreens" component={ViewOrderScreen} />
      {/* <ViewOrder.Screen
        name="QRScanViewOrderScreen"
        component={QRScanViewOrderScreen}
      /> */}
      <ViewOrder.Screen
        name="OrderPaymentRequestScreen"
        component={OrderPaymentRequestScreen}
      />
      <ViewOrder.Screen
        name="OrderPaymentCongrateScreen"
        component={OrderPaymentCongrateScreen}
      />
    </ViewOrder.Navigator>
  );
};

const StoreActiveOrderNavigation = () => {
  return (
    <ActiveOrder.Navigator
      initialRouteName="StoreActiveOrdersScreen"
      screenOptions={{headerShown: false}}>
      <ActiveOrder.Screen
        name="StoreActiveOrdersScreens"
        component={StoreActiveOrdersScreen}
      />
      <ActiveOrder.Screen
        name="StoreOrderDetailScreen"
        component={StoreOrderDetailScreen}
      />
    </ActiveOrder.Navigator>
  );
};

export {
  StackNavigation,
  ActiveOrderNavigation,
  PlaceOrderNavigation,
  StoreNavigation,
  ViewOrderNavigation,
  StoreActiveOrderNavigation,
  CustomHomeNavigation,
};
