import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import EmptyView from '../../components/EmptyView';
import {
  colors,
  dimensions,
  fontFamilies,
  fontSizes,
} from '../../configurations/constants';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {Button, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  getProfileDataAction,
  resetProfileAction,
  updatePasswordAction,
  updateProfileAction,
} from '../../redux/actions/profileAction';
import {showToast} from '../../configurations/ToastConfig';
import Loader from '../Loader';
import {ROLES} from '../../utilitys/role';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  resetPinAction,
  userResetPinAction,
  userSaveAction,
} from '../../redux/actions/authAction';
import DatePicker from 'react-native-date-picker';
import {findShopAction} from '../../redux/actions/shopAction';
import {format, parse} from 'date-fns';
import {useIsFocused} from '@react-navigation/native';

const EditYourDetails = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    selectedIndex: 0,
  });

  const [password, setPassword] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [pin, setPin] = useState('');

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    shopName: '',
    openTime: '',
    closeTime: '',
    email: '',
  });

  const [open, setOpen] = useState(false);
  const [openCloseTime, setOpenCloseTime] = useState(false);
  const [openTime, setOpenTime] = useState(new Date());
  const [closeTime, setCloseTime] = useState(new Date());

  const isMerchant = useSelector(state => state.authState.isMerchant);
  const userSave = useSelector(state => state.authState.userSave);

  const isPasswordDisabled =
    password?.oldPassword === '' ||
    password?.newPassword === '' ||
    password?.confirmPassword === '';
  const isProfiledDisabled = isMerchant
    ? profile?.shopName === ''
    : profile?.firstName === '' || profile?.lastName === '';

  const isPinDisabled = pin === '';

  // ** selector
  const updatePasswordLoading = useSelector(
    state => state.profileState.updatePasswordLoading,
  );
  const updatePasswordSuccess = useSelector(
    state => state.profileState.updatePasswordSuccess,
  );
  const updatePasswordFailed = useSelector(
    state => state.profileState.updatePasswordFailed,
  );

  const updateProfileLoading = useSelector(
    state => state.profileState.updateProfileLoading,
  );
  const updateProfileSuccess = useSelector(
    state => state.profileState.updateProfileSuccess,
  );
  const updateProfileFailed = useSelector(
    state => state.profileState.updateProfileFailed,
  );

  const getProfileDataLoading = useSelector(
    state => state.profileState.getProfileDataLoading,
  );
  const getProfileDataSuccess = useSelector(
    state => state.profileState.getProfileDataSuccess,
  );
  const getProfileDataFailed = useSelector(
    state => state.profileState.getProfileDataFailed,
  );

  const userResetPinLoading = useSelector(
    state => state.authState.userResetPinLoading,
  );
  const userResetPinSuccess = useSelector(
    state => state.authState.userResetPinSuccess,
  );
  const userResetPinFailed = useSelector(
    state => state.authState.userResetPinFailed,
  );

  const findShopSuccess = useSelector(state => state.shopState.findShopSuccess);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      if (userSave.role === 'MERCHANT') {
        dispatch(findShopAction(userSave.email));
      }
    }
  }, [isFocused]);

  useEffect(() => {
    if (
      findShopSuccess?.result.openTime &&
      findShopSuccess?.result.closeTime &&
      userSave.role === 'MERCHANT'
    ) {
      const openTime = new Date(findShopSuccess?.result?.openTime);
      const closeTime = new Date(findShopSuccess?.result.closeTime);
      console.log(
        '----------MERCHANT Open Time----------------',
        findShopSuccess?.result?.openTime,
      );
      console.log('----------MERCHANT close Time----------------', closeTime);

      setOpenTime(openTime);
      setCloseTime(closeTime);
    }
  }, [findShopSuccess]);

  // ** useEffect
  useEffect(() => {
    if (userSave) {
      setProfile({
        firstName: userSave.firstName,
        lastName: userSave.lastName,
        shopName: userSave.shopName,
        openTime: userSave.openTime,
        closeTime: userSave.closeTime,
        email: userSave.email,
      });
    }
  }, []);

  useEffect(() => {
    if (updatePasswordSuccess) {
      let msg = updatePasswordSuccess?.result?.toString();
      showToast({code: 200, result: msg});
    } else if (updatePasswordFailed) {
      showToast({
        code: 500,
        result: 'something is wrong, may be old password is wrong!.',
      });
    } else if (updateProfileSuccess) {
      dispatch(getProfileDataAction(userSave?.email));

      let msg = updateProfileSuccess?.result?.toString();
      showToast({code: 200, result: msg});
    } else if (updateProfileFailed) {
      let msg = updateProfileFailed?.result?.toString();
      showToast({code: 500, result: msg});
    } else if (getProfileDataSuccess) {
      dispatch(userSaveAction(getProfileDataSuccess?.result));
    } else if (getProfileDataFailed) {
      // TODO: nothing
    }
    // 'something is wrong, Profile not Updated'

    dispatch(resetProfileAction());
  }, [
    updatePasswordSuccess,
    updatePasswordFailed,
    updateProfileSuccess,
    updateProfileFailed,
    getProfileDataSuccess,
    getProfileDataFailed,
  ]);

  useEffect(() => {
    if (userResetPinSuccess) {
      showToast({
        code: 200,
        result: 'Pin reset success!.',
      });
    } else if (userResetPinFailed) {
      showToast({
        code: 500,
        result: 'something is wrong,please try again!.',
      });
    }
    dispatch(resetPinAction());
  }, [userResetPinSuccess, userResetPinFailed]);

  const handleIndexChange = index => {
    setState({
      ...state,
      selectedIndex: index,
    });
  };

  const passwordUpdateHandler = async () => {
    if (password.newPassword !== password.oldPassword) {
      // let mail = await AsyncStorage.getItem('email');

      const data = {
        email: profile?.email,
        oldPassword: password?.oldPassword,
        newPassword: password?.newPassword,
      };

      dispatch(updatePasswordAction(data));
    } else {
      showToast({code: -1, result: 'oops, confirm password not matched!'});
    }
  };

  const pinUpdateHandler = async () => {
    const data = {
      userEmail: profile?.email,
      pin: pin,
    };

    dispatch(userResetPinAction(data));
  };

  const profileUpdateHandler = async () => {
    // let mail = await AsyncStorage.getItem('email');

    const data = {
      email: profile?.email,
      firstName: profile?.firstName ? profile?.firstName : '',
      lastName: profile?.lastName ? profile?.lastName : '',
      shopName: profile?.shopName ? profile?.shopName : '',
      openTime: profile?.openTime,
      closeTime: profile?.closeTime,
      role: isMerchant ? ROLES.MERCHANT : ROLES.USER,
    };

    dispatch(updateProfileAction(data));
  };
  // console.log('open ' + userSave.openTime);
  // console.log('close ' + userSave.closeTime);

  return (
    <View style={styles.container}>
      {/* ========EDIT DETAILS================================================= */}

      <EmptyView style={{height: 70 + dimensions.heightLevel2}} />

      <View style={styles.mainTextContainer}>
        <Text style={styles.mainText}>Update your details</Text>
      </View>

      <EmptyView style={{height: dimensions.heightLevel1}} />

      <View style={{width: dimensions.widthLevel3}}>
        <SegmentedControlTab
          // values={['GENERAL', 'PASSWORD']}
          values={['PASSWORD', 'PIN CHANGE']}
          // values={isMerchant ? ['PASSWORD'] : ['PASSWORD', 'PIN CHANGE']}
          selectedIndex={state?.selectedIndex}
          onTabPress={handleIndexChange}
          activeTabStyle={styles.activeTabContainer}
          tabStyle={styles.tabContainer}
          lastTabStyle={{borderLeftWidth: 1}}
          borderRadius={0}
          tabTextStyle={styles.tabsText}
        />
      </View>

      <View style={styles.tabBoxContainer}>
        <>
          {state.selectedIndex === 0 ? (
            <View style={{width: '100%'}}>
              {
                // isMerchant && ( // MERCHANT - true
                //   <>
                //     <EmptyView style={{height: dimensions.heightLevel1}} />
                //     {/* --------------------- */}
                //     <TextInput
                //       label="Shop name"
                //       mode="outlined"
                //       theme={styles.textInputOutlineStyle}
                //       style={{
                //         fontStyle: 'italic',
                //         fontFamily: fontFamilies.InterRegular,
                //       }}
                //       left={
                //         <TextInput.Icon
                //           name="account-outline"
                //           size={20}
                //           color={'gray'}
                //         />
                //       }
                //       onChangeText={text => {
                //         setProfile({...profile, shopName: text});
                //       }}
                //       value={profile?.shopName}
                //     />
                //     {/* shop open Time */}
                //     <View>
                //       <TextInput
                //         label="Open Time"
                //         mode="outlined"
                //         style={{
                //           fontStyle: 'italic',
                //           // Add your own styling here
                //         }}
                //         left={
                //           <TextInput.Icon name="clock" size={20} color={'gray'} />
                //         }
                //         onPressIn={() => setOpen(true)}
                //         // value={openTime.toLocaleTimeString('en-US', {
                //         //   hour: 'numeric',
                //         //   minute: 'numeric',
                //         //   hour12: true, // Display in 12-hour format with AM/PM
                //         // })}
                //         value={openTime.toLocaleTimeString('en-US', {
                //           hour: 'numeric',
                //           minute: 'numeric',
                //           hour12: true, // Display in 12-hour format with AM/PM
                //         })}
                //       />
                //       {openTime && (
                //         <DatePicker
                //           modal
                //           mode="time" // Set the mode to time
                //           is24hourSource="device" // Use 12-hour format (AM/PM)
                //           open={open}
                //           date={openTime}
                //           onConfirm={selectedTime => {
                //             setOpen(false);
                //             setOpenTime(selectedTime);
                //             const formattedTime = format(
                //               selectedTime,
                //               'yyyy-MM-dd HH:mm:ss',
                //             );
                //             setProfile({
                //               ...profile,
                //               openTime: formattedTime,
                //             });
                //             console.log(formattedTime);
                //           }}
                //           onCancel={() => {
                //             setOpen(false);
                //           }}
                //         />
                //       )}
                //     </View>
                //     {/* shop close Time */}
                //     <View>
                //       <TextInput
                //         label="Close Time"
                //         mode="outlined"
                //         style={{
                //           fontStyle: 'italic',
                //           // Add your own styling here
                //         }}
                //         left={
                //           <TextInput.Icon name="clock" size={20} color={'gray'} />
                //         }
                //         onPressIn={() => setOpenCloseTime(true)}
                //         value={closeTime.toLocaleTimeString('en-US', {
                //           hour: 'numeric',
                //           minute: 'numeric',
                //           hour12: true, // Display in 12-hour format with AM/PM
                //         })}
                //       />
                //       {openCloseTime && (
                //         <DatePicker
                //           modal
                //           mode="time" // Set the mode to time
                //           is24hourSource="device" // Use 12-hour format (AM/PM)
                //           open={openCloseTime}
                //           date={closeTime}
                //           onConfirm={selectedTime => {
                //             setOpenCloseTime(false);
                //             setCloseTime(selectedTime);
                //             const formattedTime = format(
                //               selectedTime,
                //               'yyyy-MM-dd HH:mm:ss',
                //             );
                //             setProfile({
                //               ...profile,
                //               closeTime: formattedTime,
                //             });
                //           }}
                //           onCancel={() => {
                //             setOpenCloseTime(false);
                //           }}
                //         />
                //       )}
                //     </View>
                //   </>
                // )
              }

              <>
                <EmptyView style={{height: dimensions.heightLevel1}} />
                {/* --------------------- */}
                {/* <TextInput
                  label="First name"
                  mode="outlined"
                  theme={styles.textInputOutlineStyle}
                  style={{
                    fontStyle: 'italic',
                    fontFamily: fontFamilies.InterRegular,
                  }}
                  left={
                    <TextInput.Icon
                      name="account-outline"
                      size={20}
                      color={'gray'}
                    />
                  }
                  onChangeText={text => {
                    setProfile({...profile, firstName: text});
                  }}
                  value={profile?.firstName}
                /> */}

                {/*password */}
                <TextInput
                  label="Old password"
                  mode="outlined"
                  theme={styles.textInputOutlineStyle}
                  style={{
                    fontStyle: 'italic',
                    fontFamily: fontFamilies.InterRegular,
                  }}
                  secureTextEntry
                  password={true}
                  autoCorrect={false}
                  // maxLength={6}
                  left={<TextInput.Icon name="lock" size={20} color={'gray'} />}
                  onChangeText={text => {
                    setPassword({...password, oldPassword: text});
                  }}
                  value={password?.oldPassword}
                />

                <EmptyView style={{height: dimensions.heightLevel1}} />

                <TextInput
                  label="New password"
                  mode="outlined"
                  theme={styles.textInputOutlineStyle}
                  style={{
                    fontStyle: 'italic',
                    fontFamily: fontFamilies.InterRegular,
                  }}
                  secureTextEntry
                  password={true}
                  autoCorrect={false}
                  // maxLength={6}
                  left={<TextInput.Icon name="lock" size={20} color={'gray'} />}
                  onChangeText={text => {
                    setPassword({...password, newPassword: text});
                  }}
                  value={password?.newPassword}
                />

                <EmptyView style={{height: dimensions.heightLevel1}} />

                <TextInput
                  label="Confirm password"
                  mode="outlined"
                  theme={styles.textInputOutlineStyle}
                  style={{
                    fontStyle: 'italic',
                    fontFamily: fontFamilies.InterRegular,
                  }}
                  secureTextEntry
                  password={true}
                  autoCorrect={false}
                  // maxLength={6}
                  left={<TextInput.Icon name="lock" size={20} color={'gray'} />}
                  onChangeText={text => {
                    setPassword({...password, confirmPassword: text});
                  }}
                  value={password?.confirmPassword}
                />

                <EmptyView style={{height: dimensions.heightLevel2}} />

                {/* button */}
                <Button
                  mode="contained"
                  onPress={passwordUpdateHandler}
                  textColor={'white'}
                  color={colors.primary}
                  style={{
                    paddingVertical: 1,
                    backgroundColor: isPasswordDisabled
                      ? colors.disabled
                      : colors.primary,
                  }}
                  labelStyle={{
                    fontSize: fontSizes.fontXLarge,
                    fontFamily: fontFamilies.InterBold,
                  }}
                  loading={false}
                  disabled={isPasswordDisabled}>
                  update
                </Button>

                <EmptyView style={{height: dimensions.heightLevel1}} />
                {/* 
                <TextInput
                  label="Last name"
                  mode="outlined"
                  theme={styles.textInputOutlineStyle}
                  style={{
                    fontStyle: 'italic',
                    fontFamily: fontFamilies.InterRegular,
                  }}
                  left={
                    <TextInput.Icon
                      name="account-outline"
                      size={20}
                      color={'gray'}
                    />
                  }
                  onChangeText={text => {
                    setProfile({...profile, lastName: text});
                  }}
                  value={profile?.lastName}
                /> */}

                <EmptyView style={{height: dimensions.heightLevel1}} />
              </>

              {/*<TextInput*/}
              {/*    label='Email address'*/}
              {/*    mode='outlined'*/}
              {/*    theme={styles.textInputOutlineStyle}*/}
              {/*    style={{ fontStyle: 'italic', fontFamily: fontFamilies.InterRegular }}*/}
              {/*    left={<TextInput.Icon name="email-outline" size={20} color={'gray'} />}*/}
              {/*    onChangeText={(text) => {*/}
              {/*        setProfile({...profile, lastName: text});*/}
              {/*    }}*/}
              {/*    value={profile?.lastName}*/}
              {/*/>*/}

              <EmptyView style={{height: dimensions.heightLevel1}} />

              {/* <EmptyView style={{height: dimensions.heightLevel2}} /> */}

              {/* button */}
              {/* <Button
                mode="contained"
                onPress={profileUpdateHandler}
                textColor={'white'}
                color={colors.primary}
                style={{
                  paddingVertical: 5,
                  backgroundColor: isProfiledDisabled
                    ? colors.disabled
                    : colors.primary,
                }}
                labelStyle={{
                  fontSize: fontSizes.fontXLarge,
                  fontFamily: fontFamilies.InterBold,
                }}
                loading={false}
                disabled={isProfiledDisabled}>
                update
              </Button> */}
            </View>
          ) : (
            <View style={{width: '100%'}}>
              {
                <>
                  <EmptyView style={{height: dimensions.heightLevel2}} />

                  {isMerchant ? (
                    <Text>Not available this option.!</Text>
                  ) : (
                    <>
                      {/*password */}
                      <TextInput
                        label="Enter New PIN"
                        mode="outlined"
                        theme={styles.textInputOutlineStyle}
                        style={{
                          fontStyle: 'italic',
                          fontFamily: fontFamilies.InterRegular,
                        }}
                        keyboardType="numeric"
                        secureTextEntry
                        password={true}
                        autoCorrect={false}
                        maxLength={4}
                        left={
                          <TextInput.Icon
                            name="lock"
                            size={20}
                            color={'gray'}
                          />
                        }
                        onChangeText={text => {
                          setPin(text); // Assuming the pin state is a string
                        }}
                        value={pin}
                      />

                      <EmptyView style={{height: dimensions.heightLevel2}} />

                      {/* button */}
                      <Button
                        mode="contained"
                        onPress={pinUpdateHandler}
                        textColor={'white'}
                        color={colors.primary}
                        style={{
                          paddingVertical: 1,
                          backgroundColor: isPinDisabled
                            ? colors.disabled
                            : colors.primary,
                        }}
                        labelStyle={{
                          fontSize: fontSizes.fontXLarge,
                          fontFamily: fontFamilies.InterBold,
                        }}
                        disabled={isPinDisabled}
                        loading={false}>
                        update
                      </Button>
                    </>
                  )}
                </>
              }
            </View>
          )}
        </>
      </View>

      <Loader
        isLoading={
          updatePasswordLoading || updateProfileLoading || userResetPinLoading
        }
      />
    </View>
  );
};

export default EditYourDetails;

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
    height: dimensions.fullHeight,
    paddingHorizontal: dimensions.paddingLevel3 * 1.2,
    alignItems: 'center',
  },

  whiteBG: {
    flex: 1,
    position: 'absolute',
    zIndex: -1,
  },

  mainTextContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
  },

  mainText: {
    width: '60%',
    fontFamily: fontFamilies.InterBold,
    fontSize: fontSizes.fontXXXLarge,
    color: colors.primary,
  },

  priceText: {
    //  width: '64%',
    color: colors.primary,
    textAlign: 'right',
    fontFamily: fontFamilies.InterBold,
    fontSize: fontSizes.fontXXXLarge,
  },

  curText: {
    color: colors.primary,
    textAlign: 'right',
    fontFamily: fontFamilies.InterMedium,
    fontSize: fontSizes.fontLarge,
    paddingBottom: 3,
  },

  curContainer: {
    width: '64%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderWidth: 1,
    borderColor: colors.primary,
    padding: dimensions.paddingLevel1,
    paddingTop: dimensions.paddingLevel3,
    justifyContent: 'flex-end',
  },

  mainImage: {
    width: dimensions.widthLevel9,
    height: dimensions.widthLevel9,
    resizeMode: 'cover',
  },

  activeTabContainer: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderBottomColor: colors.transparent,
  },

  tabContainer: {
    borderBottomColor: colors.primary,
    borderColor: colors.transparent,
    backgroundColor: colors.transparent,
  },

  tabsText: {
    fontFamily: fontFamilies.InterSemiBold,
    fontSize: fontSizes.fontMedium,
    color: colors.black,
  },

  tabBoxContainer: {
    paddingHorizontal: dimensions.paddingLevel2,
    paddingVertical: dimensions.paddingLevel4,
    width: dimensions.widthLevel3,
    borderColor: colors.primary,
    borderWidth: 1,
    borderTopColor: colors.transparent,
  },
});
