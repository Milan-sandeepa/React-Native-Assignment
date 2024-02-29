import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import EmptyView from '../../components/EmptyView';
import {
  colors,
  dimensions,
  fontFamilies,
  fontSizes,
} from '../../configurations/constants';

const YourDetails = () => {
  return (
    <View style={styles.container}>
      <EmptyView style={{height: 70 + dimensions.heightLevel2}} />

      <View style={styles.mainTextContainer}>
        <Text style={styles.mainText}>Your details</Text>
      </View>

      <EmptyView style={{height: dimensions.heightLevel7}} />

      {/* input fields */}
      <View style={{width: '100%'}}>
        {false ? ( // MERCHANT - true
          <>
            <TextInput
              label="Shop name"
              mode="outlined"
              theme={styles.textInputOutlineStyle}
              style={{
                fontStyle: 'italic',
                fontFamily: fontFamilies.InterRegular,
              }}
              left={
                <TextInput.Icon
                  name="account-outline"
                  size={20}
                  color={'gray'}
                />
              }
              // onChangeText={(text) => { setMobileOtp(text) }}
              // value={mobileOtp}
              // defaultValue={mobileOtp}
            />

            <EmptyView style={{height: dimensions.heightLevel1}} />

            <TextInput
              label="Mobile number"
              mode="outlined"
              theme={styles.textInputOutlineStyle}
              style={{
                fontStyle: 'italic',
                fontFamily: fontFamilies.InterRegular,
              }}
              left={
                <TextInput.Icon name="email-outline" size={20} color={'gray'} />
              }
            />
          </>
        ) : (
          <>
            <TextInput
              label="Student full name"
              mode="outlined"
              theme={styles.textInputOutlineStyle}
              style={{
                fontStyle: 'italic',
                fontFamily: fontFamilies.InterRegular,
              }}
              left={
                <TextInput.Icon
                  name="account-outline"
                  size={20}
                  color={'gray'}
                />
              }
            />

            <EmptyView style={{height: dimensions.heightLevel1}} />

            <TextInput
              label="College mail id"
              mode="outlined"
              theme={styles.textInputOutlineStyle}
              style={{
                fontStyle: 'italic',
                fontFamily: fontFamilies.InterRegular,
              }}
              left={
                <TextInput.Icon name="email-outline" size={20} color={'gray'} />
              }
            />
          </>
        )}

        <EmptyView style={{height: dimensions.heightLevel2}} />

        {/* button */}
        <Button
          mode="contained"
          onPress={() => console.log('Pressed')}
          textColor={'white'}
          color={colors.primary}
          style={{paddingVertical: 5}}
          labelStyle={{
            fontSize: fontSizes.fontXLarge,
            fontFamily: fontFamilies.InterBold,
          }}
          loading={true}>
          EDIT
        </Button>
      </View>
    </View>
  );
};

export default YourDetails;

const styles = StyleSheet.create({
  textInputOutlineStyle: {
    colors: {
      placeholder: 'black',
      text: 'black',
      primary: 'black',
      underlineColor: 'transparent',
      background: 'white',
    },
    roundness: 5,
  },

  container: {
    width: dimensions.fullWidth,
    height: dimensions.fullHeight,
    paddingHorizontal: dimensions.paddingLevel3 * 1.2,
    alignItems: 'center',
  },

  whiteBG: {
    flex: 1,
    position: 'absolute',
    zIndex: -1,
  },

  mainTextContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
  },

  mainText: {
    width: '35%',
    fontFamily: fontFamilies.InterBold,
    fontSize: fontSizes.fontXXXLarge,
    color: colors.primary,
  },

  priceText: {
    //  width: '64%',
    color: colors.primary,
    textAlign: 'right',
    fontFamily: fontFamilies.InterBold,
    fontSize: fontSizes.fontXXXLarge,
  },

  curText: {
    color: colors.primary,
    textAlign: 'right',
    fontFamily: fontFamilies.InterMedium,
    fontSize: fontSizes.fontLarge,
    paddingBottom: 3,
  },

  curContainer: {
    width: '64%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderWidth: 1,
    borderColor: colors.primary,
    padding: dimensions.paddingLevel1,
    paddingTop: dimensions.paddingLevel3,
    justifyContent: 'flex-end',
  },

  mainImage: {
    width: dimensions.widthLevel9,
    height: dimensions.widthLevel9,
    resizeMode: 'cover',
  },
});
