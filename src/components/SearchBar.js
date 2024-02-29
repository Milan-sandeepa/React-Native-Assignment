import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {colors, dimensions} from '../configurations/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {getAllItemAction} from '../redux/actions/storeAction';
import {useIsFocused} from '@react-navigation/native';
import SearchFilter from './SearchFilter';

const SearchBar = () => {
  const [input, setInput] = useState('');

  const [data, setData] = useState([]); // Original data from the API
  const [userData, setUserData] = useState([]); // Original data from the API
  const [filteredDataMerchant, setFilteredDataMerchant] = useState([]); // Filtered data based on search
  const [filteredDataUser, setFilteredDataUser] = useState([]); // Filtered data based on search
  const userSave = useSelector(state => state.authState.userSave);

  const getAllItemSuccess = useSelector(
    state => state.storeState.getAllItemSuccess,
  );

  const getAllAvalableItemsSuccess = useSelector(
    state => state.shopState.getAllAvalableItemsSuccess,
  );

  useEffect(() => {
    // Simulating API success response

    if (getAllItemSuccess) {
      const apiResponse = getAllItemSuccess?.result;

      setData(apiResponse);
    }
  }, [getAllItemSuccess]);

  useEffect(() => {
    if (getAllAvalableItemsSuccess) {
      const apiResponse = getAllAvalableItemsSuccess?.result;

      setUserData(apiResponse);
    }
  }, [getAllAvalableItemsSuccess]);

  const handleChange = value => {
    if (userSave.role === 'MERCHANT') {
      const filtered = data.filter(item =>
        item.itemName.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredDataMerchant(filtered);
    } else {
      const filtered = userData.filter(item =>
        item.itemName.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredDataUser(filtered);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <Icon
          name="search"
          size={20}
          color={colors.black}
          style={styles.icon}
        />
        <TextInput
          placeholder="Search Here"
          style={styles.input}
          value={input}
          onChangeText={text => {
            setInput(text);
            handleChange(text); // Call your handleChange function here
          }}
        />
      </View>
      {filteredDataMerchant ? (
        <SearchFilter data={filteredDataMerchant} input={input} />
      ) : (
        <SearchFilter data={filteredDataUser} input={input} />
      )}
      <SearchFilter data={filteredDataUser} input={input} />
    </View>
  );
};
export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 2,
    backgroundColor: colors.white,
    // width: 350,
    width: dimensions.widthLevel2,
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    color: colors.black,
    backgroundColor: colors.white,
    padding: 2,
    borderRadius: 5,
    width: dimensions.widthLevel4,
  },
  icon: {
    marginLeft: 5,
  },
});
