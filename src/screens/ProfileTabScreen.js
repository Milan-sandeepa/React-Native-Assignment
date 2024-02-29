import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {IMAGES} from '../assets/images';
import HeaderComponent from '../components/HeaderComponent';
import EditYourDetails from '../components/profile/EditYourDetails';
import YourDetails from '../components/profile/YourDetails';
import {
  colors,
  dimensions,
  fontFamilies,
  fontSizes,
} from '../configurations/constants';

const ProfileTabScreen = ({navigation}) => {
  return (
    <KeyboardAvoidingView>
      <HeaderComponent navigation={navigation} />

      <ScrollView>
        <Image source={IMAGES.whiteBackgroundIMG} style={styles.whiteBG} />

        <EditYourDetails />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileTabScreen;

const styles = StyleSheet.create({
  whiteBG: {
    flex: 1,
    position: 'absolute',
    zIndex: -1,
  },
});
