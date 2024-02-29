import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  BackHandler,
} from 'react-native';
import {IMAGES} from '../assets/images';
import HeaderComponent from '../components/HeaderComponent';
import QrScanComponent from '../components/home/QrScanComponent';
import {ICONS} from '../assets/images';
import EmptyView from '../components/EmptyView';
import {dimensions} from '../configurations/constants';

import {useDispatch, useSelector} from 'react-redux';
import QrScanOrderComponent from '../components/home/QrScanOrderComponent';
import Loader from '../components/Loader';
import {useFocusEffect} from '@react-navigation/native';
import {
  resetUserCheckAction,
  userCheckAction,
} from '../redux/actions/authAction';

const QRScanViewOrderScreen = ({navigation}) => {
  //   const {amount} = route?.params;
  const userSave = useSelector(state => state.authState.userSave);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const findOrderDetailsLoading = useSelector(
    state => state.orderState.findOrderDetailsLoading,
  );
  const qrValidateLoading = useSelector(
    state => state.orderState.qrValidateLoading,
  );

  const userCheckLoading = useSelector(
    state => state.authState.userCheckLoading,
  );

  const userCheckSuccess = useSelector(
    state => state.authState.userCheckSuccess,
  );

  const userCheckFailed = useSelector(state => state.authState.userCheckFailed);

  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const data = {
    userEmail: userSave?.email,
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(userCheckAction(data));
    }, []),
  );

  useEffect(() => {
    if (userCheckSuccess) {
      setIsButtonVisible(
        userCheckSuccess?.result?.block === true ? true : false,
      );
      console.log(' ---bbbb ', isButtonVisible);
    }
    dispatch(resetUserCheckAction());
  }, [userCheckSuccess]);

  // function goBackScreen(navigation) {
  //   navigation.navigate('MerchantScanScreen');
  // }

  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     () => {
  //       // Handle custom back button behavior here, e.g., navigate to a specific screen.
  //       // Return true to prevent the default back button behavior (app exit).
  //       navigation.navigate('MerchantScanScreen');
  //       return true;
  //     },
  //   );

  //   return () => {
  //     // Remove the event listener when the component unmounts.
  //     backHandler.remove();
  //   };
  // }, []);

  return (
    <View>
      <HeaderComponent navigation={navigation} />

      <ScrollView>
        <Image source={IMAGES.whiteBackgroundIMG} style={styles.whiteBG} />

        <EmptyView style={{height: dimensions.heightLevel6}} />
        <View style={styles.container}>
          <EmptyView style={{height: dimensions.heightLevel2}} />
          {/* 
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
          </TouchableOpacity> */}

          {isButtonVisible ? (
            <View>
              <EmptyView style={{height: dimensions.heightLevel10}} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  textColor: 'red',
                }}>
                <Text style={{color: 'red'}}>Your Account is Blocked.!</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  textColor: 'red',
                }}>
                <Text style={{color: 'red'}}>
                  Please Contact Administrator.
                </Text>
              </View>
            </View>
          ) : (
            <QrScanOrderComponent navigation={navigation} />
          )}

          <EmptyView style={{height: dimensions.heightLevel2}} />
        </View>
      </ScrollView>
      <Loader isLoading={findOrderDetailsLoading} />
      <Loader isLoading={userCheckLoading} />
      {/* <Loader isLoading={qrValidateLoading} /> */}
    </View>
  );
};

export default QRScanViewOrderScreen;

const styles = StyleSheet.create({
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
});
