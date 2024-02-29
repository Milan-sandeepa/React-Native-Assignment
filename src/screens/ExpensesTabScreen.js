import React, {useEffect, useState} from 'react';
import {
  Image,
  LogBox,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import HeaderComponent from '../components/HeaderComponent';
import {DataTable} from 'react-native-paper';
import EmptyView from '../components/EmptyView';
import {
  colors,
  dimensions,
  fontFamilies,
  fontSizes,
} from '../configurations/constants';
import {ICONS, IMAGES} from '../assets/images';
import DatePicker from 'react-native-neat-date-picker';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {studentExpensesAction} from '../redux/actions/reportAction';
import Loader from '../components/Loader';

const ExpensesTabScreen = ({navigation}) => {
  LogBox.ignoreLogs(['EventEmitter.removeListener']);
  const dispatch = useDispatch();

  // ** data range picker
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [data, setData] = useState(null);

  const [dateRange, setDateRange] = useState({
    start: '',
    end: '',
  });

  // ** selector
  const userSave = useSelector(state => state.authState.userSave);

  const studentExpensesLoading = useSelector(
    state => state.reportState.studentExpensesLoading,
  );
  const studentExpensesSuccess = useSelector(
    state => state.reportState.studentExpensesSuccess,
  );
  const studentExpensesFailed = useSelector(
    state => state.reportState.studentExpensesFailed,
  );

  useEffect(() => {
    let end = moment(new Date()).format();
    let start = moment(new Date()).add(-7, 'day').format();

    console.log(start.toString().split('T')[0]);
    console.log(end.toString().split('T')[0]);

    let data = {
      start: start.toString().split('T')[0],
      end: end.toString().split('T')[0],
    };
    setDateRange(data);
  }, []);

  useEffect(() => {
    if (studentExpensesSuccess) {
      setTableData(studentExpensesSuccess?.result?.expensesList?.listData);
      setData(studentExpensesSuccess?.result);
    } else if (studentExpensesFailed) {
      setTableData([]);
    }
  }, [studentExpensesSuccess, studentExpensesFailed]);

  // ** table

  useEffect(() => {
    if (dateRange && dateRange.start !== '') {
      getTableDataHandler(dateRange?.start, dateRange?.end, 0);
    }
  }, [dateRange]);

  const openStartDatePicker = () => {
    setShowStartDatePicker(true);
  };

  const onCancelStartDate = () => {
    setShowStartDatePicker(false);
  };

  const onConfirmStartDate = date => {
    setShowStartDatePicker(false);
    setPage(0);

    let updatedDateRange = {
      ...dateRange,
      start: date?.dateString,
    };

    // Update the state with the new start date
    setDateRange(updatedDateRange);

    // Fetch data with the updated date range
    // getTableDataHandler(date?.startDateString, dateRange?.end, 0);
    console.log('eerrrrrr', updatedDateRange);
  };

  const openEndDatePicker = () => {
    setShowEndDatePicker(true);
  };

  const onCancelEndDate = () => {
    setShowEndDatePicker(false);
  };

  const onConfirmEndDate = date => {
    setShowEndDatePicker(false);

    setPage(0);

    let updatedDateRange = {
      ...dateRange,
      end: date?.dateString,
    };

    // Use the updated date range for your data fetching logic
    getTableDataHandler(updatedDateRange?.start, updatedDateRange?.end, 0);

    // Update the state with the new end date
    setDateRange(updatedDateRange);
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
    dispatch(studentExpensesAction(data));
  };

  const onPageChange = val => {
    setPage(val);
  };

  return (
    <>
      <HeaderComponent navigation={navigation} isCurrency />
      <Image source={IMAGES.whiteBackgroundIMG} style={styles.whiteBG} />
      <ScrollView>
        <View style={styles.container}>
          <EmptyView style={{height: 70 + dimensions.heightLevel2}} />

          <View style={styles.mainTextContainer}>
            <Text numberOfLines={2} style={styles.mainText}>
              Your expenses
            </Text>
            <View style={styles.priceContainer}>
              <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <Text style={styles.curText}>RS</Text>
                <Text style={styles.priceText}>
                  {' '}
                  {data?.totalExpenses === '.00' || data?.totalExpenses === null
                    ? '00.00'
                    : data?.totalExpenses}
                </Text>
              </View>
              <Text style={styles.priceSubText}>Total Amount Spent</Text>
            </View>
          </View>

          <EmptyView style={{height: dimensions.heightLevel3}} />

          <View>
            {/* data range container */}
            <View style={styles.dateContainer}>
              <Text style={styles.selectHeadText}>Select date range</Text>

              <TouchableOpacity style={styles.selectContainer}>
                <Image source={ICONS.calenderICN} />
                <Text
                  style={styles.dateRangeText}
                  onPress={openStartDatePicker}>
                  {/* {dateRange?.startStr} {dateRange?.endStr ? ' - ' : ''}{' '}
                  {dateRange?.endStr} */}
                  {dateRange.start}
                </Text>
                <Text style={styles.dateRangeText} onPress={openEndDatePicker}>
                  {/* {dateRange?.startStr} {dateRange?.endStr ? ' - ' : ''}{' '}
                  {dateRange?.endStr} */}
                  {dateRange.end}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <DatePicker
              isVisible={showStartDatePicker}
              mode={'single'}
              onCancel={onCancelStartDate}
              onConfirm={onConfirmStartDate}
            />

            <DatePicker
              isVisible={showEndDatePicker}
              mode={'single'}
              onCancel={onCancelEndDate}
              onConfirm={onConfirmEndDate}
            />
          </View>

          <EmptyView style={{height: dimensions.heightLevel4}} />

          {/* table */}
          <View style={{width: '100%'}}>
            <DataTable>
              <DataTable.Header
                style={{backgroundColor: colors.primary, borderRadius: 10}}>
                <DataTable.Title textStyle={{color: '#fff'}}>
                  Date
                </DataTable.Title>
                <DataTable.Title numeric textStyle={{color: '#fff'}}>
                  Shop Name
                </DataTable.Title>
                <DataTable.Title numeric textStyle={{color: '#fff'}}>
                  Amount
                </DataTable.Title>
              </DataTable.Header>

              <>
                {tableData?.map((val, index) => {
                  return (
                    <DataTable.Row
                      key={index}
                      style={{
                        backgroundColor: '#AF9FD5',
                        borderRadius: 10,
                        marginTop: 5,
                      }}>
                      <DataTable.Cell
                        textStyle={{
                          color: '#000',
                          fontSize: fontSizes.fontSmall * 0.8,
                        }}>
                        {moment(val?.dateTime).format('lll')}
                      </DataTable.Cell>
                      <DataTable.Cell
                        numeric
                        textStyle={{
                          color: '#000',
                          fontSize: fontSizes.fontSmall,
                        }}>
                        {val?.shopName}
                      </DataTable.Cell>
                      <DataTable.Cell
                        numeric
                        textStyle={{
                          color: '#000',
                          fontSize: fontSizes.fontSmall,
                        }}>
                        RS. {val?.amountRsStr}
                      </DataTable.Cell>
                    </DataTable.Row>
                  );
                })}
              </>

              {tableData?.length > 0 ? (
                <DataTable.Pagination
                  page={page}
                  numberOfPages={
                    tableData?.listData?.length > 0 ? tableData?.totalPages : 1
                  }
                  onPageChange={page => onPageChange(page)}
                  label={
                    page +
                    1 +
                    '/' +
                    (tableData?.listData?.length > 0
                      ? tableData?.totalPages
                      : 1)
                  }
                  // optionsPerPage={optionsPerPage}
                  // itemsPerPage={itemsPerPage}
                  // setItemsPerPage={setItemsPerPage}
                  // showFastPagination
                  // optionsLabel={'Rows per page'}
                  style={{
                    backgroundColor: '#AF9FD5',
                    borderRadius: 10,
                    marginTop: 5,
                  }}
                />
              ) : (
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'rgba(0,0,0,0.5)',
                    marginTop: 10,
                    fontSize: fontSizes.fontSmall * 0.8,
                  }}>
                  - NO RECORDS FOUND -
                </Text>
              )}
            </DataTable>
          </View>
          <Loader isLoading={studentExpensesLoading} />
        </View>
      </ScrollView>
    </>
  );
};

export default ExpensesTabScreen;

const styles = StyleSheet.create({
  dateRangeText: {
    fontFamily: fontFamilies.InterRegular,
    fontSize: fontSizes.fontSmallPlus * 1.25,
  },

  selectHeadText: {
    alignSelf: 'flex-start',
    fontFamily: fontFamilies.AwsomeRegular,
    fontSize: fontSizes.fontSmallPlus * 1.3,
    color: colors.primary,
    marginBottom: 5,
  },

  selectContainer: {
    width: dimensions.widthLevel2,
    // backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: dimensions.paddingLevel2,
    paddingHorizontal: dimensions.paddingLevel5,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
  },

  dateContainer: {
    width: dimensions.widthLevel2,
    alignItems: 'flex-start',
    justifyContent: 'center',
    zIndex: 111,
  },

  container: {
    width: dimensions.fullWidth,
    height: dimensions.fullHeight,
    paddingHorizontal: dimensions.paddingLevel3 * 1.2,
    alignItems: 'center',
  },

  mainTextContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
  },

  mainText: {
    width: '45%',
    fontFamily: fontFamilies.InterBold,
    fontSize: fontSizes.fontXXXLarge,
    color: colors.primary,
  },

  whiteBG: {
    flex: 1,
    position: 'absolute',
    zIndex: -1,
  },

  priceContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
    padding: 2,
    width: '54%',
    height: dimensions.heightLevel5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  curText: {
    fontFamily: fontFamilies.InterRegular,
    fontSize: fontSizes.fontSmallPlus,
    color: colors.primary,
    paddingBottom: 2,
  },

  priceText: {
    fontFamily: fontFamilies.InterSemiBold,
    fontSize: fontSizes.fontLarge,
    color: colors.primary,
  },

  priceSubText: {
    fontFamily: fontFamilies.InterLight,
    fontSize: fontSizes.fontSmall,
    color: colors.primary,
  },
});
