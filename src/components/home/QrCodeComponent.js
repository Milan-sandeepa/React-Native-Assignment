import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import EmptyView from '../../components/EmptyView';
import {
  colors,
  dimensions,
  fontFamilies,
  fontSizes,
} from '../../configurations/constants';
import {currencyFormat} from '../../utilitys/currency';
import QRCode from 'react-native-qrcode-svg';
import {IMAGES} from '../../assets/images';
import {useDispatch, useSelector} from 'react-redux';
import {
  getMerchantCoinsRequestAction,
  getRefreshCoinsAction,
} from '../../redux/actions/paymentAction';
import {red300} from 'react-native-paper/lib/typescript/styles/colors';
import {useFocusEffect} from '@react-navigation/native';
import PaymentRequestPopUp from '../PaymentRequestPopUp';
import {merchantCoinRequestActionTypes} from '../../redux/types';
import {qrStatusUpdateAction} from '../../redux/actions/orderAction';
import AwesomeAlert from 'react-native-awesome-alerts';
import {
  resetUserCheckAction,
  userCheckAction,
} from '../../redux/actions/authAction';
import Loader from '../Loader';

const QrCodeComponent = ({navigation}) => {
  const dispatch = useDispatch();

  const userSave = useSelector(state => state.authState.userSave);
  const getRefreshCoinSuccess = useSelector(
    state => state.paymentState.getRefreshCoinSuccess,
  );

  const [qrValue, setQrValue] = useState(userSave?.email);

  const merchantCoinTransferSuccess = useSelector(
    state => state.paymentState.merchantCoinTransferSuccess,
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

  useEffect(() => {
    if (merchantCoinTransferSuccess) {
      dispatch(getRefreshCoinsAction(userSave?.email));
    }
  }, [merchantCoinTransferSuccess]);

  const [svg, setSvg] = useState(undefined);

  // useEffect(() => {
  //   userSave && dispatch(getRefreshCoinsAction(userSave?.email));
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      // //Requesting Start part
      const proccess = setInterval(() => {
        console.log('Request Sent User ' + userSave?.email);
        dispatch(getMerchantCoinsRequestAction(userSave?.email));

        //Requesting Stop condition
        // if (merchantCoinRequestSuccess) {
        //   console.log('merchantCoinRequestSuccess');
        //   clearInterval(proccess);
        // }

        // clearInterval(proccess);
      }, 2000);

      //Screen move Requesting Stop part
      return () => {
        console.log('Request Stopped');
        clearInterval(proccess);
      };
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      // //Requesting Start part
      const proccess = setInterval(() => {
        console.log('User Qr Code updated ' + userSave?.email);
        const randomValue = Math.floor(Math.random() * 1000000).toString();
        const combinedValue = `${userSave?.email || ''}-${randomValue}`;
        setQrValue(combinedValue);
        console.log('User Qr value' + combinedValue);
        console.log('Qr value' + qrValue);

        const data = {
          email: userSave?.email,
          id: randomValue,
        };

        dispatch(qrStatusUpdateAction(data));
      }, 20000);

      //Screen move Requesting Stop part
      return () => {
        console.log('Qr Code updated Request Stopped');
        clearInterval(proccess);
      };
    }, []),
  );

  const getDataURL = () => {
    svg && svg.toDataURL(callback);
  };

  const callback = dataURL => {
    console.log(dataURL);
  };

  return (
    <View style={styles.container}>
      <EmptyView style={{height: dimensions.heightLevel2}} />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View></View>
        <View style={styles.priceContainer}>
          <Text style={styles.curText}>RS </Text>
          <Text style={styles.priceText}>
            {getRefreshCoinSuccess && getRefreshCoinSuccess?.result}
          </Text>
        </View>
      </View>

      <EmptyView style={{height: dimensions.heightLevel7}} />

      {/* QrCode */}

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
            <Text style={{color: 'red'}}>Please Contact Administrator.</Text>
          </View>
        </View>
      ) : (
        <View style={styles.qrContainer}>
          <QRCode
            value={qrValue}
            logo={IMAGES.qrCodeIMG}
            getRef={c => setSvg(c)}
            key={1}
            size={dimensions.widthLevel4}
          />

          <Text style={styles.priceText}>Your unique QR code</Text>
        </View>
      )}
      <Loader isLoading={userCheckLoading} />
    </View>
  );
};

export default QrCodeComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    top: 70,
    paddingHorizontal: dimensions.paddingLevel3,
  },

  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
    padding: dimensions.paddingLevel1,
    backgroundColor: colors.white,
    alignItems: 'flex-end',
  },

  curText: {
    color: colors.primary,
    textAlign: 'right',
    fontFamily: fontFamilies.InterRegular,
    fontSize: fontSizes.fontSmallPlus,
    paddingBottom: 2,
  },

  priceText: {
    color: colors.primary,
    textAlign: 'right',
    fontFamily: fontFamilies.InterSemiBold,
    fontSize: fontSizes.fontLarge,
  },

  qrContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
