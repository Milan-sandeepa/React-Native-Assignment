import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {IMAGES, ICONS} from '../assets/images';
import EmptyView from '../components/EmptyView';
import HeaderComponent from '../components/HeaderComponent';
import {
  colors,
  dimensions,
  fontFamilies,
  fontSizes,
  getShadowsV2,
} from '../configurations/constants';
import {useDispatch, useSelector} from 'react-redux';
import {onBackPress} from '../utilitys/backButtonUtil';
import {DataTable} from 'react-native-paper';

import {getAllActiveOrdersAction} from '../redux/actions/orderAction';
import Loader from '../components/Loader';
import {showToast} from '../configurations/ToastConfig';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import moment from 'moment';

const ActiveOrdersScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState();
  const [tableData, setTableData] = useState([]);

  const userSave = useSelector(state => state.authState.userSave);

  const getAllActiveOrdersLoading = useSelector(
    state => state.orderState.getAllActiveOrdersLoading,
  );
  const getAllActiveOrdersSuccess = useSelector(
    state => state.orderState.getAllActiveOrdersSuccess,
  );
  const getAllActiveOrdersFailed = useSelector(
    state => state.orderState.getAllActiveOrdersFailed,
  );

  useEffect(() => {
    onBackPress(handleBackPress);
  }, []);

  function handleBackPress() {
    navigation.navigate('HomeTab');
    return true;
  }

  const data = {
    email: userSave?.email,
  };

  // const isFocused = useIsFocused();

  // useEffect(() => {
  //   if (isFocused) {
  //     dispatch(getAllActiveOrdersAction(data)); // Perform API call when screen is focused
  //   }
  // }, [isFocused]);

  useFocusEffect(
    React.useCallback(() => {
      // Your logic to run when the screen is focused
      console.log('Screen is focused. Do something.');
      dispatch(getAllActiveOrdersAction(data));
      // For example, you can fetch data here
      // fetchData();

      // Don't forget to clean up any subscriptions or resources if needed
      return () => {
        // Cleanup logic
        console.log('Screen is unfocused. Clean up.');
      };
    }, []),
  );

  useEffect(() => {
    if (getAllActiveOrdersSuccess) {
      setTableData(getAllActiveOrdersSuccess?.result);
      console.log('---------------', getAllActiveOrdersSuccess?.result);
    } else if (getAllActiveOrdersFailed) {
    }
  }, [getAllActiveOrdersSuccess, getAllActiveOrdersFailed]);

  const handleRowClick = orderId => {
    // const Data = getAllActiveOrdersSuccess?.result[orderId - 1];
    navigation.navigate('OrderDetailScreen', orderId);
    console.log(orderId);
    // console.log(getAllActiveOrdersSuccess?.result[orderId - 1]);
  };

  function goBackScreen(navigation) {
    navigation.navigate('HomeTab');
  }

  console.log(userSave);
  return (
    <View>
      <HeaderComponent navigation={navigation} isCurrency />

      <ScrollView>
        <Image source={IMAGES.whiteBackgroundIMG} style={styles.whiteBG} />

        <EmptyView style={{height: dimensions.heightLevel6}} />
        <View style={styles.container}>
          <EmptyView style={{height: dimensions.heightLevel2}} />

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
          </TouchableOpacity>

          <EmptyView style={{height: dimensions.heightLevel2}} />

          <View style={{width: '100%'}}>
            {/*active orders table */}
            <View style={{width: '100%'}}>
              <DataTable>
                <DataTable.Header
                  style={{backgroundColor: colors.primary, borderRadius: 10}}>
                  <DataTable.Title textStyle={{color: '#fff'}}>
                    {'Date'}
                  </DataTable.Title>
                  <DataTable.Title textStyle={{color: '#fff'}}>
                    {'    Amount'}
                  </DataTable.Title>

                  <DataTable.Title numeric textStyle={{color: '#fff'}}>
                    {'Shop Name    '}
                  </DataTable.Title>

                  <DataTable.Title numeric textStyle={{color: '#fff'}}>
                    {'Status    '}
                  </DataTable.Title>
                </DataTable.Header>

                <>
                  {tableData?.map((val, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleRowClick(val.id)}>
                      <DataTable.Row
                        style={{
                          backgroundColor: colors.white,
                          borderRadius: 10,
                          marginTop: 5,
                        }}>
                        <DataTable.Cell
                          numeric
                          style={{
                            justifyContent: 'flex-start',
                          }}
                          textStyle={{
                            color: '#000',
                            fontSize: fontSizes.fontSmall,
                          }}>
                          {/* {val?.orderDate} */}
                          {moment(val?.orderDate).format('MM/DD/YYYY')}
                        </DataTable.Cell>
                        <DataTable.Cell
                          numeric
                          style={{
                            justifyContent: 'center',
                          }}
                          textStyle={{
                            color: '#000',
                            fontSize: fontSizes.fontSmall,
                          }}>
                          {val?.chargeAmount}
                        </DataTable.Cell>
                        {/* <DataTable.Cell
                          numeric
                          textStyle={{
                            color: '#000',
                            fontSize: fontSizes.fontSmall,
                          }}></DataTable.Cell> */}
                        <DataTable.Cell
                          numeric
                          style={{
                            justifyContent: 'center',
                          }}
                          textStyle={{
                            color: '#000',
                            fontSize: fontSizes.fontSmall,
                          }}>
                          {val?.merchant?.firstName + '          '}
                        </DataTable.Cell>
                        <DataTable.Cell
                          numeric
                          textStyle={{
                            color: '#000',
                            fontSize: fontSizes.fontSmall,
                            backgroundColor: '#AF9FD5',
                            padding: 8,
                            borderRadius: 8,
                          }}>
                          {val?.orderStatus}
                        </DataTable.Cell>
                      </DataTable.Row>
                    </TouchableOpacity>
                  ))}
                </>
              </DataTable>
            </View>

            <EmptyView style={{height: dimensions.heightLevel2}} />
          </View>
          <Loader isLoading={getAllActiveOrdersLoading} />
          <EmptyView style={{height: dimensions.heightLevel2}} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ActiveOrdersScreen;

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

  mainImg: {
    width: dimensions.widthLevel1,
    height: dimensions.widthLevel7,
    resizeMode: 'cover',
    opacity: 1,
  },
});
