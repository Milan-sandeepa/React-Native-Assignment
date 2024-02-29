import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, fontFamilies, fontSizes} from '../configurations/constants';

import {ICONS} from '../assets/images';

import DepositTabScreen from '../screens/DepositTabScreen';
import ExpensesTabScreen from '../screens/ExpensesTabScreen';
import IncomeTabScreen from '../screens/IncomeTabScreen';
import ProfileTabScreen from '../screens/ProfileTabScreen';
import WalletTabScreen from '../screens/WalletTabScreen';
import WithdrawTabScreen from '../screens/WithdrawTabScreen';
import StudentWalletTabScreen from '../screens/StudentWalletTabScreen';
import QRCodeTabScreen from '../screens/QRCodeTabScreen';

import {CustomHomeNavigation, HomeNavigation} from './StackNavigation';
import {useSelector} from 'react-redux';

import SelectStoreScreen from '../screens/SelectStoreScreen';
import QRScanViewOrderScreen from '../screens/QRScanViewOrderScreen';
import {
  activateKeepAwake,
  deactivateKeepAwake,
} from '@sayem314/react-native-keep-awake';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const isMerchant = useSelector(state => state.authState.isMerchant);

  useEffect(() => {
    // Activate screen keep awake if isMerchant is true
    if (isMerchant) {
      console.log('KeepAwake activated Now');
      activateKeepAwake();
    }

    // Deactivate screen keep awake when the component unmounts or isMerchant becomes false
    return () => {
      console.log('KeepAwake not activate ');
      deactivateKeepAwake();
    };
  }, [isMerchant]);

  return (
    <Tab.Navigator
      // initialRouteName={isMerchant ? 'QRScanViewOrderScreen' : 'HomeTab'}
      initialRouteName={'HomeTab'}
      screenOptions={({route}) => ({
        headerShown: false,
      })}
      tabBar={props => <MyTabBar {...props} />}>
      {/*
    1.student
    2.mechant
*/}

      {!isMerchant && (
        <Tab.Screen
          name="StudentWalletTab"
          component={StudentWalletTabScreen}
        />
      )}
      {isMerchant && (
        <Tab.Screen name="WalletTab" component={WalletTabScreen} />
      )}

      {!isMerchant && (
        <Tab.Screen name="ExpensesTab" component={ExpensesTabScreen} />
      )}
      {isMerchant && (
        <Tab.Screen name="IncomeTab" component={IncomeTabScreen} />
      )}

      {!isMerchant && <Tab.Screen name="HomeTab" component={QRCodeTabScreen} />}
      {/* {isMerchant && <Tab.Screen name="HomeTab" component={HomeNavigation} />} */}
      {isMerchant && (
        <Tab.Screen name="HomeTab" component={CustomHomeNavigation} />
      )}
      {/* {isMerchant && (
        <Tab.Screen
          name="QRScanViewOrderScreen"
          component={QRScanViewOrderScreen}
        />
      )} */}

      {!isMerchant && (
        <Tab.Screen name="DepositTab" component={DepositTabScreen} />
      )}

      {isMerchant && (
        <Tab.Screen name="WithdrawTab" component={WithdrawTabScreen} />
      )}

      <Tab.Screen name="ProfileTab" component={ProfileTabScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const MyTabBar = ({state, descriptors, navigation}) => {
  const COLORS = {
    white: '#fff',
  };

  const isMerchant = useSelector(state => state.authState.isMerchant);

  return (
    <View
      style={{
        height: 70,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
      }}>
      {state?.routes.map((route, index) => {
        const isFocused = state.index === index;
        const {options} = descriptors[route.key];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View key={index}>
            {isMerchant ? (
              // merchant
              <TouchableOpacity
                onPress={() => onPress()}
                testID={options.tabBarTestID}
                accessibilityRole="button"
                key={index}>
                {index === 0 && (
                  <View style={styles.icon}>
                    {isFocused ? (
                      <Image source={ICONS.walletICN} style={styles.tabIcon} />
                    ) : (
                      <Image source={ICONS.walletICN} style={styles.tabIcon} />
                    )}
                    <Text style={!isFocused ? styles.tabText : styles.tabText2}>
                      Wallet
                    </Text>
                  </View>
                )}
                {/* <Image source={ICONS.homeICN} /> */}
                {index === 1 && (
                  <View style={styles.icon}>
                    {isFocused ? (
                      <Image
                        source={ICONS.incomeHistoryICN}
                        style={styles.tabIcon}
                      />
                    ) : (
                      <Image
                        source={ICONS.incomeHistoryICN}
                        style={styles.tabIcon}
                      />
                    )}
                    <Text style={!isFocused ? styles.tabText : styles.tabText2}>
                      Income
                    </Text>
                  </View>
                )}

                {index === 2 && (
                  <View>
                    <View style={styles.middleIcon2}>
                      <View style={styles.middleIcon}>
                        {isFocused ? (
                          <Image
                            source={ICONS.homeICN}
                            style={styles.tabIcon}
                          />
                        ) : (
                          <Image
                            source={ICONS.homeICN}
                            style={styles.tabIcon}
                          />
                        )}
                      </View>
                    </View>
                    <Text
                      style={[
                        !isFocused ? styles.tabText : styles.tabText2,
                        {bottom: 23, textAlign: 'center'},
                      ]}>
                      Home
                    </Text>
                  </View>
                )}

                {index === 3 && (
                  <View style={styles.icon}>
                    {isFocused ? (
                      <Image
                        source={ICONS.withdrawHistoryICN}
                        style={styles.tabIcon}
                      />
                    ) : (
                      <Image
                        source={ICONS.withdrawHistoryICN}
                        style={styles.tabIcon}
                      />
                    )}
                    <Text style={!isFocused ? styles.tabText : styles.tabText2}>
                      Withdraw
                    </Text>
                  </View>
                )}

                {index === 4 && (
                  <View style={styles.icon}>
                    {isFocused ? (
                      <Image source={ICONS.profileICN} style={styles.tabIcon} />
                    ) : (
                      <Image source={ICONS.profileICN} style={styles.tabIcon} />
                    )}
                    <Text style={!isFocused ? styles.tabText : styles.tabText2}>
                      Profile
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => onPress()}
                testID={options.tabBarTestID}
                accessibilityRole="button"
                key={index}>
                {index === 0 && (
                  <View style={styles.icon}>
                    {isFocused ? (
                      <Image source={ICONS.walletICN} style={styles.tabIcon} />
                    ) : (
                      <Image source={ICONS.walletICN} style={styles.tabIcon} />
                    )}
                    <Text style={!isFocused ? styles.tabText : styles.tabText2}>
                      Wallet
                    </Text>
                  </View>
                )}
                {/* <Image source={ICONS.homeICN} /> */}
                {index === 1 && (
                  <View style={styles.icon}>
                    {isFocused ? (
                      <Image
                        source={ICONS.expensesICN}
                        style={styles.tabIcon}
                      />
                    ) : (
                      <Image
                        source={ICONS.expensesICN}
                        style={styles.tabIcon}
                      />
                    )}
                    <Text style={!isFocused ? styles.tabText : styles.tabText2}>
                      Expenses
                    </Text>
                  </View>
                )}

                {index === 2 && (
                  <View>
                    <View style={styles.middleIcon2}>
                      <View style={styles.middleIcon}>
                        {isFocused ? (
                          <Image
                            source={ICONS.homeICN}
                            style={styles.tabIcon}
                          />
                        ) : (
                          <Image
                            source={ICONS.homeICN}
                            style={styles.tabIcon}
                          />
                        )}
                      </View>
                    </View>
                    <Text
                      style={[
                        !isFocused ? styles.tabText : styles.tabText2,
                        {bottom: 23, textAlign: 'center'},
                      ]}>
                      Home
                    </Text>
                  </View>
                )}

                {index === 3 && (
                  <View style={styles.icon}>
                    {isFocused ? (
                      <Image
                        source={ICONS.expensesICN}
                        style={styles.tabIcon}
                      />
                    ) : (
                      <Image
                        source={ICONS.expensesICN}
                        style={styles.tabIcon}
                      />
                    )}
                    <Text style={!isFocused ? styles.tabText : styles.tabText2}>
                      Deposit
                    </Text>
                  </View>
                )}

                {index === 4 && (
                  <View style={styles.icon}>
                    {isFocused ? (
                      <Image source={ICONS.profileICN} style={styles.tabIcon} />
                    ) : (
                      <Image source={ICONS.profileICN} style={styles.tabIcon} />
                    )}
                    <Text style={!isFocused ? styles.tabText : styles.tabText2}>
                      Profile
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabText: {
    color: '#FFF',
    fontFamily: fontFamilies.InterLight,
    fontSize: fontSizes.fontSmall * 0.9,
  },

  tabText2: {
    color: '#FFF',
    fontFamily: fontFamilies.InterMedium,
    fontSize: fontSizes.fontSmall * 0.9,
    // borderBottomColor: '#fff',
    // borderBottomWidth: 1,
    // paddingBottom: 3
  },

  tabIcon: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
  },

  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  middleIcon: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleIcon2: {
    width: 70,
    height: 70,
    bottom: 30,
    padding: 5,
    borderRadius: 50,
    backgroundColor: 'white', //
    justifyContent: 'center',
    alignItems: 'center',
  },
});
