import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  colors,
  dimensions,
  fontFamilies,
  fontSizes,
} from '../configurations/constants';
import {ICONS} from '../assets/images';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {getRefreshCoinsAction} from '../redux/actions/paymentAction';

const HeaderComponent = ({navigation, isCurrency = false}) => {
  const dispatch = useDispatch();
  const userSave = useSelector(state => state.authState.userSave);

  const getRefreshCoinLoading = useSelector(
    state => state.paymentState.getRefreshCoinLoading,
  );
  const getRefreshCoinSuccess = useSelector(
    state => state.paymentState.getRefreshCoinSuccess,
  );
  const getRefreshCoinFailed = useSelector(
    state => state.paymentState.getRefreshCoinFailed,
  );

  useEffect(() => {
    dispatch(getRefreshCoinsAction(userSave.email));
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image source={ICONS.menuICN} style={styles.menuIcon} />
      </TouchableOpacity>

      <View>
        {!isCurrency ? (
          <View style={styles.nameContainer}>
            <Text numberOfLines={1} style={styles.nameText}>
              {userSave?.firstName},
            </Text>
            <Text numberOfLines={1} style={styles.welcomeText}>
              {' '}
              Welcome to CASHEX
            </Text>
          </View>
        ) : (
          <View style={styles.priceContainer}>
            <Text numberOfLines={1} style={styles.priceText}>
              {getRefreshCoinSuccess && 'RS ' + getRefreshCoinSuccess?.result}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: dimensions.paddingLevel3,
    justifyContent: 'space-between',
    position: 'absolute',
    zIndex: 99,
    top: 0,
    left: 0,
  },

  menuIcon: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },

  nameContainer: {
    alignItems: 'flex-end',
  },

  nameText: {
    fontFamily: fontFamilies.InterMedium,
    color: '#fff',
    fontSize: fontSizes.fontMidMedium,
    textTransform: 'capitalize',
  },

  welcomeText: {
    fontFamily: fontFamilies.InterLight,
    color: '#fff',
    fontSize: fontSizes.fontMedium,
  },

  priceText: {
    fontFamily: fontFamilies.InterMedium,
    color: '#fff',
    fontSize: fontSizes.fontXLarge,
    textTransform: 'uppercase',
  },
});
