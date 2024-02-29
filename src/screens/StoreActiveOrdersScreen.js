import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
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

import {
  getAllStoreActiveOrdersAction,
  getAllStoreFoodActiveOrdersAction,
  getAllStoreStationaryActiveOrdersAction,
} from '../redux/actions/orderAction';
import Loader from '../components/Loader';
import {showToast} from '../configurations/ToastConfig';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import {TabView, SceneMap} from 'react-native-tab-view';
import SegmentedControlTab from 'react-native-segmented-control-tab';

const StoreActiveOrdersScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [tableData, setTableData] = useState([]);
  const [stationaryTableData, setStationaryTableData] = useState([]);

  const [state, setState] = useState({
    selectedIndex: 0,
  });

  const userSave = useSelector(state => state.authState.userSave);

  const getAllStoreActiveOrdersLoading = useSelector(
    state => state.orderState.getAllStoreActiveOrdersLoading,
  );
  const getAllStoreActiveOrdersSuccess = useSelector(
    state => state.orderState.getAllStoreActiveOrdersSuccess,
  );
  const getAllStoreActiveOrdersFailed = useSelector(
    state => state.orderState.getAllStoreActiveOrdersFailed,
  );

  const getAllStoreStationaryActiveOrdersLoading = useSelector(
    state => state.orderState.getAllStoreStationaryActiveOrdersLoading,
  );
  const getAllStoreStationaryActiveOrdersSuccess = useSelector(
    state => state.orderState.getAllStoreStationaryActiveOrdersSuccess,
  );
  const getAllStoreStationaryActiveOrdersFailed = useSelector(
    state => state.orderState.getAllStoreStationaryActiveOrdersFailed,
  );

  useEffect(() => {
    onBackPress(handleBackPress);
  }, []);

  function handleBackPress() {
    navigation.navigate('QRScanViewOrderScreen');
    return true;
  }

  const data = {
    email: userSave?.email,
  };

  useFocusEffect(
    React.useCallback(() => {
      // Your logic to run when the screen is focused
      console.log('Screen is focused. Do something.');
      dispatch(getAllStoreFoodActiveOrdersAction(data));
      dispatch(getAllStoreStationaryActiveOrdersAction(data));
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
    if (getAllStoreActiveOrdersSuccess) {
      setTableData(getAllStoreActiveOrdersSuccess?.result);

      console.log('-----------', getAllStoreActiveOrdersSuccess?.result);
    } else if (getAllStoreActiveOrdersFailed) {
    }
  }, [getAllStoreActiveOrdersSuccess, getAllStoreActiveOrdersFailed]);

  useEffect(() => {
    if (getAllStoreStationaryActiveOrdersSuccess) {
      setStationaryTableData(getAllStoreStationaryActiveOrdersSuccess?.result);

      console.log(
        '-----------',
        getAllStoreStationaryActiveOrdersSuccess?.result,
      );
    } else if (getAllStoreStationaryActiveOrdersFailed) {
    }
  }, [
    getAllStoreStationaryActiveOrdersSuccess,
    getAllStoreStationaryActiveOrdersFailed,
  ]);

  const handleRowClick = orderId => {
    // const Data = getAllActiveOrdersSuccess?.result[orderId - 1];
    navigation.navigate('StoreOrderDetailScreen', orderId);
    console.log(orderId);

    // console.log(getAllActiveOrdersSuccess?.result[orderId - 1]);
  };

  const handleIndexChange = index => {
    setState({
      ...state,
      selectedIndex: index,
    });
  };

  function goBackScreen(navigation) {
    navigation.navigate('QRScanViewOrderScreen');
  }

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

          <View style={{width: dimensions.widthLevel2 - 5}}>
            <SegmentedControlTab
              // values={['GENERAL', 'PASSWORD']}
              values={['FOOD & DRINK', 'STATIONARY']}
              // values={isMerchant ? ['PASSWORD'] : ['PASSWORD', 'PIN CHANGE']}
              selectedIndex={state?.selectedIndex}
              onTabPress={handleIndexChange}
              activeTabStyle={styles.activeTabContainer}
              tabStyle={styles.tabContainer}
              lastTabStyle={{borderLeftWidth: 1}}
              borderRadius={10}
              tabTextStyle={styles.tabsText}
            />
          </View>

          <EmptyView style={{height: dimensions.heightLevel2}} />

          <View style={{width: '100%'}}>
            {state.selectedIndex === 0 ? (
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
                      {'Name        '}
                    </DataTable.Title>

                    <DataTable.Title numeric textStyle={{color: '#fff'}}>
                      {'Status     '}
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
                            {moment(val?.orderDate).format('MM/DD/YYYY')}
                            {'   '}
                            {/* {moment(val?.orderDate).format('l0')0} */}
                          </DataTable.Cell>
                          <DataTable.Cell
                            numeric
                            style={{
                              marginLeft: 10,
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
                          }}>
                          {'     '}
                        </DataTable.Cell> */}
                          <DataTable.Cell
                            numeric
                            style={{
                              marginLeft: 10,
                              justifyContent: 'center',
                              paddingLeft: 15,
                            }}
                            textStyle={{
                              color: '#000',
                              fontSize: fontSizes.fontSmall,
                            }}>
                            {val?.user?.firstName + '          '}
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
            ) : (
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
                      {'Name        '}
                    </DataTable.Title>

                    <DataTable.Title numeric textStyle={{color: '#fff'}}>
                      {'Status     '}
                    </DataTable.Title>
                  </DataTable.Header>

                  <>
                    {stationaryTableData?.map((val, index) => (
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
                            {moment(val?.orderDate).format('MM/DD/YYYY')}
                            {'   '}
                            {/* {moment(val?.orderDate).format('l0')0} */}
                          </DataTable.Cell>
                          <DataTable.Cell
                            numeric
                            style={{
                              marginLeft: 10,
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
                          }}>
                          {'     '}
                        </DataTable.Cell> */}
                          <DataTable.Cell
                            numeric
                            style={{
                              marginLeft: 10,
                              justifyContent: 'center',
                              paddingLeft: 15,
                            }}
                            textStyle={{
                              color: '#000',
                              fontSize: fontSizes.fontSmall,
                            }}>
                            {val?.user?.firstName + '          '}
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
            )}
            {/*active orders table */}

            <EmptyView style={{height: dimensions.heightLevel2}} />
          </View>
          <Loader isLoading={getAllStoreActiveOrdersLoading} />
          <EmptyView style={{height: dimensions.heightLevel2}} />
        </View>
      </ScrollView>
    </View>
  );
};

export default StoreActiveOrdersScreen;

const styles = StyleSheet.create({
  container: {
    width: dimensions.fullWidth,
    height: dimensions.fullHeight,
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
  activeTabContainer: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderBottomColor: colors.transparent,
  },

  tabContainer: {
    borderBottomColor: colors.primary,
    borderColor: colors.transparent,
    backgroundColor: colors.transparent,
    height: dimensions.heightLevel4 - 10,
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
