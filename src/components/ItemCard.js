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

const ItemCard = ({
  itemId,
  itemName,
  itemDescription,
  itemPrice,
  availability,
  itemImageUrl,
  itemType,
  docUploadStatus,
}) => {
  const navigation = useNavigation();

  const data = {
    id: itemId,
    itemName: itemName,
    description: itemDescription,
    price: itemPrice,
    itemImageUrl: itemImageUrl,
    availability: availability,
    itemType: itemType,
    docUploadStatus: docUploadStatus,
  };

  const selectItemHandler = () => {
    navigation.navigate('AddToCartScreen', data);
  };

  return (
    <TouchableOpacity
      onPress={selectItemHandler}
      style={styles.caraselImageView}>
      <Image
        style={styles.caraselImage}
        source={
          itemImageUrl
            ? {
                uri: baseUrl + itemImageUrl,
              }
            : require('../assets/images/stationary.png')
        }
        // source={require('../assets/images/stationary.png')}
        resizeMode="contain"
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

export default ItemCard;

const styles = StyleSheet.create({
  caraselImage: {
    width: dimensions.widthLevel12,
    height: dimensions.heightLevel10,
  },
  caraselImageView: {
    padding: 5,
    backgroundColor: colors.primary,
    marginLeft: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
});
