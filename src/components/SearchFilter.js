import React from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {
  colors,
  dimensions,
  fontFamilies,
  fontSizes,
} from '../configurations/constants';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

const SearchFilter = ({data, input, itemData}) => {
  const navigation = useNavigation();
  const userSave = useSelector(state => state.authState.userSave);

  //   const itemData = {
  //     // id: itemId,
  //   };

  const selectItemHandler = selectedItem => {
    const itemData = {
      id: selectedItem.id,
      itemName: selectedItem.itemName,
      itemDescription: selectedItem.itemDescription,
      itemPrice: selectedItem.itemPrice,
      itemImageUrl: selectedItem.itemImageUrl,
      availability: selectedItem.itemStatus,
    };

    if (userSave.role === 'MERCHANT') {
      navigation.navigate('StoreAddItemScreen', itemData);
    } else {
      navigation.navigate('AddToCartScreen', selectedItem);
    }
  };

  return (
    <View>
      {input && data ? (
        <View style={styles.container}>
          <FlatList
            data={data}
            renderItem={({item}) => {
              if (data.length > 0) {
                return (
                  <View style={{marginVertical: 5, borderRadius: 10}}>
                    <TouchableOpacity onPress={() => selectItemHandler(item)}>
                      <View style={styles.view}>
                        <Text numberOfLines={1} style={styles.text1}>
                          {item.itemName}
                        </Text>
                        <Text style={styles.text2}>{'RS ' + item.price}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }
            }}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      ) : null}
    </View>
  );
};

export default SearchFilter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    position: 'absolute',
    zIndex: 2,
    marginTop: 5,
    width: dimensions.widthLevel2,
    borderRadius: 10,
  },
  view: {
    backgroundColor: colors.secondary,
    marginLeft: 10,
    height: dimensions.heightLevel3,
    width: dimensions.widthLevel3,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text1: {
    fontSize: fontSizes.fontMedium,
    fontFamily: fontFamilies.InterRegular,
    paddingLeft: 10,
    color: colors.white,
    overflow: 'hidden',
    width: dimensions.widthLevel9,
  },
  text2: {
    fontSize: fontSizes.fontMedium,
    fontFamily: fontFamilies.InterRegular,
    paddingRight: 10,
    color: colors.white,
  },
});
