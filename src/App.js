import React, {useState, useEffect} from 'react';
import {
  LogBox,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Text,
  Button,
  View,
} from 'react-native';
// ** redux
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
// ** Import constant
import {basicStyles, colors} from './configurations/constants';
import {persistor, store} from './redux/store/index';
import SplashScreen from 'react-native-splash-screen';
import {Provider as PaperProvider} from 'react-native-paper';

// ** react navigation
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigation from './navigations/DrawerNavigation';
import PaymentRequestPopUp from './components/PaymentRequestPopUp';
import FcmConfig, {getDeviceFcmToken} from './configurations/FcmConfig';
import Toast from 'react-native-toast-message';
// // ** The new version, of react-native-gesture-handler send warning if you use an old API version, but also if one of your package/library use it.
// LogBox.ignoreLogs([
//   "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
// ]);

const App = () => {
  // ** [Warning]: useDispatch() can't be use in this component/ Wrapper("Provider") issue

  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    // ** SplashScreen
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView
      style={[basicStyles.miniFlexWrapper, {backgroundColor: colors.white}]}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />

            {/*=================================================*/}
            {/*      /!* Root Navigation *!/*/}
            {/*=================================================*/}
            {/* <SelectStoreScreen /> */}
            {/* <SelectTypeScreen /> */}
            {/* <SelectItemScreen /> */}
            {/* <AddToCartScreen /> */}
            {/* <CartDetailsScreen /> */}

            {/* <SelectItemTypeScreen /> */}
            {/* <AddItemTypeScreen /> */}

            <NavigationContainer>
              <FcmConfig />
              <PaymentRequestPopUp />
              {/* <OrderPaymentPopUp /> */}
              <DrawerNavigation />
            </NavigationContainer>

            {/*=================================================*/}

            {/* <StartedScreen /> */}
            {/* <LandingRegisterScreen /> */}
            {/* <SignInScreen /> */}
            {/* <SignUpScreen /> */}
          </PaperProvider>
        </PersistGate>
      </Provider>
      <Toast />
    </SafeAreaView>
  );
};

export default App;
