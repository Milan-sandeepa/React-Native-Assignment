import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {
  colors,
  dimensions,
  fontFamilies,
  fontSizes,
} from '../configurations/constants';
import {currencyFormat} from '../../utilitys/currency';
import QRCode from 'react-native-qrcode-svg';
import {IMAGES} from '../assets/images';
import {useDispatch, useSelector} from 'react-redux';

import {useFocusEffect} from '@react-navigation/native';

import EmptyView from './EmptyView';
import {
  getMerchantCoinsRequestAction,
  getRefreshCoinsAction,
} from '../redux/actions/paymentAction';

const QrCodeComponentPickUp = ({navigation}) => {
  const dispatch = useDispatch();

  const userSave = useSelector(state => state.authState.userSave);
  const getRefreshCoinSuccess = useSelector(
    state => state.paymentState.getRefreshCoinSuccess,
  );

  const [svg, setSvg] = useState(undefined);

  useEffect(() => {
    userSave && dispatch(getRefreshCoinsAction(userSave?.email));
  }, []);

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
      </View>

      <EmptyView style={{height: dimensions.heightLevel7}} />

      {/* QrCode */}

      <View style={styles.qrContainer}>
        <QRCode
          value={userSave?.email}
          logo={IMAGES.qrCodeIMG}
          getRef={c => setSvg(c)}
          key={1}
          size={dimensions.widthLevel4}
        />

        <Text style={styles.priceText}>Your unique QR code</Text>
      </View>
    </View>
  );
};

export default QrCodeComponentPickUp;

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
