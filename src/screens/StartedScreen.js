import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { IMAGES } from '../assets/images';
import { colors, dimensions, fontFamilies, fontSizes } from '../configurations/constants';
import EmptyView from '../components/EmptyView';

const StartedScreen = ({ navigation }) => {

  function nextScreen(navigation) {
    navigation.navigate('LandingRegisterScreen')
  }
  return (
    <View style={styles.container}>

      <EmptyView style={{height: dimensions.heightLevel4}}/>

      <Text style={styles.welcomeText}>welcome to cashex</Text>

      <EmptyView style={{height: dimensions.heightLevel5}}/>

      <Image  style={styles.logoImage} source={IMAGES.logoIMG} />


     <TouchableOpacity style={styles.button} onPress={() =>  nextScreen(navigation)}>
        <Text style={styles.startedText}>let's get started</Text>
     </TouchableOpacity>

    </View>
  )
}

export default StartedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: dimensions.paddingLevel3,
    alignItems: 'center',
  },

  logoImage: {
   width: dimensions.widthLevel3,
   height: dimensions.widthLevel3,
      resizeMode: 'cover',
  },

  welcomeText: {
      fontFamily: fontFamilies.InterBold,
      fontSize: fontSizes.fontXXXLarge,
      textTransform: 'uppercase',
      color: colors.secondary,
  },

  startedText: {
    fontFamily: fontFamilies.InterSemiBold,
    fontSize: fontSizes.fontXLarge,
    textTransform: 'uppercase',
    color: colors.secondary,
  },

  button: {
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 15,
    paddingHorizontal: dimensions.paddingLevel5,
    paddingVertical: dimensions.paddingLevel1,
    position: 'absolute',
    bottom: dimensions.heightLevel3,
  },

});
