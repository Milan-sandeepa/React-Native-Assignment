import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {colors, dimensions} from '../configurations/constants';
import {IMAGES, ICONS} from '../assets/images';
import Icon from 'react-native-vector-icons/FontAwesome';
import {baseUrl} from '../configurations/urlConfigurations';
import {useNavigation} from '@react-navigation/native';

const Item = ({
  itemId,
  itemName,
  itemDescription,
  itemPrice,
  availability,
  itemImageUrl,
}) => {
  const navigation = useNavigation();

  const data = {
    id: itemId,
    itemName: itemName,
    itemDescription: itemDescription,
    itemPrice: itemPrice,
    itemImageUrl: itemImageUrl,
    availability: availability,
  };
  const selectItemHandler = () => {
    navigation.navigate('StoreAddItemScreen', data);
  };

  return (
    <TouchableOpacity
      onPress={selectItemHandler}
      style={styles.caraselImageView}>
      <Text style={styles.deleteButtoun}>
        <Icon name="trash" size={30} color={colors.white} />
      </Text>
      <Image
        style={styles.caraselImage}
        source={{
          uri: baseUrl + itemImageUrl,
        }}
      />
      <Text
        numberOfLines={1}
        style={{
          width: dimensions.widthLevel12,
          color: colors.white,
          overflow: 'hidden',
          backgroundColor: colors.disabled,
          padding: 10,
          borderRadius: 8,
        }}>
        {itemName}
      </Text>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  caraselImageView: {
    padding: 5,
    backgroundColor: colors.primary,
    marginLeft: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  deleteButtoun: {
    position: 'absolute',
    zIndex: 2,
    padding: 10,
    alignSelf: 'flex-end',
  },
  caraselImage: {
    width: dimensions.widthLevel12,
    height: dimensions.heightLevel10,
  },
});
