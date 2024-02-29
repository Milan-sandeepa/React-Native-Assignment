import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {IMAGES} from '../assets/images';
import EmptyView from '../components/EmptyView';
import HeaderComponent from '../components/HeaderComponent';
import {
  colors,
  dimensions,
  fontFamilies,
  fontSizes,
} from '../configurations/constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  getRefreshCoinsAction,
  resetPaymentAction,
  withdrawCoinsAction,
} from '../redux/actions/paymentAction';
import {showToast} from '../configurations/ToastConfig';
import {numbersOnly} from '../utilitys/feildValidations';
import Loader from '../components/Loader';
import {merchantWithdrawAction} from '../redux/actions/reportAction';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
import {
  resetUserCheckAction,
  userCheckAction,
} from '../redux/actions/authAction';
import {tr} from 'date-fns/locale';

const WalletTabScreen = ({navigation}) => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const userSave = useSelector(state => state.authState.userSave);
  const getRefreshCoinSuccess = useSelector(
    state => state.paymentState.getRefreshCoinSuccess,
  );

  const withdrawCoinsLoading = useSelector(
    state => state.paymentState.withdrawCoinsLoading,
  );
  const withdrawCoinsSuccess = useSelector(
    state => state.paymentState.withdrawCoinsSuccess,
  );
  const withdrawCoinsFailed = useSelector(
    state => state.paymentState.withdrawCoinsFailed,
  );

  const userCheckLoading = useSelector(
    state => state.authState.userCheckLoading,
  );

  const userCheckSuccess = useSelector(
    state => state.authState.userCheckSuccess,
  );

  const userCheckFailed = useSelector(state => state.authState.userCheckFailed);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    if (withdrawCoinsSuccess) {
      let msg = withdrawCoinsSuccess?.result?.toString();
      showToast({code: 200, result: msg});
      setValue('');

      userSave && dispatch(getRefreshCoinsAction(userSave?.email));

      // ** withdraw history table update
      let end = moment(new Date()).format();
      let start = moment(new Date()).add(-7, 'day').format();
      getTableDataHandler(start, end, 0);
    } else if (withdrawCoinsFailed) {
      let msg = withdrawCoinsFailed?.result?.toString();
      showToast({code: 500, result: msg});
    }

    dispatch(resetPaymentAction());
  }, [withdrawCoinsSuccess, withdrawCoinsFailed]);

  const withdrawHandler = () => {
    if (numbersOnly(value)) {
      let data = {
        email: userSave.email,
        withdrawAmount: Number(value),
      };

      dispatch(withdrawCoinsAction(data));
    } else {
      alert('Invalid input detected. Please try again.');
    }
  };

  const getTableDataHandler = (str, end, number) => {
    let data = {
      email: userSave?.email,
      startDate: str,
      endDate: end,
      pageNumber: number,
      pageSize: 5,
    };
    console.log('DATA: ', data);
    dispatch(merchantWithdrawAction(data));
  };

  var isBlocked = '';

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

  return (
    <KeyboardAvoidingView>
      <HeaderComponent navigation={navigation} />

      <ScrollView>
        <Image source={IMAGES.whiteBackgroundIMG} style={styles.whiteBG} />

        <View style={styles.container}>
          <EmptyView style={{height: 70 + dimensions.heightLevel2}} />

          <View style={styles.mainTextContainer}>
            <Text style={styles.mainText}>Wallet balance</Text>
            <View style={styles.curContainer}>
              <Text style={styles.curText}>RS </Text>
              <Text style={styles.priceText}>
                {getRefreshCoinSuccess && getRefreshCoinSuccess?.result}
              </Text>
            </View>
          </View>

          <EmptyView style={{height: dimensions.heightLevel3}} />

          <Image source={IMAGES.atmIMG} style={styles.mainImage} />

          <EmptyView style={{height: dimensions.heightLevel2}} />

          <View style={{width: '100%'}}>
            <TextInput
              label="Withdraw amount (RS)" // Student full name
              mode="outlined"
              theme={styles.textInputOutlineStyle}
              style={{
                fontStyle: 'italic',
                fontFamily: fontFamilies.InterRegular,
              }}
              onChangeText={text => {
                setValue(text);
              }}
              keyboardType="number-pad"
              value={value}
            />

            <EmptyView style={{height: dimensions.heightLevel2}} />

            {isButtonVisible ? (
              <View>
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
              <Button
                mode="contained"
                onPress={withdrawHandler}
                textColor={'white'}
                color={colors.primary}
                style={{
                  paddingVertical: 5,
                  backgroundColor:
                    value === '' ? colors.disabled : colors.primary,
                }}
                labelStyle={{
                  fontSize: fontSizes.fontXLarge,
                  fontFamily: fontFamilies.InterBold,
                }}
                loading={false}
                disabled={value === ''}>
                Withdraw
              </Button>
            )}
          </View>

          <Loader isLoading={withdrawCoinsLoading} />
          <Loader isLoading={userCheckLoading} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default WalletTabScreen;

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
    width: '40%',
    fontFamily: fontFamilies.InterBold,
    fontSize: fontSizes.fontXXXLarge,
    color: colors.primary,
  },

  priceText: {
    //  width: '64%',
    color: colors.primary,
    textAlign: 'right',
    fontFamily: fontFamilies.InterSemiBold,
    fontSize: fontSizes.fontXXLarge,
  },

  curText: {
    color: colors.primary,
    textAlign: 'right',
    fontFamily: fontFamilies.InterRegular,
    fontSize: fontSizes.fontSmallPlus,
    paddingBottom: 2.5,
  },

  curContainer: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: dimensions.paddingLevel1,
    paddingTop: dimensions.paddingLevel3,
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
    backgroundColor: colors.white,
    marginBottom: dimensions.paddingLevel1,
  },

  mainImage: {
    width: dimensions.widthLevel9,
    height: dimensions.widthLevel9,
    resizeMode: 'cover',
  },
});
