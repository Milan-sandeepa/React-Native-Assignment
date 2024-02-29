import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { IMAGES } from '../assets/images';
import { colors, dimensions, fontFamilies, fontSizes, getShadowsV2 } from '../configurations/constants';
import EmptyView from '../components/EmptyView';

const LandingRegisterScreen = ({ navigation }) => {

        function nextScreen(navigation, isMerchant) {
                navigation.navigate('SignUpScreen', { isMerchant: isMerchant })
        }

        

        return (
                <ScrollView>
                        <Image source={IMAGES.blueBackgroundIMG} style={styles.blueBG} />

                        <View style={styles.container}>
                                <EmptyView style={{ height: dimensions.heightLevel3 }} />
                                <Image style={styles.registerIMG} source={IMAGES.registerIMG} />
                                <EmptyView style={{ height: dimensions.heightLevel1 }} />

                                <TouchableOpacity style={styles.button} onPress={() => nextScreen(navigation, true)}>
                                        <Image style={styles.merchantIMG} source={IMAGES.merchantIMG} />
                                        <Text style={styles.itemText}>Merchant</Text>
                                </TouchableOpacity>
                                <EmptyView style={{ height: dimensions.heightLevel2 }} />
                                <TouchableOpacity style={styles.button} onPress={() => nextScreen(navigation, false)}>
                                        <Image style={styles.customerIMG} source={IMAGES.customerIMG} />
                                        <Text style={styles.itemText}>Student</Text>
                                </TouchableOpacity>

                                <EmptyView style={{ height: dimensions.heightLevel1 }} />
                        </View>
                </ScrollView>
        )
}

export default LandingRegisterScreen;

const styles = StyleSheet.create({
        container: {
                width: dimensions.fullWidth,
                height: dimensions.fullHeight,
                paddingHorizontal: dimensions.paddingLevel3,
                alignItems: 'center',
        },

        blueBG: {
                flex: 1,
                position: 'absolute',
                zIndex: -1
        },

        registerIMG: {
                transform: [{ scale: 0.8 }],
                left: -dimensions.paddingLevel2,
        },

        itemText: {
                fontFamily: fontFamilies.InterBold,
                fontSize: fontSizes.fontLarge,
                textTransform: 'uppercase',
                color: colors.black,
        },

        button: {
                borderWidth: 1,
                borderColor: colors.black,
                borderRadius: 15,
                padding: dimensions.paddingLevel2,
                alignItems: 'center',
        },

        merchantIMG: {
                transform: [{ scale: 0.7 }],
        },

        customerIMG: {
                transform: [{ scale: 0.9 }],
                marginHorizontal: dimensions.paddingLevel2,
        },

});